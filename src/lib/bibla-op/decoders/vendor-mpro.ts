/**
 * biblaOp — Open Protocol Library
 * mPro (Cleco/Apex) vendor-specific decoder field definitions
 */

import type { FieldDef, DecoderEntry } from '../types/decoders';
import { MID_0041_REV1 } from './tool';
import { MID_0061_REV5 } from './tightening';
import { MID_0002_REV1 } from './communication';
import {
  statusOkNok, tighteningStatusLabel, torqueAngleStatusLabel, torqueAngleStatusFn,
  batchStatusLabel,
} from './parsers';

const MPRO_MID_0002_REV1 = MID_0002_REV1;
const MPRO_MID_0002_REV2: FieldDef[] = [
  ...MPRO_MID_0002_REV1,
  { id: '04', label: 'Supplier Code', length: 3 },
];
const MPRO_MID_0002_REV3: FieldDef[] = [
  ...MPRO_MID_0002_REV2,
  { id: '05', label: 'Open Protocol Version', length: 19 },
  { id: '06', label: 'Controller Software Version', length: 19 },
  { id: '07', label: 'Tool Software Version', length: 19 },
];

export const MPRO_MID_0013_REV1: FieldDef[] = [
  { id: '01', label: 'Application ID', length: 3 },
  { id: '02', label: 'Application Name', length: 25 },
  { id: '03', label: 'Rotation Direction', length: 1, transform: (v) => v === '1' ? 'CW' : v === '2' ? 'CCW' : v },
  { id: '04', label: 'Batch Size', length: 2 },
  { id: '05', label: 'Torque Min', length: 6, unit: 'Nm' },
  { id: '06', label: 'Torque Max', length: 6, unit: 'Nm' },
  { id: '07', label: 'Torque Final Target', length: 6, unit: 'Nm' },
  { id: '08', label: 'Angle Min', length: 5, unit: '°' },
  { id: '09', label: 'Angle Max', length: 5, unit: '°' },
  { id: '10', label: 'Final Angle Target', length: 5, unit: '°' },
];

const MPRO_MID_0041_REV2: FieldDef[] = [
  ...MID_0041_REV1,
  { id: '05', label: 'Calibration Value', length: 6, unit: 'Nm' },
  { id: '06', label: 'Last Service Date', length: 19 },
  { id: '07', label: 'Tightenings Since Service', length: 10 },
  { id: '08', label: 'Tool Type', length: 2 },
  { id: '09', label: 'Motor Size', length: 2 },
  { id: '10', label: 'Open End Data', length: 3 },
  { id: '11', label: 'Controller Software Version', length: 19 },
];

const MPRO_MID_0041_REV500: FieldDef[] = [
  { id: '01', label: 'Original TQ Cal Value – T1', length: 9 },
  { id: '02', label: 'Calibration TQ – T1', length: 9 },
  { id: '03', label: 'Angle Factor – T1', length: 9 },
  { id: '04', label: 'Resolver Factor – T1', length: 9 },
  { id: '05', label: 'Torque Constant – T1', length: 9 },
  { id: '06', label: 'Servo PS – T1', length: 5 },
  { id: '07', label: 'Tool Speed – T1', length: 9 },
  { id: '08', label: 'TQ Factor – T1', length: 9 },
  { id: '09', label: 'TQ Capacity – T1', length: 9 },
  { id: '10', label: 'Tool Type – T1', length: 24 },
  { id: '11', label: 'Service Data – T1', length: 3 },
  { id: '12', label: 'Tool Ident Nr – T1', length: 18 },
  { id: '13', label: 'Tool Serial Nr – T1', length: 9 },
  { id: '14', label: 'Transducer Type – T1', length: 12 },
  { id: '15', label: 'Transducer Ident Nr – T1', length: 18 },
  { id: '16', label: 'Transducer Serial Nr – T1', length: 9 },
  { id: '17', label: 'Calibration Date – T1', length: 4, unit: 'YYWW' },
  { id: '18', label: 'Manufacturing Date – T1', length: 4, unit: 'YYWW' },
  { id: '19', label: 'Repair Date – T1', length: 4, unit: 'YYWW' },
  { id: '20', label: 'Total Rundowns – T1', length: 10 },
  { id: '21', label: 'Rundowns Since Service – T1', length: 10 },
  { id: '22', label: 'Overall Gear Ratio – T1', length: 9 },
  { id: '23', label: 'Original TQ Cal Value – T2', length: 9 },
  { id: '24', label: 'Calibration TQ – T2', length: 9 },
  { id: '25', label: 'Angle Factor – T2', length: 9 },
];
const MPRO_MID_0041_REV501: FieldDef[] = [
  ...MPRO_MID_0041_REV500,
  { id: '70', label: 'Last Calibration Date', length: 19 },
  { id: '71', label: 'Next Calibration Date', length: 19 },
  { id: '72', label: 'Minimum Torque for Tool', length: 9, unit: 'Nm' },
  { id: '73', label: 'Torque Constant (Ref)', length: 9, unit: 'Nm/A' },
  { id: '74', label: 'User Defined String', length: 20 },
  { id: '75', label: 'User of Last SI Change', length: 16 },
  { id: '76', label: 'Date of Last SI Change', length: 19 },
  { id: '77', label: 'Tool Hardware Revision', length: 4 },
  { id: '78', label: 'Tool HW Revision Date', length: 19 },
  { id: '79', label: 'Exact Production Date', length: 19 },
];

const MPRO_MID_0061_REV1: FieldDef[] = [
  { id: '01', label: 'Cell ID', length: 4 }, { id: '02', label: 'Channel ID', length: 2 },
  { id: '03', label: 'Controller Name', length: 25 }, { id: '04', label: 'VIN', length: 25 },
  { id: '05', label: 'Linking Group Number', length: 2 }, { id: '06', label: 'Application ID', length: 3 },
  { id: '07', label: 'Batch Size', length: 4 }, { id: '08', label: 'Batch Counter', length: 4 },
  { id: '09', label: 'Tightening Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
  { id: '10', label: 'Torque Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '11', label: 'Angle Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '12', label: 'Torque Min', length: 6, unit: 'Nm' }, { id: '13', label: 'Torque Max', length: 6, unit: 'Nm' },
  { id: '14', label: 'Torque Final Target', length: 6, unit: 'Nm' }, { id: '15', label: 'Final Torque', length: 6, unit: 'Nm' },
  { id: '16', label: 'Angle Min', length: 5, unit: '°' }, { id: '17', label: 'Angle Max', length: 5, unit: '°' },
  { id: '18', label: 'Final Angle Target', length: 5, unit: '°' }, { id: '19', label: 'Final Angle', length: 5, unit: '°' },
  { id: '20', label: 'Timestamp', length: 19 }, { id: '21', label: 'Last Change', length: 19 },
  { id: '22', label: 'Batch Status', length: 1, transform: batchStatusLabel },
  { id: '23', label: 'Tightening ID', length: 10 },
];

const mProStrategyLabel = (raw: string): string => {
  const strategies: Record<string, string> = {
    '01': 'Torque control', '02': 'Torque control/Angle mon.',
    '04': 'Angle control/Torque mon.', '07': 'Reverse angle',
    '11': 'Torque control/Angle control (OR)', '13': 'Home position',
    '15': 'Yield', '19': 'Yield/Torque control', '99': 'No strategy/Unsupported',
  };
  return strategies[raw.trim()] || raw.trim();
};

const mProBatchStatus = (v: string): string => {
  const s = v.trim();
  return s === '0' ? 'Not completed' : s === '1' ? 'OK' : s === '2' ? 'Not used' : s === '3' ? 'Running' : s;
};

const MPRO_MID_0061_REV2: FieldDef[] = [
  { id: '01', label: 'Cell ID', length: 4 }, { id: '02', label: 'Channel ID', length: 2 },
  { id: '03', label: 'Controller Name', length: 25 }, { id: '04', label: 'VIN', length: 25 },
  { id: '05', label: 'Linking Group', length: 4 }, { id: '06', label: 'Application ID', length: 3 },
  { id: '07', label: 'Strategy', length: 2, transform: mProStrategyLabel },
  { id: '08', label: 'Strategy Options', length: 5 },
  { id: '09', label: 'Batch Size', length: 4 }, { id: '10', label: 'Batch Counter', length: 4 },
  { id: '11', label: 'Tightening Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
  { id: '12', label: 'Batch Status', length: 1, transform: mProBatchStatus },
  { id: '13', label: 'Torque Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '14', label: 'Angle Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '15', label: 'Rundown Angle Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '16', label: 'Current Mon. Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '17', label: 'Self-tap Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '18', label: 'Prevail Torque Mon. Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '19', label: 'Prevail Torque Comp. Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '20', label: 'Tightening Error Status', length: 10 },
  { id: '21', label: 'Torque Min', length: 6, unit: 'Nm' }, { id: '22', label: 'Torque Max', length: 6, unit: 'Nm' },
  { id: '23', label: 'Torque Final Target', length: 6, unit: 'Nm' }, { id: '24', label: 'Final Torque', length: 6, unit: 'Nm' },
  { id: '25', label: 'Angle Min', length: 5, unit: '°' }, { id: '26', label: 'Angle Max', length: 5, unit: '°' },
  { id: '27', label: 'Final Angle Target', length: 5, unit: '°' }, { id: '28', label: 'Final Angle', length: 5, unit: '°' },
  { id: '29', label: 'Rundown Angle Min', length: 5, unit: '°' }, { id: '30', label: 'Rundown Angle Max', length: 5, unit: '°' },
  { id: '31', label: 'Rundown Angle', length: 5, unit: '°' },
  { id: '32', label: 'Current Mon. Min', length: 3, unit: '%' }, { id: '33', label: 'Current Mon. Max', length: 3, unit: '%' },
  { id: '34', label: 'Current Mon. Value', length: 3, unit: '%' },
  { id: '35', label: 'Self-tap Min', length: 6, unit: 'Nm' }, { id: '36', label: 'Self-tap Max', length: 6, unit: 'Nm' },
  { id: '37', label: 'Self-tap Torque', length: 6, unit: 'Nm' },
  { id: '38', label: 'Prevail Torque Mon. Min', length: 6, unit: 'Nm' }, { id: '39', label: 'Prevail Torque Mon. Max', length: 6, unit: 'Nm' },
  { id: '40', label: 'Prevail Torque', length: 6, unit: 'Nm' },
  { id: '41', label: 'Tightening ID', length: 10 }, { id: '42', label: 'Linking Group Sequence Number', length: 5 },
  { id: '43', label: 'Sync Tightening ID', length: 5 }, { id: '44', label: 'Tool Serial Number', length: 14 },
  { id: '45', label: 'Timestamp', length: 19 }, { id: '46', label: 'Last Change', length: 19 },
];

const mProTorqueUnitLabel = (v: string): string => {
  const units: Record<string, string> = { '1': 'Nm', '2': 'FtLbs', '3': 'InLbs', '4': 'Kpm', '5': 'KgCm', '6': 'OzfIn', '8': 'Ncm', '9': 'daNm' };
  return units[v.trim()] ?? v.trim();
};

const MPRO_MID_0061_REV3: FieldDef[] = [
  ...MPRO_MID_0061_REV2,
  { id: '47', label: 'Application Name', length: 25 },
  { id: '48', label: 'Torque Values Unit', length: 1, transform: mProTorqueUnitLabel },
  { id: '49', label: 'Result Type', length: 2, transform: (v) => v.trim() === '01' ? 'Tightening' : v.trim() === '02' ? 'Loosening' : v.trim() },
];
const MPRO_MID_0061_REV4: FieldDef[] = [
  ...MPRO_MID_0061_REV3,
  { id: '50', label: 'Identifier Result Part 2', length: 25 },
  { id: '51', label: 'Identifier Result Part 3', length: 25 },
  { id: '52', label: 'Identifier Result Part 4', length: 25 },
];
const MPRO_MID_0061_REV5: FieldDef[] = [...MPRO_MID_0061_REV4, { id: '53', label: 'Customer Tightening Error Code', length: 4 }];
const MPRO_MID_0061_REV6: FieldDef[] = [
  ...MPRO_MID_0061_REV5,
  { id: '54', label: 'Prevail Torque Compensate Value', length: 6, unit: 'Nm' },
  { id: '55', label: 'Tightening Error Status 2', length: 10 },
];

export const MPRO_DECODER_MAP: Record<string, DecoderEntry> = {
  '0002': { 1: MPRO_MID_0002_REV1, 2: MPRO_MID_0002_REV2, 3: MPRO_MID_0002_REV3 },
  '0013': { 1: MPRO_MID_0013_REV1 },
  '0041': { 1: MID_0041_REV1, 2: MPRO_MID_0041_REV2, 500: MPRO_MID_0041_REV500, 501: MPRO_MID_0041_REV501 },
  '0061': {
    1: MPRO_MID_0061_REV1, 2: MPRO_MID_0061_REV2, 3: MPRO_MID_0061_REV3,
    4: MPRO_MID_0061_REV4, 5: MPRO_MID_0061_REV5, 6: MPRO_MID_0061_REV6,
  },
  '0065': {
    1: MPRO_MID_0061_REV1, 2: MPRO_MID_0061_REV2, 3: MPRO_MID_0061_REV3,
    4: MPRO_MID_0061_REV4, 5: MPRO_MID_0061_REV5, 6: MPRO_MID_0061_REV6,
  },
};
