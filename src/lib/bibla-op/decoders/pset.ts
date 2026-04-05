/**
 * biblaOp — Open Protocol Library
 * Pset MID field definitions: MID 0011-0025, 2504-2505
 */

import type { FieldDef, DecoderEntry } from '../types/decoders';

const MID_0011_REV1: FieldDef[] = [{ id: '01', label: 'Number of Psets', length: 3 }];
const MID_0011_REV2: FieldDef[] = [{ id: '01', label: 'Number of Psets', length: 3 }];

const MID_0012_REV1: FieldDef[] = [{ id: '01', label: 'Parameter Set ID', length: 3 }];

export const MID_0013_REV1: FieldDef[] = [
  { id: '01', label: 'Pset ID', length: 3 },
  { id: '02', label: 'Pset Name', length: 25 },
  { id: '03', label: 'Rotation Direction', length: 2, transform: (v) => { const s = v.trim(); return s === '0' ? 'CW' : s === '1' ? 'CW' : s === '2' ? 'CCW' : s; } },
  { id: '04', label: 'Batch Size', length: 2 },
  { id: '05', label: 'Torque Min', length: 7, unit: 'Nm' },
  { id: '06', label: 'Torque Max', length: 7, unit: 'Nm' },
  { id: '07', label: 'Final Torque Target', length: 7, unit: 'Nm' },
  { id: '08', label: 'Angle Min', length: 5, unit: '°' },
  { id: '09', label: 'Angle Max', length: 5, unit: '°' },
  { id: '10', label: 'Final Angle Target', length: 5, unit: '°' },
];

const MID_0013_REV2: FieldDef[] = [
  ...MID_0013_REV1,
  { id: '11', label: 'First Target Torque', length: 7, unit: 'Nm' },
  { id: '12', label: 'Start Final Angle', length: 7, unit: 'Nm' },
];

const MID_0013_REV3 = MID_0013_REV1;

const MID_0013_REV5: FieldDef[] = [
  ...MID_0013_REV2,
  { id: '13', label: 'Current Monitoring', length: 1 },
  { id: '14', label: 'Post View Torque Activate', length: 1 },
  { id: '15', label: 'Post View Torque Min', length: 7, unit: 'Nm' },
  { id: '16', label: 'Post View Torque Max', length: 7, unit: 'Nm' },
];

export const MID_0015_REV1: FieldDef[] = [
  { id: '01', label: 'Pset ID', length: 3 },
  { id: '02', label: 'Timestamp', length: 19 },
];

const MID_0015_REV2: FieldDef[] = [
  ...MID_0015_REV1,
  { id: '03', label: 'Pset Name', length: 25 },
];

const MID_0015_REV3: FieldDef[] = [
  ...MID_0015_REV2,
  { id: '04', label: 'Rotation Direction', length: 2 },
  { id: '05', label: 'Batch Size', length: 4 },
  { id: '06', label: 'Batch Counter', length: 4 },
  { id: '07', label: 'Tightening Min Torque', length: 7, unit: 'Nm' },
  { id: '08', label: 'Tightening Max Torque', length: 7, unit: 'Nm' },
  { id: '09', label: 'Tightening Final Target Torque', length: 7, unit: 'Nm' },
  { id: '10', label: 'Tightening Min Angle', length: 5, unit: '°' },
  { id: '11', label: 'Tightening Max Angle', length: 5, unit: '°' },
  { id: '12', label: 'Tightening Final Target Angle', length: 5, unit: '°' },
];

const MID_0018_FIELDS: FieldDef[] = [{ id: '01', label: 'Parameter Set ID', length: 3 }];

const MID_0019_REV1: FieldDef[] = [
  { id: '01', label: 'Parameter Set ID', length: 3 },
  { id: '02', label: 'Batch Size', length: 4 },
];
const MID_0019_REV2: FieldDef[] = [...MID_0019_REV1];

const MID_0020_FIELDS: FieldDef[] = [{ id: '01', label: 'Parameter Set ID', length: 3 }];

const MID_0022_FIELDS: FieldDef[] = [
  { id: '01', label: 'Batch Size', length: 4 },
  { id: '02', label: 'Batch Counter', length: 4 },
  { id: '03', label: 'Timestamp', length: 19 },
];

const MID_0025_REV1: FieldDef[] = [
  { id: '01', label: 'Application Number', length: 3 },
  { id: '02', label: 'XML Parameters', length: 0, transform: (v) => {
    const trimmed = v.trim();
    if (trimmed.startsWith('<?xml') || trimmed.startsWith('<mPro')) {
      const appMatches = trimmed.match(/<Application /g);
      return appMatches ? `XML (${appMatches.length} application(s))` : 'XML document';
    }
    return trimmed.length > 200 ? trimmed.substring(0, 200) + '…' : trimmed;
  }},
];
const MID_0025_REV2: FieldDef[] = [
  { id: '01', label: 'XML Parameters', length: 0, transform: (v) => {
    const trimmed = v.trim();
    if (trimmed.startsWith('<?xml') || trimmed.startsWith('<mPro')) {
      const appMatches = trimmed.match(/<Application /g);
      return appMatches ? `XML v2.0 (${appMatches.length} application(s))` : 'XML v2.0 document';
    }
    return trimmed.length > 200 ? trimmed.substring(0, 200) + '…' : trimmed;
  }},
];

const MID_2504_FIELDS: FieldDef[] = [
  { id: '01', label: 'Parameter Set ID', length: 3 },
  { id: '02', label: 'Job ID', length: 4 },
  { id: '03', label: 'Job Step', length: 3 },
];

const MID_2505_FIELDS: FieldDef[] = [{ id: '01', label: 'Parameter Set ID', length: 3 }];

export const psetDecoderEntries: Record<string, DecoderEntry> = {
  '0011': { 1: MID_0011_REV1, 2: MID_0011_REV2 },
  '0012': { 1: MID_0012_REV1, 2: MID_0012_REV1, 3: MID_0012_REV1, 4: MID_0012_REV1, 5: MID_0012_REV1 },
  '0013': { 1: MID_0013_REV1, 2: MID_0013_REV2, 3: MID_0013_REV3, 4: MID_0013_REV3, 5: MID_0013_REV5 },
  '0015': { 1: MID_0015_REV1, 2: MID_0015_REV2, 3: MID_0015_REV3 },
  '0018': MID_0018_FIELDS,
  '0019': { 1: MID_0019_REV1, 2: MID_0019_REV2 },
  '0020': MID_0020_FIELDS,
  '0022': MID_0022_FIELDS,
  '0025': { 1: MID_0025_REV1, 2: MID_0025_REV2 },
  '2504': MID_2504_FIELDS,
  '2505': MID_2505_FIELDS,
};
