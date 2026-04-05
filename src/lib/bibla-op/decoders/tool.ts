/**
 * biblaOp — Open Protocol Library
 * Tool MID field definitions: MID 0041-0048, 0700-0701
 */

import type { FieldDef, DecoderEntry } from '../types/decoders';

export const MID_0041_REV1: FieldDef[] = [
  { id: '01', label: 'Tool Serial Number', length: 14 },
  { id: '02', label: 'No. of Tightenings', length: 10 },
  { id: '03', label: 'Last Calibration', length: 19 },
  { id: '04', label: 'Controller Serial Number', length: 10 },
];

export const MID_0041_REV2: FieldDef[] = [
  ...MID_0041_REV1,
  { id: '05', label: 'Calibration Value', length: 7, unit: 'Nm' },
  { id: '06', label: 'Last Service Date', length: 19 },
  { id: '07', label: 'Tightenings Since Service', length: 10 },
  { id: '08', label: 'Tool Type', length: 2 },
];

const MID_0041_REV3: FieldDef[] = [
  ...MID_0041_REV2,
  { id: '09', label: 'Motor Size', length: 2 },
  { id: '10', label: 'Open End Data', length: 30 },
];

const MID_0041_REV4: FieldDef[] = [
  ...MID_0041_REV3,
  { id: '11', label: 'Controller Software Version', length: 19 },
];

const MID_0041_REV5: FieldDef[] = [
  ...MID_0041_REV4,
  { id: '12', label: 'Tool Max Torque', length: 7, unit: 'Nm' },
  { id: '13', label: 'Gear Ratio', length: 6 },
  { id: '14', label: 'Tool Full Speed', length: 6, unit: 'rpm' },
];

const MID_0041_REV6: FieldDef[] = [
  ...MID_0041_REV5,
  { id: '15', label: 'Primary Tool', length: 1 },
  { id: '16', label: 'Tool Model', length: 12 },
];

const MID_0041_REV7: FieldDef[] = [
  ...MID_0041_REV6,
  { id: '17', label: 'Tool Article Number', length: 12 },
  { id: '18', label: 'Tool Torque Transducer Serial', length: 14 },
];

const MID_0041_REV8: FieldDef[] = [
  ...MID_0041_REV7,
  { id: '19', label: 'Calibration Certificate Expiry', length: 19 },
];

const MID_0041_REV9: FieldDef[] = [
  ...MID_0041_REV8,
  { id: '20', label: 'Tool Temperature', length: 4, unit: '°C' },
];

const MID_0045_REV1: FieldDef[] = [
  { id: '01', label: 'Calibration Value Unit', length: 1, transform: (v) => {
    const u: Record<string, string> = { '1': 'Nm', '2': 'ft·lbf', '3': 'cNm', '4': 'kNm', '5': 'MNm', '6': 'in·lbf', '7': 'Kpm' };
    return u[v.trim()] ?? v.trim();
  }},
  { id: '02', label: 'Channel/Spindle No', length: 2 },
  { id: '03', label: 'Calibration Value', length: 7, unit: 'Nm' },
];
const MID_0045_REV2: FieldDef[] = [
  ...MID_0045_REV1,
  { id: '04', label: 'Calibration Value New Unit', length: 7 },
];
const MID_0045_REV3: FieldDef[] = [
  ...MID_0045_REV2,
  { id: '05', label: 'Tool Open End', length: 1, transform: (v) => v.trim() === '1' ? 'Open end' : 'Standard' },
];

const MID_0046_FIELDS: FieldDef[] = [
  { id: '01', label: 'Tool Number', length: 2 },
];

const MID_0047_FIELDS: FieldDef[] = [
  { id: '01', label: 'Pairing Handling Type', length: 2, transform: (v) => {
    const t: Record<string, string> = { '01': 'Pair by serial', '02': 'Pair by IR ID', '03': 'Disconn (unpair)', '04': 'Set IR ID', '05': 'Set Radio Channel' };
    return t[v.trim()] ?? v.trim();
  }},
  { id: '02', label: 'Tool Data', length: 14 },
];

const MID_0048_FIELDS: FieldDef[] = [
  { id: '01', label: 'Pairing Status', length: 2, transform: (v) => {
    const s: Record<string, string> = { '00': 'Not paired', '01': 'Paired, connected', '02': 'Paired, disconnected' };
    return s[v.trim()] ?? v.trim();
  }},
  { id: '02', label: 'Timestamp', length: 19 },
];

const MID_0700_FIELDS: FieldDef[] = [
  { id: '01', label: 'Status', length: 1, transform: (v) => {
    const s: Record<string, string> = { '0': 'Idle', '1': 'Downloading', '2': 'Download complete', '3': 'Download error' };
    return s[v.trim()] ?? v.trim();
  }},
  { id: '02', label: 'Tightening ID', length: 10 },
];

const MID_0701_FIELDS: FieldDef[] = [
  { id: '01', label: 'Number of Tools', length: 3 },
];

export const toolDecoderEntries: Record<string, DecoderEntry> = {
  '0041': {
    1: MID_0041_REV1, 2: MID_0041_REV2, 3: MID_0041_REV3, 4: MID_0041_REV4,
    5: MID_0041_REV5, 6: MID_0041_REV6, 7: MID_0041_REV7, 8: MID_0041_REV8, 9: MID_0041_REV9,
  },
  '0045': { 1: MID_0045_REV1, 2: MID_0045_REV2, 3: MID_0045_REV3 },
  '0046': MID_0046_FIELDS,
  '0047': MID_0047_FIELDS,
  '0048': MID_0048_FIELDS,
  '0700': MID_0700_FIELDS,
  '0701': MID_0701_FIELDS,
};
