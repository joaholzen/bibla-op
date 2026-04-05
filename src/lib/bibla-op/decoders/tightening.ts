/**
 * biblaOp — Open Protocol Library
 * Tightening result MID field definitions: MID 0061, 0064-0067, 0902
 *
 * MID 0061/0065 is the most complex MID with 12+ revisions, each adding
 * more fields. Rev 998 adds multi-stage results; rev 999 is a flat format
 * variant used by some controllers.
 */

import type { FieldDef, DecoderEntry } from '../types/decoders';
import {
  statusOkNok, tighteningStatusLabel, torqueAngleStatusLabel,
  torqueAngleStatusFn, batchStatusLabel, strategyLabel,
} from './parsers';

/** MID 0061 rev 1: basic tightening result (23 fields) */
export const MID_0061_REV1: FieldDef[] = [
  { id: '01', label: 'Cell ID', length: 4 },
  { id: '02', label: 'Channel ID', length: 2 },
  { id: '03', label: 'Controller Name', length: 25 },
  { id: '04', label: 'VIN', length: 25 },
  { id: '05', label: 'Job ID', length: 2 },
  { id: '06', label: 'Pset ID', length: 3 },
  { id: '07', label: 'Batch Size', length: 4 },
  { id: '08', label: 'Batch Counter', length: 4 },
  { id: '09', label: 'Tightening Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
  { id: '10', label: 'Torque Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '11', label: 'Angle Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '12', label: 'Torque Min', length: 6, unit: 'Nm' },
  { id: '13', label: 'Torque Max', length: 6, unit: 'Nm' },
  { id: '14', label: 'Torque Final Target', length: 6, unit: 'Nm' },
  { id: '15', label: 'Final Torque', length: 6, unit: 'Nm' },
  { id: '16', label: 'Angle Min', length: 5, unit: '°' },
  { id: '17', label: 'Angle Max', length: 5, unit: '°' },
  { id: '18', label: 'Angle Final Target', length: 5, unit: '°' },
  { id: '19', label: 'Final Angle', length: 5, unit: '°' },
  { id: '20', label: 'Timestamp', length: 19 },
  { id: '21', label: 'Last Change', length: 19 },
  { id: '22', label: 'Batch Status', length: 1, transform: batchStatusLabel },
  { id: '23', label: 'Tightening ID', length: 10 },
];

/** MID 0061 rev 2: expanded with strategy, monitoring statuses, rundown/self-tap/prevail fields */
export const MID_0061_REV2: FieldDef[] = [
  { id: '01', label: 'Cell ID', length: 4 },
  { id: '02', label: 'Channel ID', length: 2 },
  { id: '03', label: 'Controller Name', length: 25 },
  { id: '04', label: 'VIN', length: 25 },
  { id: '05', label: 'Job ID', length: 4 },
  { id: '06', label: 'Pset ID', length: 3 },
  { id: '07', label: 'Strategy', length: 2, transform: strategyLabel },
  { id: '08', label: 'Strategy Options', length: 5 },
  { id: '09', label: 'Batch Size', length: 4 },
  { id: '10', label: 'Batch Counter', length: 4 },
  { id: '11', label: 'Tightening Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
  { id: '12', label: 'Batch Status', length: 1, transform: batchStatusLabel },
  { id: '13', label: 'Torque Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '14', label: 'Angle Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '15', label: 'Rundown Angle Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '16', label: 'Current Mon. Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '17', label: 'Self-tap Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '18', label: 'Prevail Torque Mon. Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '19', label: 'Prevail Torque Comp. Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '20', label: 'Tightening Error Status', length: 10 },
  { id: '21', label: 'Torque Min', length: 6, unit: 'Nm' },
  { id: '22', label: 'Torque Max', length: 6, unit: 'Nm' },
  { id: '23', label: 'Torque Final Target', length: 6, unit: 'Nm' },
  { id: '24', label: 'Final Torque', length: 6, unit: 'Nm' },
  { id: '25', label: 'Angle Min', length: 5, unit: '°' },
  { id: '26', label: 'Angle Max', length: 5, unit: '°' },
  { id: '27', label: 'Angle Final Target', length: 5, unit: '°' },
  { id: '28', label: 'Final Angle', length: 5, unit: '°' },
  { id: '29', label: 'Rundown Angle Min', length: 5, unit: '°' },
  { id: '30', label: 'Rundown Angle Max', length: 5, unit: '°' },
  { id: '31', label: 'Rundown Angle', length: 5, unit: '°' },
  { id: '32', label: 'Current Mon. Min', length: 3, unit: '%' },
  { id: '33', label: 'Current Mon. Max', length: 3, unit: '%' },
  { id: '34', label: 'Current Mon. Value', length: 3, unit: '%' },
  { id: '35', label: 'Self-tap Min', length: 6, unit: 'Nm' },
  { id: '36', label: 'Self-tap Max', length: 6, unit: 'Nm' },
  { id: '37', label: 'Self-tap Torque', length: 6, unit: 'Nm' },
  { id: '38', label: 'Prevail Torque Mon. Min', length: 6, unit: 'Nm' },
  { id: '39', label: 'Prevail Torque Mon. Max', length: 6, unit: 'Nm' },
  { id: '40', label: 'Prevail Torque', length: 6, unit: 'Nm' },
  { id: '41', label: 'Tightening ID', length: 10 },
  { id: '42', label: 'Job Sequence Number', length: 5 },
  { id: '43', label: 'Sync Tightening ID', length: 5 },
  { id: '44', label: 'Tool Serial Number', length: 14 },
  { id: '45', label: 'Timestamp', length: 19 },
  { id: '46', label: 'Last Change', length: 19 },
];

/** Rev 3: adds pset name, torque unit, and result type */
const MID_0061_REV3: FieldDef[] = [
  ...MID_0061_REV2,
  { id: '47', label: 'Parameter Set Name', length: 25 },
  { id: '48', label: 'Torque Values Unit', length: 1, transform: (v) => {
    const units: Record<string, string> = { '1': 'Nm', '2': 'ft·lbf', '3': 'cNm', '4': 'kNm', '5': 'MNm', '6': 'in·lbf', '7': 'Kpm', '0': 'No unit' };
    return units[v.trim()] ?? v.trim();
  }},
  { id: '49', label: 'Result Type', length: 2 },
];

/** Rev 4: adds multi-part identifier results */
const MID_0061_REV4: FieldDef[] = [
  ...MID_0061_REV3,
  { id: '50', label: 'Identifier Result Part 2', length: 25 },
  { id: '51', label: 'Identifier Result Part 3', length: 25 },
  { id: '52', label: 'Identifier Result Part 4', length: 25 },
];

/** Rev 5: adds customer error code */
export const MID_0061_REV5: FieldDef[] = [
  ...MID_0061_REV4,
  { id: '53', label: 'Customer Tightening Error Code', length: 4 },
];

/** Rev 6: adds prevail torque compensate value and error status 2 */
const MID_0061_REV6: FieldDef[] = [
  ...MID_0061_REV5,
  { id: '54', label: 'Prevail Torque Compensate Value', length: 6, unit: 'Nm' },
  { id: '55', label: 'Tightening Error Status 2', length: 10 },
];

/** Rev 7: adds compensated angle and final angle decimal */
const MID_0061_REV7: FieldDef[] = [
  ...MID_0061_REV6,
  { id: '56', label: 'Compensated Angle', length: 7, unit: '°' },
  { id: '57', label: 'Final Angle Decimal', length: 7, unit: '°' },
];

const MID_0061_REV8: FieldDef[] = [
  ...MID_0061_REV7,
  { id: '58', label: 'Start Final Angle', length: 6, unit: 'Nm' },
  { id: '59', label: 'Post View Torque Activate', length: 6, unit: 'Nm' },
];

const MID_0061_REV9: FieldDef[] = [
  ...MID_0061_REV8,
  { id: '60', label: 'Post View Torque High', length: 6, unit: 'Nm' },
  { id: '61', label: 'Post View Torque Low', length: 6, unit: 'Nm' },
];

const MID_0061_REV10: FieldDef[] = [
  ...MID_0061_REV9,
  { id: '62', label: 'Rundown Angle', length: 7, unit: '°' },
  { id: '63', label: 'Current Mon. Value', length: 6, unit: 'A' },
  { id: '64', label: 'Self-tap Torque', length: 7, unit: 'Nm' },
  { id: '65', label: 'Prevailing Torque', length: 7, unit: 'Nm' },
  { id: '66', label: 'Job Sequence Number', length: 5 },
];

const MID_0061_REV11: FieldDef[] = [
  ...MID_0061_REV10,
  { id: '67', label: 'Sync Tightening ID', length: 5 },
  { id: '68', label: 'Tool Serial Number', length: 14 },
  { id: '69', label: 'Turns for Rundown', length: 7 },
];

const MID_0061_REV12: FieldDef[] = [
  ...MID_0061_REV11,
  { id: '70', label: 'Tightening Time High', length: 6, unit: 'ms' },
  { id: '71', label: 'Tightening Time Low', length: 6, unit: 'ms' },
];

/** Rev 998: multi-stage tightening with stage count fields */
const MID_0061_REV998: FieldDef[] = [
  ...MID_0061_REV5,
  { id: '54', label: 'Prevail Torque Compensate Value', length: 6, unit: 'Nm' },
  { id: '55', label: 'Tightening Error Status 2', length: 10 },
  { id: '56', label: 'Number of Stages', length: 2 },
  { id: '57', label: 'Number of Stage Results', length: 2 },
];

/** Rev 999: flat (non-parameterized) format — no field ID prefixes */
export const MID_0061_REV999_FLAT: FieldDef[] = [
  { id: 'VIN', label: 'VIN', length: 25 },
  { id: 'JOB', label: 'Job ID', length: 2 },
  { id: 'PSET', label: 'Pset ID', length: 3 },
  { id: 'BSZ', label: 'Batch Size', length: 4 },
  { id: 'BCT', label: 'Batch Counter', length: 4 },
  { id: 'BST', label: 'Batch Status', length: 1, transform: batchStatusLabel },
  { id: 'TST', label: 'Tightening Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
  { id: 'TQS', label: 'Torque Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: 'AGS', label: 'Angle Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: 'TQ', label: 'Final Torque', length: 6, unit: 'Nm' },
  { id: 'AG', label: 'Final Angle', length: 5, unit: '°' },
  { id: 'TS', label: 'Timestamp', length: 19 },
  { id: 'LC', label: 'Last Change', length: 19 },
  { id: 'TID', label: 'Tightening ID', length: 10 },
];

/** Simplified MID 0061 layout used by some controllers (rev 0) */
export const MID_0061_SIMPLE: FieldDef[] = [
  { id: '01', label: 'Cell ID', length: 4 },
  { id: '02', label: 'Channel ID', length: 2 },
  { id: '03', label: 'Controller Name', length: 25 },
  { id: '04', label: 'VIN', length: 10 },
  { id: '05', label: 'Job ID', length: 4 },
  { id: '06', label: 'Pset ID', length: 3 },
  { id: '07', label: 'Strategy', length: 20 },
  { id: '08', label: 'Tightening Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
  { id: '09', label: 'Torque Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '10', label: 'Angle Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '11', label: 'Torque Min', length: 7, unit: 'Nm' },
  { id: '12', label: 'Torque Max', length: 7, unit: 'Nm' },
  { id: '13', label: 'Final Torque', length: 7, unit: 'Nm' },
  { id: '14', label: 'Angle Min', length: 5, unit: '°' },
  { id: '15', label: 'Angle Max', length: 5, unit: '°' },
  { id: '16', label: 'Final Angle', length: 5, unit: '°' },
  { id: '17', label: 'Timestamp', length: 19 },
  { id: '18', label: 'Last Change', length: 19 },
  { id: '19', label: 'Batch Counter', length: 5 },
  { id: '20', label: 'Tightening ID', length: 10 },
];

/** MID 0064: Old Tightening Request — request by tightening ID */
const MID_0064_FIELDS: FieldDef[] = [
  { id: '01', label: 'Tightening ID', length: 10 },
];

const MID_0066_REV1: FieldDef[] = [
  { id: '01', label: 'Number of Offline Results', length: 4 },
];
const MID_0066_REV2: FieldDef[] = [
  { id: '01', label: 'Number of Offline Results', length: 10 },
];

const MID_0067_FIELDS: FieldDef[] = [
  { id: '01', label: 'Number of Results', length: 4 },
];

/** MID 0902: Tightening result notification (simplified) */
const MID_0902_FIELDS: FieldDef[] = [
  { id: '01', label: 'Tightening ID', length: 10 },
  { id: '02', label: 'Result Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
  { id: '03', label: 'Timestamp', length: 19 },
];

/** Tightening decoder entries — MID 0065 shares 0061's field definitions */
export const tighteningDecoderEntries: Record<string, DecoderEntry> = {
  '0061': {
    0: MID_0061_SIMPLE, 1: MID_0061_REV1, 2: MID_0061_REV2, 3: MID_0061_REV3,
    4: MID_0061_REV4, 5: MID_0061_REV5, 6: MID_0061_REV6, 7: MID_0061_REV7,
    8: MID_0061_REV8, 9: MID_0061_REV9, 10: MID_0061_REV10, 11: MID_0061_REV11,
    12: MID_0061_REV12, 998: MID_0061_REV998, 999: MID_0061_REV999_FLAT,
  },
  '0064': MID_0064_FIELDS,
  '0065': {
    0: MID_0061_SIMPLE, 1: MID_0061_REV1, 2: MID_0061_REV2, 3: MID_0061_REV3,
    4: MID_0061_REV4, 5: MID_0061_REV5, 6: MID_0061_REV6, 7: MID_0061_REV7,
    8: MID_0061_REV8, 9: MID_0061_REV9, 10: MID_0061_REV10, 11: MID_0061_REV11,
    12: MID_0061_REV12, 998: MID_0061_REV998, 999: MID_0061_REV999_FLAT,
  },
  '0066': { 1: MID_0066_REV1, 2: MID_0066_REV2 },
  '0067': MID_0067_FIELDS,
  '0902': MID_0902_FIELDS,
};
