/**
 * biblaOp — Open Protocol Library
 * Identifier MID field definitions: MID 0050, 0052, 0150, 0152
 */

import type { FieldDef, DecoderEntry } from '../types/decoders';

const MID_0050_FIELDS: FieldDef[] = [{ id: '01', label: 'VIN Number', length: 25 }];

export const MID_0052_FIELDS: FieldDef[] = [{ id: '01', label: 'VIN Number', length: 25 }];

const MID_0150_REV1: FieldDef[] = [{ id: '01', label: 'Identifier Data', length: 25 }];
const MID_0150_REV2: FieldDef[] = [
  { id: '01', label: 'Identifier Type', length: 2 },
  { id: '02', label: 'Identifier Data', length: 25 },
];

const MID_0152_FIELDS: FieldDef[] = [
  { id: '01', label: 'First Identifier Status', length: 1, transform: (v) => v.trim() === '0' ? 'Not accepted' : v.trim() === '1' ? 'Accepted' : v.trim() },
  { id: '02', label: 'Second Identifier Status', length: 1, transform: (v) => v.trim() === '0' ? 'Not accepted' : v.trim() === '1' ? 'Accepted' : v.trim() },
  { id: '03', label: 'Third Identifier Status', length: 1, transform: (v) => v.trim() === '0' ? 'Not accepted' : v.trim() === '1' ? 'Accepted' : v.trim() },
  { id: '04', label: 'Fourth Identifier Status', length: 1, transform: (v) => v.trim() === '0' ? 'Not accepted' : v.trim() === '1' ? 'Accepted' : v.trim() },
  { id: '05', label: 'First Identifier String', length: 25 },
  { id: '06', label: 'Second Identifier String', length: 25 },
  { id: '07', label: 'Third Identifier String', length: 25 },
  { id: '08', label: 'Fourth Identifier String', length: 25 },
  { id: '09', label: 'Digit Identifier String', length: 25 },
  { id: '10', label: 'Result Part Status', length: 2 },
];

export const identifierDecoderEntries: Record<string, DecoderEntry> = {
  '0050': MID_0050_FIELDS,
  '0052': MID_0052_FIELDS,
  '0150': { 1: MID_0150_REV1, 2: MID_0150_REV2 },
  '0152': MID_0152_FIELDS,
};
