/**
 * biblaOp — Open Protocol Library
 * Variable data field parser (PID-based) and MID 1201/1202 decoders
 */

import type { DecodedField, DecodedDataField } from '../types/decoders';

const TIGHTENING_ERROR_BITS: Array<{ bit: bigint; label: string }> = [
  { bit: BigInt('0x00000000000000000000000000000001'), label: 'Brake Failed' },
  { bit: BigInt('0x00000000000000000000000000000002'), label: 'Trigger Lost' },
  { bit: BigInt('0x00000000000000000000000000000004'), label: 'Shunt Failed' },
  { bit: BigInt('0x00000000000000000000000000000008'), label: 'Zero Offset Failed' },
  { bit: BigInt('0x00000000000000000000000000001000'), label: 'Engage Failed' },
  { bit: BigInt('0x00000000000000000000000000010000'), label: 'Peak Torque Not Measured' },
  { bit: BigInt('0x00000000000000000000000000020000'), label: 'Peak Torque Low' },
  { bit: BigInt('0x00000000000000000000000000040000'), label: 'Peak Torque High' },
  { bit: BigInt('0x00000000000000000000000000080000'), label: 'Shut Off Torque Low' },
  { bit: BigInt('0x00000000000000000000000000100000'), label: 'Shut Off Torque High' },
  { bit: BigInt('0x00000000000000000000000000200000'), label: 'Torque Rate Not Measured' },
  { bit: BigInt('0x00000000000000000000000000400000'), label: 'Torque Rate Low' },
  { bit: BigInt('0x00000000000000000000000000800000'), label: 'Torque Rate High' },
  { bit: BigInt('0x00000000000000000000000001000000'), label: 'Torque Rate Deviation Too Big' },
  { bit: BigInt('0x00000000000000000000000004000000'), label: 'Angle Not Measured' },
  { bit: BigInt('0x00000000000000000000000008000000'), label: 'Angle Low' },
  { bit: BigInt('0x00000000000000000000000010000000'), label: 'Angle High' },
  { bit: BigInt('0x00000000000000000000000020000000'), label: 'Torque In Window Not Measured' },
  { bit: BigInt('0x00000000000000000000000040000000'), label: 'Torque In Window Low' },
  { bit: BigInt('0x00000000000000000000000080000000'), label: 'Torque In Window High' },
];

const ERROR_BITFIELD_PIDS = new Set(['01401', '01421', '05001', '05004']);

function decodeTighteningErrorBitfield(hexStr: string): string {
  const cleaned = hexStr.replace(/\s/g, '').toLowerCase();
  if (!cleaned || /^0+$/.test(cleaned)) return 'None';
  try {
    const val = BigInt('0x' + cleaned);
    const errors: string[] = [];
    for (const { bit, label } of TIGHTENING_ERROR_BITS) {
      if ((val & bit) !== BigInt(0)) {
        errors.push(label);
      }
    }
    return errors.length > 0 ? errors.join(', ') : `Unknown (0x${cleaned})`;
  } catch {
    return hexStr.trim();
  }
}

const VARIABLE_PID_LABELS: Record<string, { label: string; unit?: string }> = {
  '00003': { label: 'Station Name' },
  '00010': { label: 'VIN Number' },
  '00011': { label: 'Identifier 1' }, '00012': { label: 'Identifier 2' },
  '00013': { label: 'Identifier 3' }, '00014': { label: 'Identifier 4' },
  '00100': { label: 'Batch Size' }, '00101': { label: 'Batch Counter' },
  '00102': { label: 'Batch Status' },
  '01000': { label: 'Tightening Program Number' }, '01001': { label: 'Tightening Program Name' },
  '01202': { label: 'Tool Serial Number' }, '01205': { label: 'Tool Number' },
  '01300': { label: 'Bolt Name' }, '01301': { label: 'Bolt Number' },
  '01400': { label: 'Tightening Status' }, '01401': { label: 'Tightening Error Codes' },
  '01402': { label: 'Torque Status' }, '01403': { label: 'Angle Status' },
  '01421': { label: 'Primary Error' },
  '01504': { label: 'Sync Group ID / Station Number' },
  '02000': { label: 'Torque, Final Target', unit: 'Nm' },
  '02001': { label: 'Torque, Measured Value', unit: 'Nm' },
  '02002': { label: 'Torque, Final Upper Limit', unit: 'Nm' },
  '02003': { label: 'Torque, Final Lower Limit', unit: 'Nm' },
  '02010': { label: 'Angle, Target', unit: '°' },
  '02011': { label: 'Angle, Measured Value', unit: '°' },
  '02012': { label: 'Angle, Upper Limit', unit: '°' },
  '02013': { label: 'Angle, Lower Limit', unit: '°' },
  '02021': { label: 'Current, Measured', unit: 'A' },
  '02044': { label: 'Rundown Angle Measured', unit: '°' },
  '02092': { label: 'Self-tap Torque Measured', unit: 'Nm' },
  '02093': { label: 'Prevailing Torque Measured', unit: 'Nm' },
  '02170': { label: 'Elapsed Time', unit: 'ms' },
  '05000': { label: 'Tightening Step Strategy' }, '05001': { label: 'Step Error Codes' },
  '05002': { label: 'Step Name' }, '05003': { label: 'Step Status' },
  '05004': { label: 'Step Primary Error' },
  '05101': { label: 'Step Torque', unit: 'Nm' },
  '05112': { label: 'Step Angle', unit: '°' },
  '05121': { label: 'Step Current', unit: 'A' },
  '05169': { label: 'Step Time', unit: 'ms' },
};

export { decodeTighteningErrorBitfield, TIGHTENING_ERROR_BITS };

export function parseVariableDataFields(data: string): DecodedField[] {
  const fields: DecodedField[] = [];
  let pos = 0;
  while (pos + 8 <= data.length) {
    const pid = data.substring(pos, pos + 5);
    const lenStr = data.substring(pos + 5, pos + 8);
    const len = parseInt(lenStr) || 0;
    pos += 8;
    if (len <= 0 || pos + len > data.length) break;
    const value = data.substring(pos, pos + len);
    pos += len;
    const meta = VARIABLE_PID_LABELS[pid];
    let displayValue = value.trim() || value;

    if (ERROR_BITFIELD_PIDS.has(pid)) {
      const decoded = decodeTighteningErrorBitfield(displayValue);
      if (decoded !== displayValue) {
        displayValue = decoded;
      }
    }

    fields.push({ id: pid, label: meta?.label ?? `PID ${pid}`, value: displayValue, unit: meta?.unit });
  }
  return fields;
}

export function decodeMID1201(dataField: string, revision: number): DecodedDataField | null {
  if (!dataField) return null;
  const fields: DecodedField[] = [];
  let pos = 0;

  if (revision >= 1) {
    const numDataFields = parseInt(dataField.substring(pos, pos + 3)) || 0;
    fields.push({ id: '00', label: 'Number of Data Fields', value: String(numDataFields) });
    pos += 3;
  }

  const varFields = parseVariableDataFields(dataField.substring(pos));
  fields.push(...varFields);

  const tStatus = varFields.find(f => f.id === '01400');
  const torque = varFields.find(f => f.id === '02001');
  const angle = varFields.find(f => f.id === '02011');
  let summary: string | undefined;
  if (tStatus && torque) {
    summary = `${tStatus.value} — ${torque.value} Nm / ${angle?.value ?? '?'}°`;
  }

  return { fields, summary, revision };
}

export function decodeMID1202(dataField: string, revision: number): DecodedDataField | null {
  if (!dataField) return null;
  const fields: DecodedField[] = [];
  let pos = 0;

  if (revision >= 1) {
    const numDataFields = parseInt(dataField.substring(pos, pos + 3)) || 0;
    fields.push({ id: '00', label: 'Number of Data Fields', value: String(numDataFields) });
    pos += 3;
  }

  const varFields = parseVariableDataFields(dataField.substring(pos));
  fields.push(...varFields);

  return { fields, revision };
}
