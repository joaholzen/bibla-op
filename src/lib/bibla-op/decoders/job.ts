/**
 * biblaOp — Open Protocol Library
 * Job MID field definitions: MID 0031-0039, 0121-0140
 *
 * Jobs define sequences of tightening operations. These MIDs handle
 * job listing, data upload, status notifications, selection, and
 * advanced features like line control and job restart.
 */

import type { FieldDef, DecoderEntry } from '../types/decoders';
import { batchStatusLabel } from './parsers';

/** Transform job status code to label */
const jobStatusTransform = (v: string): string => {
  const s = v.trim();
  if (s === '0') return 'Not completed';
  if (s === '1') return 'OK';
  if (s === '2') return 'NOK';
  if (s === '3') return 'Aborted';
  if (s === '4') return 'Restart';
  return s;
};

/** Transform job tightening status code to label (extended status set) */
const jobTighteningStatusTransform = (v: string): string => {
  const map: Record<string, string> = {
    '0': 'OFF', '1': 'OK', '2': 'NOK', '3': 'Aborted', '4': 'Incremented',
    '5': 'Decremented', '6': 'Bypassed', '7': 'Reset Batch', '8': 'Loosening',
    '9': 'Free Batch', '10': 'Job Aborted', '11': 'Job Restart',
  };
  return map[v.trim()] ?? v.trim();
};

// MID 0032: Job Data Upload Request
const MID_0032_REV1: FieldDef[] = [{ id: '01', label: 'Job ID', length: 2 }];
const MID_0032_REV2: FieldDef[] = [{ id: '01', label: 'Job ID', length: 4 }];

/** MID 0033 rev 1: Job Data Upload Reply — 2-digit job ID */
export const MID_0033_REV1: FieldDef[] = [
  { id: '01', label: 'Job ID', length: 2 },
  { id: '02', label: 'Job Name', length: 25 },
  { id: '03', label: 'Forced Order', length: 1, transform: (v) => { const s = v.trim(); return s === '0' ? 'Free' : s === '1' ? 'Forced' : s === '2' ? 'Free & Forced' : s; } },
  { id: '04', label: 'Max Time First Tightening', length: 4 },
  { id: '05', label: 'Max Time Complete Job', length: 5 },
  { id: '06', label: 'Job Batch Mode', length: 1, transform: (v) => v.trim() === '0' ? 'OK only' : 'OK + NOK' },
  { id: '07', label: 'Lock at Job Done', length: 1, transform: (v) => v.trim() === '1' ? 'Yes' : 'No' },
  { id: '08', label: 'Use Line Control', length: 1, transform: (v) => v.trim() === '1' ? 'Yes' : 'No' },
  { id: '09', label: 'Repeat Job', length: 1, transform: (v) => v.trim() === '1' ? 'Yes' : 'No' },
  { id: '10', label: 'Tool Loosening', length: 1, transform: (v) => { const s = v.trim(); return s === '0' ? 'Enable' : s === '1' ? 'Disable' : s === '2' ? 'Enable on NOK' : s; } },
  { id: '11', label: 'Reserved', length: 1 },
  { id: '12', label: 'Number of PSETs', length: 2 },
];

/** MID 0033 rev 2: 4-digit job ID */
const MID_0033_REV2: FieldDef[] = [
  { id: '01', label: 'Job ID', length: 4 },
  { id: '02', label: 'Job Name', length: 25 },
  { id: '03', label: 'Forced Order', length: 1, transform: (v) => { const s = v.trim(); return s === '0' ? 'Free' : s === '1' ? 'Forced' : s === '2' ? 'Free & Forced' : s; } },
  { id: '04', label: 'Max Time First Tightening', length: 4 },
  { id: '05', label: 'Max Time Complete Job', length: 5 },
  { id: '06', label: 'Job Batch Mode', length: 1, transform: (v) => v.trim() === '0' ? 'OK only' : 'OK + NOK' },
  { id: '07', label: 'Lock at Job Done', length: 1, transform: (v) => v.trim() === '1' ? 'Yes' : 'No' },
  { id: '08', label: 'Use Line Control', length: 1, transform: (v) => v.trim() === '1' ? 'Yes' : 'No' },
  { id: '09', label: 'Repeat Job', length: 1, transform: (v) => v.trim() === '1' ? 'Yes' : 'No' },
  { id: '10', label: 'Tool Loosening', length: 1, transform: (v) => { const s = v.trim(); return s === '0' ? 'Enable' : s === '1' ? 'Disable' : s === '2' ? 'Enable on NOK' : s; } },
  { id: '11', label: 'Reserved', length: 1 },
  { id: '12', label: 'Number of PSETs', length: 2 },
];

/** MID 0035: Job Info notification — status, batch, and timing data */
const MID_0035_REV1: FieldDef[] = [
  { id: '01', label: 'Job ID', length: 2 },
  { id: '02', label: 'Job Status', length: 1, transform: jobStatusTransform },
  { id: '03', label: 'Job Batch Mode', length: 1, transform: (v) => v.trim() === '0' ? 'OK only' : 'OK + NOK' },
  { id: '04', label: 'Job Batch Size', length: 4 },
  { id: '05', label: 'Job Batch Counter', length: 4 },
  { id: '06', label: 'Timestamp', length: 19 },
];
const MID_0035_REV2: FieldDef[] = [
  { id: '01', label: 'Job ID', length: 4 },
  { id: '02', label: 'Job Status', length: 1, transform: jobStatusTransform },
  { id: '03', label: 'Job Batch Mode', length: 1, transform: (v) => v.trim() === '0' ? 'OK only' : 'OK + NOK' },
  { id: '04', label: 'Job Batch Size', length: 4 },
  { id: '05', label: 'Job Batch Counter', length: 4 },
  { id: '06', label: 'Timestamp', length: 19 },
];
const MID_0035_REV3: FieldDef[] = [
  ...MID_0035_REV2,
  { id: '07', label: 'Job Current Step', length: 3 },
  { id: '08', label: 'Job Total Steps', length: 3 },
  { id: '09', label: 'Job Step Type', length: 2 },
];
const MID_0035_REV4: FieldDef[] = [
  ...MID_0035_REV3,
  { id: '10', label: 'Job Tightening Status', length: 2, transform: jobTighteningStatusTransform },
];
const MID_0035_REV5: FieldDef[] = [
  ...MID_0035_REV4,
  { id: '11', label: 'Job Sequence Number', length: 5 },
  { id: '12', label: 'VIN Number', length: 25 },
  { id: '13', label: 'Identifier Result Part 2', length: 25 },
  { id: '14', label: 'Identifier Result Part 3', length: 25 },
  { id: '15', label: 'Identifier Result Part 4', length: 25 },
];
const MID_0035_REV6: FieldDef[] = [
  ...MID_0035_REV5,
  { id: '16', label: 'Reserved', length: 2 },
  { id: '17', label: 'Tightening Time High', length: 6, unit: 'ms' },
];

// MID 0038/0039: Select Job / Job Restart
const MID_0038_REV1: FieldDef[] = [{ id: '01', label: 'Job ID', length: 2 }];
const MID_0038_REV2: FieldDef[] = [{ id: '01', label: 'Job ID', length: 4 }];
const MID_0039_REV1: FieldDef[] = [{ id: '01', label: 'Job ID', length: 2 }];
const MID_0039_REV2: FieldDef[] = [{ id: '01', label: 'Job ID', length: 4 }];

// MID 0121-0124: Job Line Control
const MID_0121_FIELDS: FieldDef[] = [{ id: '01', label: 'Job ID', length: 4 }, { id: '02', label: 'Sequence Number', length: 5 }];
const MID_0122_FIELDS: FieldDef[] = [{ id: '01', label: 'Job ID', length: 4 }, { id: '02', label: 'Sequence Number', length: 5 }];
const MID_0123_FIELDS: FieldDef[] = [{ id: '01', label: 'Job ID', length: 4 }, { id: '02', label: 'Sequence Number', length: 5 }];
const MID_0124_FIELDS: FieldDef[] = [{ id: '01', label: 'Job ID', length: 4 }, { id: '02', label: 'Sequence Number', length: 5 }];

// MID 0131-0133: Line Control and Alert flags
const MID_0131_FIELDS: FieldDef[] = [
  { id: '01', label: 'Job ID', length: 4 },
  { id: '02', label: 'Line Control Flag', length: 1, transform: (v) => v.trim() === '1' ? 'Active' : 'Inactive' },
];
const MID_0132_FIELDS: FieldDef[] = [
  { id: '01', label: 'Job ID', length: 4 },
  { id: '02', label: 'Alert 1 Flag', length: 1, transform: (v) => v.trim() === '1' ? 'Active' : 'Inactive' },
];
const MID_0133_FIELDS: FieldDef[] = [
  { id: '01', label: 'Job ID', length: 4 },
  { id: '02', label: 'Alert 2 Flag', length: 1, transform: (v) => v.trim() === '1' ? 'Active' : 'Inactive' },
];

/** MID 0140: Job Advanced — configuration details across revisions */
const MID_0140_REV1: FieldDef[] = [
  { id: '01', label: 'Job ID', length: 2 },
  { id: '02', label: 'Job Name', length: 25 },
  { id: '03', label: 'Number of PSETs', length: 2 },
];
const MID_0140_REV2: FieldDef[] = [
  { id: '01', label: 'Job ID', length: 4 },
  { id: '02', label: 'Job Name', length: 25 },
  { id: '03', label: 'Forced Order', length: 1 },
  { id: '04', label: 'Number of PSETs', length: 2 },
];
const MID_0140_REV3: FieldDef[] = [
  { id: '01', label: 'Job ID', length: 4 },
  { id: '02', label: 'Job Name', length: 25 },
  { id: '03', label: 'Forced Order', length: 1 },
  { id: '04', label: 'Lock at Job Done', length: 1 },
  { id: '05', label: 'Tool Loosening', length: 1 },
  { id: '06', label: 'Repeat Job', length: 1 },
  { id: '07', label: 'Job Batch Mode', length: 1 },
  { id: '08', label: 'Batch Status at Decrement', length: 1 },
  { id: '09', label: 'Decrement Batch at OK', length: 1 },
  { id: '10', label: 'Number of PSETs', length: 2 },
];
const MID_0140_REV4: FieldDef[] = [
  ...MID_0140_REV3,
  { id: '11', label: 'Max Time First Tightening', length: 4 },
  { id: '12', label: 'Max Time Complete Job', length: 5 },
  { id: '13', label: 'Use Line Control', length: 1 },
  { id: '14', label: 'Identifier Result Part', length: 1 },
];

/** All job decoder entries keyed by MID number */
export const jobDecoderEntries: Record<string, DecoderEntry> = {
  '0032': { 1: MID_0032_REV1, 2: MID_0032_REV2, 3: MID_0032_REV2, 4: MID_0032_REV2 },
  '0033': { 1: MID_0033_REV1, 2: MID_0033_REV2, 3: MID_0033_REV2, 4: MID_0033_REV2, 5: MID_0033_REV2 },
  '0035': { 1: MID_0035_REV1, 2: MID_0035_REV2, 3: MID_0035_REV3, 4: MID_0035_REV4, 5: MID_0035_REV5, 6: MID_0035_REV6 },
  '0038': { 1: MID_0038_REV1, 2: MID_0038_REV2 },
  '0039': { 1: MID_0039_REV1, 2: MID_0039_REV2 },
  '0121': MID_0121_FIELDS,
  '0122': MID_0122_FIELDS,
  '0123': MID_0123_FIELDS,
  '0124': MID_0124_FIELDS,
  '0131': MID_0131_FIELDS,
  '0132': MID_0132_FIELDS,
  '0133': MID_0133_FIELDS,
  '0140': { 1: MID_0140_REV1, 2: MID_0140_REV2, 3: MID_0140_REV3, 4: MID_0140_REV4, 999: MID_0140_REV4 },
};
