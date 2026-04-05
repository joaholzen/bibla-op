/**
 * biblaOp — Open Protocol Library
 * Communication MID field definitions: MID 0001, 0002, 0004, 0005, 0006, 0008, 0009, 9998
 */

import type { FieldDef, DecoderEntry } from '../types/decoders';

const MID_0001_REV7: FieldDef[] = [
  { id: '01', label: 'Optional Keep Alive', length: 1,
    transform: (v) => v === '0' ? '0 - Use Keep alive (mandatory)' : v === '1' ? '1 - Ignore Keep alive (optional)' : v },
];

const MID_0001_REV8: FieldDef[] = [
  ...MID_0001_REV7,
  { id: '02', label: 'Tool Lock at Disconnection', length: 1,
    transform: (v) => v === '0' ? '0 - No tool lock' : v === '1' ? '1 - Tool lock' : v },
  { id: '03', label: 'Early Lock Time', length: 4, unit: '×0.1s',
    transform: (v) => {
      const n = parseInt(v);
      if (isNaN(n) || n === 0) return 'Not used';
      return `${(n / 10).toFixed(1)}s`;
    }
  },
];

export const MID_0002_REV1: FieldDef[] = [
  { id: '01', label: 'Cell ID', length: 4 },
  { id: '02', label: 'Channel ID', length: 2 },
  { id: '03', label: 'Controller Name', length: 25 },
];

export const MID_0002_REV2: FieldDef[] = [
  ...MID_0002_REV1,
  { id: '04', label: 'Supplier Code', length: 3 },
];

export const MID_0002_REV3: FieldDef[] = [
  ...MID_0002_REV2,
  { id: '05', label: 'Open Protocol Version', length: 19 },
  { id: '06', label: 'Controller Software Version', length: 19 },
  { id: '07', label: 'Tool Software Version', length: 19 },
];

export const MID_0002_REV4: FieldDef[] = [
  ...MID_0002_REV3,
  { id: '08', label: 'RBU Type', length: 24 },
  { id: '09', label: 'Controller Serial Number', length: 10 },
];

export const MID_0002_REV5: FieldDef[] = [
  ...MID_0002_REV4,
  { id: '10', label: 'System Type', length: 3,
    transform: (v) => {
      const map: Record<string, string> = {
        '000': '000 - Not set', '001': '001 - Power Focus 4000',
        '002': '002 - Power MACS 4000', '003': '003 - Power Focus 6000',
        '004': '004 - Micro Torque Focus 6000',
      };
      return map[v] ?? v;
    }
  },
  { id: '11', label: 'System Subtype', length: 3,
    transform: (v) => {
      const map: Record<string, string> = {
        '000': '000 - No subtype', '001': '001 - Normal tightening',
        '002': '002 - Press system',
      };
      return map[v] ?? v;
    }
  },
];

export const MID_0002_REV6: FieldDef[] = [
  ...MID_0002_REV5,
  { id: '12', label: 'Sequence Number Support', length: 1,
    transform: (v) => v === '1' ? '1 - Supported' : '0 - Not supported' },
  { id: '13', label: 'Linking Handling Support', length: 1,
    transform: (v) => v === '1' ? '1 - Supported' : '0 - Not supported' },
  { id: '14', label: 'Station ID', length: 10 },
  { id: '15', label: 'Station Name', length: 25 },
  { id: '16', label: 'Client ID', length: 1 },
];

export const MID_0002_REV7: FieldDef[] = [
  ...MID_0002_REV6,
  { id: '17', label: 'Optional Keep Alive', length: 1,
    transform: (v) => v === '0' ? '0 - Use Keep alive (mandatory)' : v === '1' ? '1 - Ignore Keep alive (optional)' : v },
];

export const MID_0002_REV8: FieldDef[] = [
  ...MID_0002_REV7,
  { id: '18', label: 'Tool Lock at Disconnection', length: 1,
    transform: (v) => v === '0' ? '0 - No tool lock' : v === '1' ? '1 - Tool lock' : v },
  { id: '19', label: 'Early Lock Time', length: 4, unit: '×0.1s',
    transform: (v) => {
      const n = parseInt(v);
      if (isNaN(n) || n === 0) return 'Not used';
      return `${(n / 10).toFixed(1)}s`;
    }
  },
];

const MID_0004_FIELDS: FieldDef[] = [
  { id: '01', label: 'Rejected MID', length: 4 },
  { id: '02', label: 'Error Code', length: 2 },
];

const MID_0005_FIELDS: FieldDef[] = [
  { id: '01', label: 'Acknowledged MID', length: 4 },
];

const MID_0006_FIELDS: FieldDef[] = [
  { id: '01', label: 'Requested MID', length: 4 },
  { id: '02', label: 'Revision', length: 3 },
  { id: '03', label: 'Extra Data Length', length: 3 },
];

const MID_0008_FIELDS: FieldDef[] = [
  { id: '01', label: 'Data MID', length: 4 },
  { id: '02', label: 'Revision', length: 3 },
  { id: '03', label: 'Extra Data Length', length: 3 },
];

const MID_0009_FIELDS: FieldDef[] = [
  { id: '01', label: 'Data MID', length: 4 },
  { id: '02', label: 'Revision', length: 3 },
  { id: '03', label: 'Extra Data Length', length: 3 },
];

const LINK_ERROR_CODES: Record<string, string> = {
  '0001': 'Invalid length',
  '0002': 'Invalid revision',
  '0003': 'Invalid sequence number',
  '0004': 'Inconsistent message parts/number',
};

const MID_9998_FIELDS: FieldDef[] = [
  { id: '01', label: 'MID Number', length: 4 },
  { id: '02', label: 'Error Code', length: 4,
    transform: (v) => LINK_ERROR_CODES[v] ? `${v} - ${LINK_ERROR_CODES[v]}` : v },
];

export const communicationDecoderEntries: Record<string, DecoderEntry> = {
  '0001': {
    7: MID_0001_REV7, 8: MID_0001_REV8,
  },
  '0002': {
    1: MID_0002_REV1, 2: MID_0002_REV2, 3: MID_0002_REV3, 4: MID_0002_REV4,
    5: MID_0002_REV5, 6: MID_0002_REV6, 7: MID_0002_REV7, 8: MID_0002_REV8,
  },
  '0004': MID_0004_FIELDS,
  '0005': MID_0005_FIELDS,
  '0006': MID_0006_FIELDS,
  '0008': MID_0008_FIELDS,
  '0009': MID_0009_FIELDS,
  '9998': MID_9998_FIELDS,
};
