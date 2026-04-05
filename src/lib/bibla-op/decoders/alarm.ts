/**
 * biblaOp — Open Protocol Library
 * Alarm MID field definitions: MID 0071, 0074, 0076, 0078
 */

import type { FieldDef, DecoderEntry } from '../types/decoders';

const MID_0071_FIELDS: FieldDef[] = [
  { id: '01', label: 'Error Code', length: 5 },
  { id: '02', label: 'Controller Ready', length: 1, transform: (v) => v.trim() === '1' ? 'Yes' : 'No' },
  { id: '03', label: 'Tool Ready', length: 1, transform: (v) => v.trim() === '1' ? 'Yes' : 'No' },
  { id: '04', label: 'Time', length: 19 },
];

const MID_0074_REV1: FieldDef[] = [
  { id: '01', label: 'Error Code', length: 5 },
  { id: '02', label: 'Controller Ready', length: 1, transform: (v) => v.trim() === '1' ? 'Yes' : 'No' },
  { id: '03', label: 'Tool Ready', length: 1, transform: (v) => v.trim() === '1' ? 'Yes' : 'No' },
  { id: '04', label: 'Time', length: 19 },
];
const MID_0074_REV2: FieldDef[] = [
  ...MID_0074_REV1,
  { id: '05', label: 'Error Text', length: 40 },
];

const MID_0076_REV1: FieldDef[] = [
  { id: '01', label: 'Alarm Status', length: 1, transform: (v) => v.trim() === '1' ? 'Active' : 'Cleared' },
  { id: '02', label: 'Error Code', length: 5 },
  { id: '03', label: 'Controller Ready', length: 1, transform: (v) => v.trim() === '1' ? 'Yes' : 'No' },
  { id: '04', label: 'Tool Ready', length: 1, transform: (v) => v.trim() === '1' ? 'Yes' : 'No' },
  { id: '05', label: 'Time', length: 19 },
];
const MID_0076_REV2: FieldDef[] = [
  ...MID_0076_REV1,
  { id: '06', label: 'Error Text', length: 40 },
];
const MID_0076_REV3: FieldDef[] = [
  ...MID_0076_REV2,
  { id: '07', label: 'Error Severity', length: 1, transform: (v) => {
    const s: Record<string, string> = { '0': 'Info', '1': 'Warning', '2': 'Error', '3': 'Fatal' };
    return s[v.trim()] ?? v.trim();
  }},
];

const MID_0078_FIELDS: FieldDef[] = [
  { id: '01', label: 'Error Code', length: 5 },
];

export const alarmDecoderEntries: Record<string, DecoderEntry> = {
  '0071': MID_0071_FIELDS,
  '0074': { 1: MID_0074_REV1, 2: MID_0074_REV2 },
  '0076': { 1: MID_0076_REV1, 2: MID_0076_REV2, 3: MID_0076_REV3 },
  '0078': MID_0078_FIELDS,
};
