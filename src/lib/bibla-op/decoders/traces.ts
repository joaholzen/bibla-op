/**
 * biblaOp — Open Protocol Library
 * Trace MID field definitions: MID 0900 (trace curve data), MID 0901 (plot parameters)
 *
 * Trace messages carry sampled torque/angle curves from tightening operations.
 * After the standard fields, optional PID-tagged metadata (bolt number, etc.) may follow.
 */

import type { FieldDef, DecoderEntry, DecodedField, DecodedDataField } from '../types/decoders';
import { parseParameterized } from './parsers';

/** MID 0900: Trace Curve Data — tightening ID, trace type, and sample count */
const MID_0900_FIELDS: FieldDef[] = [
  { id: '01', label: 'Tightening ID', length: 10 },
  { id: '02', label: 'Trace Type', length: 2, transform: (v) => v.trim() === '01' ? 'Torque' : v.trim() === '02' ? 'Angle' : v },
  { id: '03', label: 'Number of Samples', length: 4 },
];

/** MID 0901: Trace Curve Plot Parameters — min/max ranges for rendering */
const MID_0901_FIELDS: FieldDef[] = [
  { id: '01', label: 'Tightening ID', length: 10 },
  { id: '02', label: 'Torque Min', length: 7, unit: 'Nm' },
  { id: '03', label: 'Torque Max', length: 7, unit: 'Nm' },
  { id: '04', label: 'Angle Min', length: 5, unit: '°' },
  { id: '05', label: 'Angle Max', length: 5, unit: '°' },
  { id: '06', label: 'Number of Samples', length: 4 },
];

/**
 * Parse optional PID-tagged metadata that follows trace sample data.
 * Known PIDs: Bolt Number, Station Number, Channel Number, Spindle Number.
 */
function parseTracePids(pidData: string): DecodedField[] {
  const fields: DecodedField[] = [];
  const PID_LABELS: Record<string, string> = {
    '01301': 'Bolt Number',
    '01504': 'Station Number',
    '01502': 'Channel Number',
    '01312': 'Spindle Number',
  };
  let pos = 0;
  while (pos + 8 <= pidData.length) {
    const pid = pidData.substring(pos, pos + 5);
    const label = PID_LABELS[pid];
    if (!label) break;
    const len = parseInt(pidData.substring(pos + 5, pos + 8)) || 0;
    if (len <= 0 || pos + 8 + len > pidData.length) break;
    const value = pidData.substring(pos + 8, pos + 8 + len).trim();
    fields.push({ id: pid, label, value, status: 'info' });
    pos += 8 + len;
  }
  return fields;
}

/** Decode MID 0900: parse standard fields, skip sample data block, then parse trailing PIDs */
export function decodeMid0900(data: string, _rev: number): DecodedDataField | null {
  const baseFields = parseParameterized(data, MID_0900_FIELDS);
  if (baseFields.length === 0) return null;

  const numSamples = parseInt(baseFields.find(f => f.id === '03')?.value ?? '0') || 0;
  const traceType = baseFields.find(f => f.id === '02')?.value ?? '';

  // Field 04 contains the raw sample data block; skip it and parse any trailing PIDs
  const idx04 = data.indexOf('04');
  if (idx04 !== -1) {
    const sampleDataLen = numSamples * 7;
    const afterSamples = idx04 + 2 + sampleDataLen;
    baseFields.push({ id: '04', label: 'Sample Data', value: `${numSamples} samples`, status: 'info' });
    const pidFields = parseTracePids(data.substring(afterSamples));
    baseFields.push(...pidFields);
  }

  const tid = baseFields.find(f => f.id === '01')?.value ?? '';
  const boltField = baseFields.find(f => f.label === 'Bolt Number');
  const boltInfo = boltField ? ` — Bolt ${boltField.value}` : '';
  return { fields: baseFields, summary: `${traceType} trace, ${numSamples} samples (ID: ${tid})${boltInfo}` };
}

/** Decode MID 0901: parse plot parameter fields and trailing PIDs */
export function decodeMid0901(data: string, _rev: number): DecodedDataField | null {
  const baseFields = parseParameterized(data, MID_0901_FIELDS);
  if (baseFields.length === 0) return null;

  const afterStandard = 50;
  if (data.length > afterStandard) {
    const pidFields = parseTracePids(data.substring(afterStandard));
    baseFields.push(...pidFields);
  }

  const tid = baseFields.find(f => f.id === '01')?.value ?? '';
  const boltField = baseFields.find(f => f.label === 'Bolt Number');
  const boltInfo = boltField ? ` — Bolt ${boltField.value}` : '';
  return { fields: baseFields, summary: `Plot params (ID: ${tid})${boltInfo}` };
}

/** Trace decoder entries — all revisions use the same field definitions */
export const traceDecoderEntries: Record<string, DecoderEntry> = {
  '0900': { 1: MID_0900_FIELDS, 2: MID_0900_FIELDS, 3: MID_0900_FIELDS },
  '0901': { 1: MID_0901_FIELDS, 2: MID_0901_FIELDS, 3: MID_0901_FIELDS },
};
