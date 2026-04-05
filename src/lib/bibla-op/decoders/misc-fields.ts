/**
 * biblaOp — Open Protocol Library
 * Miscellaneous MID field definitions
 *
 * Covers time (0081/0082), multi-spindle sync (0091), multi-spindle results (0101),
 * PowerMACS (0106/0107/0108), user text/display (0110/0111), user data (0240/0242/0245),
 * selector sockets (0251/0254/0255), tool tags (0262/0265), histograms (0300/0301),
 * automatic/manual mode (0401/0404/0411), motor tuning (0501/0504),
 * HVO buttons/signals (0511/0515), and modes (2601-2606).
 */

import type { FieldDef, DecoderEntry } from '../types/decoders';
import { statusOkNok, tighteningStatusLabel, torqueAngleStatusLabel, torqueAngleStatusFn, batchStatusLabel } from './parsers';

// Time MIDs
const MID_0081_FIELDS: FieldDef[] = [{ id: '01', label: 'Time', length: 19 }];
const MID_0082_FIELDS: FieldDef[] = [{ id: '01', label: 'Time', length: 19 }];

/** MID 0091: Multi-spindle Status — sync tightening overview */
const MID_0091_FIELDS: FieldDef[] = [
  { id: '01', label: 'Number of Spindles', length: 2 },
  { id: '02', label: 'Sync Tightening ID', length: 5 },
  { id: '03', label: 'Time', length: 19 },
  { id: '04', label: 'Sync Overall Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
];

/** MID 0101: Multi-spindle Tightening Result — per-spindle torque/angle data */
const MID_0101_REV1: FieldDef[] = [
  { id: '01', label: 'Number of Spindles', length: 2 },
  { id: '02', label: 'VIN', length: 25 },
  { id: '03', label: 'Job ID', length: 2 },
  { id: '04', label: 'Pset ID', length: 3 },
  { id: '05', label: 'Batch Size', length: 4 },
  { id: '06', label: 'Batch Counter', length: 4 },
  { id: '07', label: 'Batch Status', length: 1, transform: batchStatusLabel },
  { id: '08', label: 'Torque Min', length: 6, unit: 'Nm' },
  { id: '09', label: 'Torque Max', length: 6, unit: 'Nm' },
  { id: '10', label: 'Torque Final Target', length: 6, unit: 'Nm' },
  { id: '11', label: 'Angle Min', length: 5, unit: '°' },
  { id: '12', label: 'Angle Max', length: 5, unit: '°' },
  { id: '13', label: 'Final Angle Target', length: 5, unit: '°' },
  { id: '14', label: 'Last Change', length: 19 },
  { id: '15', label: 'Timestamp', length: 19 },
  { id: '16', label: 'Sync Tightening ID', length: 5 },
  { id: '17', label: 'Sync Overall Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
];
const MID_0101_REV2: FieldDef[] = [...MID_0101_REV1, { id: '18', label: 'Spindle Status', length: 0 }];
const MID_0101_REV3: FieldDef[] = [...MID_0101_REV2, { id: '19', label: 'Torque Values Unit', length: 3 }, { id: '20', label: 'Angle Values Unit', length: 3 }];
const MID_0101_REV4: FieldDef[] = [...MID_0101_REV3, { id: '21', label: 'Result Type', length: 2 }, { id: '22', label: 'Identifier Part 2', length: 25 }, { id: '23', label: 'Identifier Part 3', length: 25 }, { id: '24', label: 'Identifier Part 4', length: 25 }];
const MID_0101_REV5: FieldDef[] = [...MID_0101_REV4, { id: '25', label: 'Customer Tightening Error Code', length: 4 }];
const MID_0101_REV6: FieldDef[] = [...MID_0101_REV5, { id: '26', label: 'Prevail Torque Compensate Value', length: 6, unit: 'Nm' }, { id: '27', label: 'Tightening Error Status 2', length: 10 }];

const MID_0104_FIELDS: FieldDef[] = [{ id: '01', label: 'Tightening ID', length: 10 }];

/** MID 0106: PowerMACS Station Result */
const MID_0106_FIELDS: FieldDef[] = [
  { id: '01', label: 'Total Messages', length: 2 }, { id: '02', label: 'Message Number', length: 2 },
  { id: '03', label: 'Data No System', length: 10 }, { id: '04', label: 'Station No', length: 2 },
  { id: '05', label: 'Station Name', length: 20 }, { id: '06', label: 'Time', length: 19 },
  { id: '07', label: 'Mode No', length: 2 }, { id: '08', label: 'Mode Name', length: 20 },
  { id: '09', label: 'Simple Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
  { id: '10', label: 'PM Status', length: 1, transform: (v) => { const s = v.trim(); return s === '0' ? 'OK' : s === '1' ? 'OKR' : s === '2' ? 'NOK' : s === '3' ? 'TERMNOK' : s; }, statusFn: (v) => { const s = v.trim(); return s === '0' ? 'ok' : s === '2' || s === '3' ? 'nok' : undefined; } },
  { id: '11', label: 'Wp. Id', length: 40 }, { id: '12', label: 'Number of Bolts', length: 2 },
  { id: '13', label: 'Bolt Number', length: 2 },
  { id: '14', label: 'Simple Bolt Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
  { id: '15', label: 'Torque Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '16', label: 'Angle Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '17', label: 'Final Torque', length: 7, unit: 'Nm' }, { id: '18', label: 'Final Angle', length: 7, unit: '°' },
  { id: '19', label: 'Torque High Limit', length: 7, unit: 'Nm' }, { id: '20', label: 'Torque Low Limit', length: 7, unit: 'Nm' },
  { id: '21', label: 'Angle High Limit', length: 7, unit: '°' }, { id: '22', label: 'Angle Low Limit', length: 7, unit: '°' },
  { id: '23', label: 'Special Values', length: 2 },
];

/** MID 0107: PowerMACS Bolt Result */
const MID_0107_FIELDS: FieldDef[] = [
  { id: '01', label: 'Total Messages', length: 2 }, { id: '02', label: 'Message Number', length: 2 },
  { id: '03', label: 'Data No System', length: 10 }, { id: '04', label: 'Station No', length: 2 },
  { id: '05', label: 'Time', length: 19 }, { id: '06', label: 'Bolt Number', length: 4 },
  { id: '07', label: 'Bolt Name', length: 20 }, { id: '08', label: 'Program Name', length: 20 },
  { id: '09', label: 'PM Status', length: 1, transform: (v) => { const s = v.trim(); return s === '0' ? 'OK' : s === '1' ? 'OKR' : s === '2' ? 'NOK' : s === '3' ? 'TERMNOK' : s; }, statusFn: (v) => { const s = v.trim(); return s === '0' ? 'ok' : s === '2' || s === '3' ? 'nok' : undefined; } },
  { id: '10', label: 'Errors', length: 50 }, { id: '11', label: 'Customer Error Code', length: 4 },
  { id: '12', label: 'Number of Bolt Results', length: 2 },
];
const MID_0108_FIELDS: FieldDef[] = [{ id: '01', label: 'Request Bolt Data', length: 2, transform: (v) => v.trim() === '01' ? 'Yes' : 'No' }];

// User text / display MIDs
const MID_0110_FIELDS: FieldDef[] = [{ id: '01', label: 'User Text', length: 40 }];
const MID_0111_FIELDS: FieldDef[] = [
  { id: '01', label: 'Line 1', length: 25 }, { id: '02', label: 'Line 2', length: 25 },
  { id: '03', label: 'Line 3', length: 25 }, { id: '04', label: 'Line 4', length: 25 },
  { id: '05', label: 'Duration', length: 4 },
  { id: '06', label: 'Remove by Ack', length: 1, transform: (v) => v.trim() === '1' ? 'Yes' : 'No' },
];

// User data MIDs
const MID_0240_FIELDS: FieldDef[] = [{ id: '01', label: 'User Data', length: 200 }];
const MID_0242_FIELDS: FieldDef[] = [{ id: '01', label: 'User Data', length: 200 }];
const MID_0245_FIELDS: FieldDef[] = [
  { id: '01', label: 'Offset', length: 4 },
  { id: '02', label: 'Data Length', length: 3 },
  { id: '03', label: 'User Data', length: 200 },
];

// Selector socket MIDs
const MID_0251_FIELDS: FieldDef[] = [
  { id: '01', label: 'Number of Sockets', length: 2 },
  { id: '02', label: 'Selector Type', length: 1, transform: (v) => { const t: Record<string, string> = { '1': 'One position', '2': 'Multi position' }; return t[v.trim()] ?? v.trim(); } },
];
const MID_0254_REV1: FieldDef[] = [{ id: '01', label: 'Device ID', length: 2 }, { id: '02', label: 'Green Lights', length: 32 }];
const MID_0254_REV2: FieldDef[] = [{ id: '01', label: 'Device ID', length: 2 }, { id: '02', label: 'Number of Device IDs', length: 2 }, { id: '03', label: 'Green Lights', length: 64 }];
const MID_0255_REV1: FieldDef[] = [{ id: '01', label: 'Device ID', length: 2 }, { id: '02', label: 'Red Lights', length: 32 }];
const MID_0255_REV2: FieldDef[] = [{ id: '01', label: 'Device ID', length: 2 }, { id: '02', label: 'Number of Device IDs', length: 2 }, { id: '03', label: 'Red Lights', length: 64 }];

// Tool tag MIDs
const MID_0262_FIELDS: FieldDef[] = [{ id: '01', label: 'Tool Tag ID', length: 10 }];
const MID_0265_FIELDS: FieldDef[] = [
  { id: '01', label: 'Tool Tag ID', length: 10 },
  { id: '02', label: 'Status', length: 1, transform: (v) => { const s: Record<string, string> = { '0': 'Tool rejected', '1': 'Tool accepted', '2': 'Undefined' }; return s[v.trim()] ?? v.trim(); } },
];

// Histogram MIDs
const MID_0300_FIELDS: FieldDef[] = [
  { id: '01', label: 'Parameter Set ID', length: 3 },
  { id: '02', label: 'Histogram Type', length: 2, transform: (v) => { const t: Record<string, string> = { '01': 'Torque', '02': 'Angle', '03': 'Current', '04': 'Prevailing torque', '05': 'Self-tap torque', '06': 'Rundown angle' }; return t[v.trim()] ?? v.trim(); } },
];
const MID_0301_FIELDS: FieldDef[] = [
  { id: '01', label: 'Parameter Set ID', length: 3 }, { id: '02', label: 'Histogram Type', length: 2 },
  { id: '03', label: 'Sigma Histogram', length: 7 }, { id: '04', label: 'Mean Value', length: 7 },
  { id: '05', label: 'Class Range', length: 7 }, { id: '06', label: 'Number of Classes', length: 2 },
  { id: '07', label: 'First Class Upper Boundary', length: 7 }, { id: '08', label: 'Number of Samples', length: 6 },
];

// Automatic/Manual mode MIDs
const MID_0401_FIELDS: FieldDef[] = [{ id: '01', label: 'Mode', length: 1, transform: (v) => v.trim() === '1' ? 'Automatic' : 'Manual' }];
const MID_0404_FIELDS: FieldDef[] = [{ id: '01', label: 'Mode', length: 1, transform: (v) => v.trim() === '0' ? 'Automatic' : 'Manual' }];
const MID_0411_FIELDS: FieldDef[] = [{ id: '01', label: 'Auto Disable Setting', length: 1, transform: (v) => { const s: Record<string, string> = { '0': 'Disabled', '1': 'Enabled' }; return s[v.trim()] ?? v.trim(); } }];

const MID_0421_FIELDS: FieldDef[] = [{ id: '01', label: 'Disabled Command List', length: 0 }];

// Motor tuning MIDs
const MID_0501_REV1: FieldDef[] = [
  { id: '01', label: 'Motor Tuning Status', length: 1, transform: (v) => { const s: Record<string, string> = { '0': 'NOK', '1': 'OK' }; return s[v.trim()] ?? v.trim(); }, statusFn: statusOkNok },
  { id: '02', label: 'Motor Tuning Requested', length: 1, transform: (v) => v.trim() === '1' ? 'Yes' : 'No' },
];
const MID_0501_REV2: FieldDef[] = [...MID_0501_REV1, { id: '03', label: 'Timestamp', length: 19 }];
const MID_0504_FIELDS: FieldDef[] = [{ id: '01', label: 'Channel/Spindle ID', length: 2 }];

// HVO (Human Visual Output) button and signal MIDs
const MID_0511_FIELDS: FieldDef[] = [
  { id: '01', label: 'Button ID', length: 2 },
  { id: '02', label: 'Button Status', length: 1, transform: (v) => { const s: Record<string, string> = { '0': 'Released', '1': 'Pressed' }; return s[v.trim()] ?? v.trim(); } },
];
const hvoSignalTransform = (v: string): string => { const s: Record<string, string> = { '0': 'Off', '1': 'On', '2': 'No change', '3': 'Flashing' }; return s[v.trim()] ?? v.trim(); };
const MID_0515_REV1: FieldDef[] = [
  { id: '01', label: 'Signal 1 ID', length: 2 }, { id: '02', label: 'Signal 1 Value', length: 1, transform: hvoSignalTransform },
  { id: '03', label: 'Signal 2 ID', length: 2 }, { id: '04', label: 'Signal 2 Value', length: 1, transform: hvoSignalTransform },
  { id: '05', label: 'Signal 3 ID', length: 2 }, { id: '06', label: 'Signal 3 Value', length: 1, transform: hvoSignalTransform },
  { id: '07', label: 'Signal 4 ID', length: 2 }, { id: '08', label: 'Signal 4 Value', length: 1, transform: hvoSignalTransform },
];

// Mode MIDs (2601-2606)
const MID_2601_FIELDS: FieldDef[] = [{ id: '01', label: 'Number of Modes', length: 3 }];
const MID_2602_FIELDS: FieldDef[] = [{ id: '01', label: 'Mode ID', length: 4 }];
const MID_2603_FIELDS: FieldDef[] = [{ id: '01', label: 'Mode ID', length: 4 }, { id: '02', label: 'Mode Name', length: 25 }, { id: '03', label: 'Mode Description', length: 40 }];
const MID_2604_FIELDS: FieldDef[] = [{ id: '01', label: 'Mode ID', length: 4 }];
const MID_2606_FIELDS: FieldDef[] = [{ id: '01', label: 'Mode ID', length: 4 }];

/** All miscellaneous decoder entries keyed by MID number */
export const miscDecoderEntries: Record<string, DecoderEntry> = {
  '0081': MID_0081_FIELDS, '0082': MID_0082_FIELDS,
  '0091': MID_0091_FIELDS,
  '0101': { 1: MID_0101_REV1, 2: MID_0101_REV2, 3: MID_0101_REV3, 4: MID_0101_REV4, 5: MID_0101_REV5, 6: MID_0101_REV6 },
  '0104': MID_0104_FIELDS,
  '0106': MID_0106_FIELDS, '0107': MID_0107_FIELDS, '0108': MID_0108_FIELDS,
  '0110': MID_0110_FIELDS, '0111': MID_0111_FIELDS,
  '0240': MID_0240_FIELDS, '0242': MID_0242_FIELDS, '0245': MID_0245_FIELDS,
  '0251': MID_0251_FIELDS,
  '0254': { 1: MID_0254_REV1, 2: MID_0254_REV2 },
  '0255': { 1: MID_0255_REV1, 2: MID_0255_REV2 },
  '0262': MID_0262_FIELDS, '0265': MID_0265_FIELDS,
  '0300': MID_0300_FIELDS, '0301': MID_0301_FIELDS,
  '0401': MID_0401_FIELDS, '0404': MID_0404_FIELDS, '0411': MID_0411_FIELDS,
  '0421': MID_0421_FIELDS,
  '0501': { 1: MID_0501_REV1, 2: MID_0501_REV2 }, '0504': MID_0504_FIELDS,
  '0511': MID_0511_FIELDS, '0515': { 1: MID_0515_REV1, 2: MID_0515_REV1 },
  '2601': MID_2601_FIELDS, '2602': MID_2602_FIELDS, '2603': MID_2603_FIELDS, '2604': MID_2604_FIELDS, '2606': MID_2606_FIELDS,
};
