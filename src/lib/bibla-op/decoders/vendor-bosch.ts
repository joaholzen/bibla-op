/**
 * biblaOp — Open Protocol Library
 * Bosch Rexroth vendor-specific decoder field definitions.
 *
 * Overrides standard MIDs for Bosch controllers (BS350, etc.) with
 * vendor-specific field layouts for communication, psets, jobs, tools,
 * identifiers, tightening results, alarms, and multi-spindle results.
 */

import type { FieldDef, DecoderEntry } from '../types/decoders';
import { MID_0002_REV1 } from './communication';
import { statusOkNok, tighteningStatusLabel, torqueAngleStatusLabel, torqueAngleStatusFn } from './parsers';

/** Bosch MID 0002 rev 2: adds manufacturer code */
const BOSCH_MID_0002_REV2: FieldDef[] = [
  { id: '01', label: 'Cell ID', length: 4 }, { id: '02', label: 'Channel ID', length: 2 },
  { id: '03', label: 'Controller Name', length: 25 }, { id: '04', label: 'Manufacturer Code', length: 3 },
];
const BOSCH_MID_0002_REV3: FieldDef[] = [
  ...BOSCH_MID_0002_REV2,
  { id: '05', label: 'Open Protocol Version', length: 19 },
  { id: '06', label: 'Software Version', length: 19 },
  { id: '07', label: 'Tool Software Version', length: 19 },
];

const BOSCH_MID_0006_FIELDS: FieldDef[] = [{ id: '', label: 'Spindle Status (64 channels)', length: 64 }];

/** Bosch MID 0013: Pset data — uses 3-digit pset number instead of "Pset ID" */
export const BOSCH_MID_0013_REV1: FieldDef[] = [
  { id: '01', label: 'Tightening Program Number', length: 3 },
  { id: '02', label: 'Tightening Program Name', length: 25 },
  { id: '03', label: 'Rotation Direction', length: 2, transform: (v) => { const s = v.trim(); return s === '1' ? 'CW' : s === '2' ? 'CCW' : s; } },
  { id: '04', label: 'Placeholder', length: 2 },
  { id: '05', label: 'Torque Min', length: 6, unit: 'Nm' }, { id: '06', label: 'Torque Max', length: 6, unit: 'Nm' },
  { id: '07', label: 'Target Torque', length: 6, unit: 'Nm' },
  { id: '08', label: 'Angle Min', length: 5, unit: '°' }, { id: '09', label: 'Angle Max', length: 5, unit: '°' },
  { id: '10', label: 'Target Angle', length: 5, unit: '°' },
];

const BOSCH_MID_0015_REV1: FieldDef[] = [
  { id: '01', label: 'Tightening Program Number', length: 3 },
  { id: '02', label: 'Date of Last Change', length: 19 },
];

const BOSCH_MID_0019_REV1: FieldDef[] = [
  { id: '01', label: 'Tightening Program Number', length: 3 },
  { id: '02', label: 'OK Counter Value', length: 2 },
];
const BOSCH_MID_0019_REV2: FieldDef[] = [...BOSCH_MID_0019_REV1, { id: '03', label: 'NOK Counter Value', length: 2 }];

const BOSCH_MID_0020_FIELDS: FieldDef[] = [{ id: '01', label: 'Tightening Program Number', length: 3 }];
const BOSCH_MID_0031_FIELDS: FieldDef[] = [{ id: '01', label: 'Count', length: 2 }, { id: '02', label: 'Number List (variable)', length: 0 }];

/** Bosch MID 0033: Job data with program list */
const BOSCH_MID_0033_REV1: FieldDef[] = [
  { id: '01', label: 'Job Number', length: 2 }, { id: '02', label: 'Job Name', length: 25 },
  { id: '03', label: 'Order', length: 2 }, { id: '04', label: 'Max Time First Tightening', length: 4 },
  { id: '05', label: 'Max Time Processing Job', length: 5 },
  { id: '06', label: 'Job Batch Mode', length: 1 }, { id: '07', label: 'Disable Counter Value After Job', length: 1 },
  { id: '08', label: 'Line Control', length: 1 }, { id: '09', label: 'Repeat Job', length: 1 },
  { id: '10', label: 'Allow Loosening', length: 1 }, { id: '11', label: 'Reserved', length: 1 },
  { id: '12', label: 'Number of Tightening Programs', length: 2 }, { id: '13', label: 'Program List (variable)', length: 0 },
];

const BOSCH_MID_0038_FIELDS: FieldDef[] = [{ id: '01', label: 'Job Number', length: 2 }];

/** Bosch MID 0041: tool data — uses "Tool Number" instead of "Tool Serial Number" */
export const BOSCH_MID_0041_REV1: FieldDef[] = [
  { id: '01', label: 'Tool Number', length: 14 }, { id: '02', label: 'Cycles', length: 10 },
  { id: '03', label: 'Date of Last Check', length: 19 }, { id: '04', label: 'Serial Number', length: 10 },
];
const BOSCH_MID_0041_REV2: FieldDef[] = [
  ...BOSCH_MID_0041_REV1,
  { id: '05', label: 'Calibration Value', length: 7, unit: 'Nm' },
  { id: '06', label: 'Last Service Date', length: 19 }, { id: '07', label: 'Tightenings Since Service', length: 10 },
  { id: '08', label: 'Tool Type', length: 2 }, { id: '09', label: 'Motor Size', length: 2 },
  { id: '10', label: 'Open End Data', length: 3 }, { id: '11', label: 'Software Version', length: 19 },
];

const BOSCH_MID_0050_FIELDS: FieldDef[] = [{ id: '01', label: 'ID Code', length: 25 }];
const BOSCH_MID_0052_REV1: FieldDef[] = [{ id: '01', label: 'ID Code Part 1', length: 25 }];
const BOSCH_MID_0052_REV2: FieldDef[] = [
  { id: '01', label: 'ID Code Part 1', length: 25 }, { id: '02', label: 'ID Code Part 2', length: 25 },
  { id: '03', label: 'ID Code Part 3', length: 25 }, { id: '04', label: 'ID Code Part 4', length: 25 },
];
const BOSCH_MID_0052_REV999: FieldDef[] = [...BOSCH_MID_0052_REV2, { id: '05', label: 'ID Code Source', length: 4 }];

/** Bosch MID 0061 rev 1: tightening result — uses OK/NOK counter instead of batch */
const BOSCH_MID_0061_REV1: FieldDef[] = [
  { id: '01', label: 'Cell ID', length: 4 }, { id: '02', label: 'Channel ID', length: 2 },
  { id: '03', label: 'Controller Name', length: 25 }, { id: '04', label: 'ID Code', length: 25 },
  { id: '05', label: 'Job Number', length: 2 }, { id: '06', label: 'Tightening Program Number', length: 3 },
  { id: '07', label: 'OK Counter Limit', length: 4 }, { id: '08', label: 'OK Counter Value', length: 4 },
  { id: '09', label: 'Tightening Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
  { id: '10', label: 'Torque Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '11', label: 'Angle Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '12', label: 'Torque Min', length: 6, unit: 'Nm' }, { id: '13', label: 'Torque Max', length: 6, unit: 'Nm' },
  { id: '14', label: 'Target Torque', length: 6, unit: 'Nm' }, { id: '15', label: 'Final Torque', length: 6, unit: 'Nm' },
  { id: '16', label: 'Angle Min', length: 5, unit: '°' }, { id: '17', label: 'Angle Max', length: 5, unit: '°' },
  { id: '18', label: 'Target Angle', length: 5, unit: '°' }, { id: '19', label: 'Final Angle', length: 5, unit: '°' },
  { id: '20', label: 'Timestamp', length: 19 }, { id: '21', label: 'Last Change', length: 19 },
  { id: '22', label: 'OK/NOK Counter Status', length: 1 }, { id: '23', label: 'Tightening ID', length: 10 },
];

/** Bosch MID 0061 rev 2: expanded with redundancy monitoring fields */
const BOSCH_MID_0061_REV2: FieldDef[] = [
  { id: '01', label: 'Cell ID', length: 4 }, { id: '02', label: 'Channel ID', length: 2 },
  { id: '03', label: 'Controller Name', length: 25 }, { id: '04', label: 'ID Code', length: 25 },
  { id: '05', label: 'Job Number', length: 4 }, { id: '06', label: 'Tightening Program Number', length: 3 },
  { id: '07', label: 'Strategy (placeholder)', length: 2 }, { id: '08', label: 'Strategy Options (placeholder)', length: 5 },
  { id: '09', label: 'OK Counter Limit', length: 4 }, { id: '10', label: 'OK Counter Value', length: 4 },
  { id: '11', label: 'Tightening Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
  { id: '12', label: 'OK/NOK Counter Status', length: 1 },
  { id: '13', label: 'Torque Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '14', label: 'Angle Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '15', label: 'Rundown Angle Status (placeholder)', length: 1 },
  { id: '16', label: 'Current Mon. Status (placeholder)', length: 1 },
  { id: '17', label: 'Self-tap Status (placeholder)', length: 1 },
  { id: '18', label: 'Prevail Torque Mon. Status (placeholder)', length: 1 },
  { id: '19', label: 'Prevail Torque Comp. Status (placeholder)', length: 1 },
  { id: '20', label: 'Tightening Error Status', length: 10 },
  { id: '21', label: 'Torque Min', length: 6, unit: 'Nm' }, { id: '22', label: 'Torque Max', length: 6, unit: 'Nm' },
  { id: '23', label: 'Target Torque', length: 6, unit: 'Nm' }, { id: '24', label: 'Final Torque', length: 6, unit: 'Nm' },
  { id: '25', label: 'Angle Min', length: 5, unit: '°' }, { id: '26', label: 'Angle Max', length: 5, unit: '°' },
  { id: '27', label: 'Target Angle', length: 5, unit: '°' }, { id: '28', label: 'Final Angle', length: 5, unit: '°' },
  { id: '29', label: 'Total Angle Min', length: 5, unit: '°' }, { id: '30', label: 'Total Angle Max', length: 5, unit: '°' },
  { id: '31', label: 'Total Angle', length: 5, unit: '°' },
  { id: '32', label: 'Min Redundancy Monitoring', length: 3, unit: '%' }, { id: '33', label: 'Max Redundancy Monitoring', length: 3, unit: '%' },
  { id: '34', label: 'Redundancy Value', length: 3, unit: '%' },
  { id: '35', label: 'Self-tap Min', length: 6, unit: 'Nm' }, { id: '36', label: 'Self-tap Max', length: 6, unit: 'Nm' },
  { id: '37', label: 'Self-tap Torque', length: 6, unit: 'Nm' },
  { id: '38', label: 'Friction Torque Min', length: 6, unit: 'Nm' }, { id: '39', label: 'Friction Torque Max', length: 6, unit: 'Nm' },
  { id: '40', label: 'Friction Torque', length: 6, unit: 'Nm' },
  { id: '41', label: 'Tightening ID', length: 10 }, { id: '42', label: 'Job Sequence Number', length: 5 },
  { id: '43', label: 'Sync Tightening ID', length: 5 }, { id: '44', label: 'Tool Serial Number', length: 14 },
  { id: '45', label: 'Timestamp', length: 19 }, { id: '46', label: 'Last Change', length: 19 },
];
const BOSCH_MID_0061_REV3: FieldDef[] = [
  ...BOSCH_MID_0061_REV2,
  { id: '47', label: 'Tightening Program Name', length: 25 },
  { id: '48', label: 'Torque Values Unit', length: 1, transform: (v) => {
    const units: Record<string, string> = { '1': 'Nm', '2': 'ft·lbf', '3': 'in·lbf', '4': 'Kpm', '5': 'Kgfm', '6': 'Kgm', '0': 'Other' };
    return units[v.trim()] ?? v.trim();
  }},
  { id: '49', label: 'Result Type', length: 2 },
];
const BOSCH_MID_0061_REV4: FieldDef[] = [
  ...BOSCH_MID_0061_REV3,
  { id: '50', label: 'ID Code Part 2', length: 25 }, { id: '51', label: 'ID Code Part 3', length: 25 }, { id: '52', label: 'ID Code Part 4', length: 25 },
];
const BOSCH_MID_0061_REV5: FieldDef[] = [...BOSCH_MID_0061_REV4, { id: '53', label: 'Tightening Error Code', length: 4 }];

/** Rev 999: flat format for legacy Bosch controllers */
const BOSCH_MID_0061_REV999: FieldDef[] = [
  { id: '', label: 'ID Code', length: 25 }, { id: '', label: 'Job Number', length: 2 },
  { id: '', label: 'Tightening Program Number', length: 3 }, { id: '', label: 'OK Counter Limit', length: 4 },
  { id: '', label: 'OK Counter Value', length: 4 },
  { id: '', label: 'Tightening Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
  { id: '', label: 'Torque Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '', label: 'Angle Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '', label: 'Torque Min', length: 6, unit: 'Nm' }, { id: '', label: 'Torque Max', length: 6, unit: 'Nm' },
  { id: '', label: 'Target Torque', length: 6, unit: 'Nm' }, { id: '', label: 'Final Torque', length: 6, unit: 'Nm' },
  { id: '', label: 'Angle Min', length: 5, unit: '°' }, { id: '', label: 'Angle Max', length: 5, unit: '°' },
  { id: '', label: 'Target Angle', length: 5, unit: '°' }, { id: '', label: 'Final Angle', length: 5, unit: '°' },
  { id: '', label: 'Timestamp', length: 19 }, { id: '', label: 'Tightening ID', length: 10 },
];

// Bosch alarm MIDs
const BOSCH_MID_0071_FIELDS: FieldDef[] = [
  { id: '01', label: 'Error Number', length: 4 },
  { id: '02', label: 'Controller Ready Status', length: 1, transform: (v) => v.trim() === '1' ? 'OK' : 'NOK' },
  { id: '03', label: 'Tool Ready Status', length: 1, transform: (v) => v.trim() === '1' ? 'OK' : 'NOK' },
  { id: '04', label: 'Time', length: 19 },
];
const BOSCH_MID_0076_FIELDS: FieldDef[] = [
  { id: '01', label: 'System Error Status', length: 1, transform: (v) => v.trim() === '1' ? 'Active' : 'No error' },
  { id: '02', label: 'Error Number', length: 4 },
  { id: '03', label: 'Controller Ready Status', length: 1, transform: (v) => v.trim() === '1' ? 'OK' : 'NOK' },
  { id: '04', label: 'Tool Ready Status', length: 1, transform: (v) => v.trim() === '1' ? 'OK' : 'NOK' },
  { id: '05', label: 'Time', length: 19 },
];

/** Bosch MID 0101: multi-spindle result with placeholder fields */
const BOSCH_MID_0101_REV1: FieldDef[] = [
  { id: '01', label: 'Number of Spindles', length: 2 }, { id: '02', label: 'ID Code', length: 25 },
  { id: '03', label: 'Job Number', length: 2 }, { id: '04', label: 'Application Number', length: 3 },
  { id: '05', label: 'Placeholder (UUU)', length: 4 }, { id: '06', label: 'Placeholder (HHHH)', length: 4 },
  { id: '07', label: 'Placeholder (u)', length: 1 },
  { id: '08', label: 'Minimum Torque Limit', length: 6, unit: 'Nm' }, { id: '09', label: 'Maximum Torque Limit', length: 6, unit: 'Nm' },
  { id: '10', label: 'Target Torque', length: 6, unit: 'Nm' },
  { id: '11', label: 'Minimum Angle', length: 5, unit: '°' }, { id: '12', label: 'Maximum Angle', length: 5, unit: '°' },
  { id: '13', label: 'Target Angle', length: 5, unit: '°' },
  { id: '14', label: 'Date/Time Last Change', length: 19 }, { id: '15', label: 'Timestamp', length: 19 },
  { id: '16', label: 'Sync Tightening ID', length: 5 },
  { id: '17', label: 'Sync Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
  { id: '18', label: 'Spindle Status', length: 0 },
];

const BOSCH_MID_0150_FIELDS: FieldDef[] = [{ id: '01', label: 'ID Code', length: 64 }];

/** Bosch vendor decoder map — keyed by MID number */
export const BOSCH_DECODER_MAP: Record<string, DecoderEntry> = {
  '0002': { 1: MID_0002_REV1, 2: BOSCH_MID_0002_REV2, 3: BOSCH_MID_0002_REV3 },
  '0006': BOSCH_MID_0006_FIELDS,
  '0013': { 1: BOSCH_MID_0013_REV1 },
  '0015': { 1: BOSCH_MID_0015_REV1 },
  '0019': { 1: BOSCH_MID_0019_REV1, 2: BOSCH_MID_0019_REV2 },
  '0020': BOSCH_MID_0020_FIELDS,
  '0031': BOSCH_MID_0031_FIELDS,
  '0033': { 1: BOSCH_MID_0033_REV1 },
  '0038': BOSCH_MID_0038_FIELDS,
  '0041': { 1: BOSCH_MID_0041_REV1, 2: BOSCH_MID_0041_REV2 },
  '0050': BOSCH_MID_0050_FIELDS,
  '0052': { 1: BOSCH_MID_0052_REV1, 2: BOSCH_MID_0052_REV2, 999: BOSCH_MID_0052_REV999 },
  '0061': { 1: BOSCH_MID_0061_REV1, 2: BOSCH_MID_0061_REV2, 3: BOSCH_MID_0061_REV3, 4: BOSCH_MID_0061_REV4, 5: BOSCH_MID_0061_REV5, 999: BOSCH_MID_0061_REV999 },
  '0065': { 1: BOSCH_MID_0061_REV1, 2: BOSCH_MID_0061_REV2, 3: BOSCH_MID_0061_REV3, 4: BOSCH_MID_0061_REV4, 5: BOSCH_MID_0061_REV5, 999: BOSCH_MID_0061_REV999 },
  '0071': BOSCH_MID_0071_FIELDS,
  '0076': BOSCH_MID_0076_FIELDS,
  '0101': { 1: BOSCH_MID_0101_REV1 },
  '0150': BOSCH_MID_0150_FIELDS,
};
