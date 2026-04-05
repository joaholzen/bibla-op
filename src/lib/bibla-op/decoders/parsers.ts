/**
 * biblaOp — Open Protocol Library
 * Parsing utilities and shared transform helpers for MID decoders
 */

import type { DecodedField, FieldDef } from '../types/decoders';

/** Parse parameterized data fields (2-digit ID prefix + value) */
export function parseParameterized(data: string, fieldDefs: FieldDef[]): DecodedField[] {
  const fields: DecodedField[] = [];
  let pos = 0;

  for (const def of fieldDefs) {
    const idStr = def.id.padStart(2, '0');
    if (pos + 2 <= data.length && data.substring(pos, pos + 2) === idStr) {
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

/** Parse flat (non-parameterized) data fields — no 2-digit IDs, raw concatenated values */
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

export const statusOkNok = (raw: string): 'ok' | 'nok' | undefined => {
  const v = raw.trim();
  if (v === '1') return 'ok';
  if (v === '0' || v === '2') return 'nok';
  return undefined;
};

export const tighteningStatusLabel = (raw: string): string => {
  const v = raw.trim();
  if (v === '1') return 'OK';
  if (v === '0') return 'NOK';
  return v;
};

export const torqueAngleStatusLabel = (raw: string): string => {
  const v = raw.trim();
  if (v === '0') return 'Low';
  if (v === '1') return 'OK';
  if (v === '2') return 'High';
  return v;
};

export const torqueAngleStatusFn = (raw: string): 'ok' | 'nok' | undefined => {
  const v = raw.trim();
  if (v === '1') return 'ok';
  if (v === '0' || v === '2') return 'nok';
  return undefined;
};

export const batchStatusLabel = (raw: string): string => {
  const v = raw.trim();
  if (v === '0') return 'Not completed';
  if (v === '1') return 'OK';
  if (v === '2') return 'NOK';
  return v;
};

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
