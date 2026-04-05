/**
 * biblaOp — Open Protocol Library
 * Parsing utilities and shared transform/status helpers for MID decoders.
 *
 * Two parsing modes:
 * - Parameterized: each field is prefixed by a 2-digit ID (e.g. "01value")
 * - Flat: fields are concatenated without IDs, parsed by position only
 */

import type { DecodedField, FieldDef } from '../types/decoders';

/**
 * Parse parameterized data fields where each value is prefixed by a 2-digit field ID.
 * If the expected ID isn't at the current position, searches ahead up to 50 chars.
 */
export function parseParameterized(data: string, fieldDefs: FieldDef[]): DecodedField[] {
  const fields: DecodedField[] = [];
  let pos = 0;

  for (const def of fieldDefs) {
    const idStr = def.id.padStart(2, '0');
    if (pos + 2 <= data.length && data.substring(pos, pos + 2) === idStr) {
      // ID found at expected position
      pos += 2;
      const rawValue = data.substring(pos, pos + def.length);
      pos += def.length;

      let displayValue = rawValue.trim() || rawValue;
      if (def.transform) displayValue = def.transform(rawValue);

      fields.push({
        id: idStr,
        label: def.label,
        value: displayValue,
        unit: def.unit,
        status: def.statusFn?.(rawValue),
      });
    } else {
      // Search ahead for the field ID (handles padding or extra data)
      const idx = data.indexOf(idStr, pos);
      if (idx !== -1 && idx < pos + 50) {
        pos = idx + 2;
        const rawValue = data.substring(pos, pos + def.length);
        pos += def.length;

        let displayValue = rawValue.trim() || rawValue;
        if (def.transform) displayValue = def.transform(rawValue);

        fields.push({
          id: idStr,
          label: def.label,
          value: displayValue,
          unit: def.unit,
          status: def.statusFn?.(rawValue),
        });
      }
    }
  }

  return fields;
}

/**
 * Parse flat (non-parameterized) data fields — values are concatenated
 * without field IDs, extracted purely by position and length.
 */
export function parseFlat(data: string, fieldDefs: FieldDef[]): DecodedField[] {
  const fields: DecodedField[] = [];
  let pos = 0;

  for (const def of fieldDefs) {
    if (pos >= data.length) break;
    const rawValue = data.substring(pos, pos + def.length);
    pos += def.length;

    let displayValue = rawValue.trim() || rawValue;
    if (def.transform) displayValue = def.transform(rawValue);

    fields.push({
      id: def.id,
      label: def.label,
      value: displayValue,
      unit: def.unit,
      status: def.statusFn?.(rawValue),
    });
  }

  return fields;
}

/** Status function: '1' → ok, '0' or '2' → nok */
export const statusOkNok = (raw: string): 'ok' | 'nok' | undefined => {
  const v = raw.trim();
  if (v === '1') return 'ok';
  if (v === '0' || v === '2') return 'nok';
  return undefined;
};

/** Transform: '1' → 'OK', '0' → 'NOK' */
export const tighteningStatusLabel = (raw: string): string => {
  const v = raw.trim();
  if (v === '1') return 'OK';
  if (v === '0') return 'NOK';
  return v;
};

/** Transform: '0' → 'Low', '1' → 'OK', '2' → 'High' */
export const torqueAngleStatusLabel = (raw: string): string => {
  const v = raw.trim();
  if (v === '0') return 'Low';
  if (v === '1') return 'OK';
  if (v === '2') return 'High';
  return v;
};

/** Status function for torque/angle: '1' → ok, '0'/'2' → nok */
export const torqueAngleStatusFn = (raw: string): 'ok' | 'nok' | undefined => {
  const v = raw.trim();
  if (v === '1') return 'ok';
  if (v === '0' || v === '2') return 'nok';
  return undefined;
};

/** Transform: batch status code to label */
export const batchStatusLabel = (raw: string): string => {
  const v = raw.trim();
  if (v === '0') return 'Not completed';
  if (v === '1') return 'OK';
  if (v === '2') return 'NOK';
  return v;
};

/** Transform: tightening strategy code to human-readable name */
export const strategyLabel = (raw: string): string => {
  const strategies: Record<string, string> = {
    '01': 'Torque control', '02': 'Angle control', '03': 'Torque + Angle',
    '04': 'Angle control / Torque mon', '05': 'DS control',
    '06': 'DS control / Torque mon', '07': 'Reverse angle',
    '08': 'Pulse tightening', '09': 'Click wrench',
    '10': 'Rotate spindle fwd', '11': 'Torque / Angle OR',
    '12': 'Rotate spindle rev', '13': 'Home position fwd',
    '14': 'Loosen + live calibration',
    '15': 'Yield', '19': 'Yield / Torque OR',
    '20': 'Snug gradient',
    '21': 'Residual torque / Time', '22': 'Residual torque / Angle',
    '23': 'Breakaway peak', '24': 'Loosen and tightening',
    '25': 'Home position rev', '26': 'PVT comp with Snug',
    '99': 'Ext result',
  };
  const v = raw.trim();
  return strategies[v] || raw.trim();
};
