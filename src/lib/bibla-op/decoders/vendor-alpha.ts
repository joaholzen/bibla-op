/**
 * biblaOp — Open Protocol Library
 * Alpha vendor-specific decoder field definitions
 */

import type { FieldDef, DecoderEntry } from '../types/decoders';
import { statusOkNok, tighteningStatusLabel, torqueAngleStatusLabel, torqueAngleStatusFn } from './parsers';

const alphaStrategyTransform = (v: string): string => {
  const strategies: Record<string, string> = {
    '01': 'Torque Control / Angle Monitoring',
    '02': 'Angle Control / Torque Monitoring',
    '03': 'Torque Control AND Angle Control',
    '04': 'Backout',
    '05': 'Torque Rate Control',
    '06': 'Yield Control',
    '07': 'Angle Control / Torque Averaging',
  };
  return strategies[v.trim()] ?? `Unknown (${v.trim()})`;
};

const ALPHA_MID_0041_REV2: FieldDef[] = [
  { id: '01', label: 'Tool Serial Number', length: 14 },
  { id: '02', label: 'Tool Number of Tightening', length: 10 },
  { id: '03', label: 'Last Calibration Date', length: 19 },
  { id: '04', label: 'Controller Serial Number', length: 10 },
  { id: '05', label: 'Calibration Value', length: 6 },
  { id: '06', label: 'Last Service Date', length: 19 },
  { id: '07', label: 'Tightenings Since Service', length: 10 },
  { id: '08', label: 'Tool Type', length: 2, transform: (v) => {
    const types: Record<string, string> = {
      '01': 'S-tool', '02': 'DS-tool', '03': 'Ref. transducer', '04': 'ST-tool',
      '05': 'EP-tool', '06': 'ETX-tool', '07': 'SL-tool', '08': 'DL-tool',
      '09': 'Bensor (offline)', '10': 'Bensor (online)', '11': 'QST-tool',
    };
    return types[v.trim()] ?? `Unknown (${v.trim()})`;
  }},
  { id: '09', label: 'Motor Size', length: 2 },
  { id: '10', label: 'OPEN End Data', length: 3, transform: (v) => {
    const useOE = v[0] === '1' ? 'Yes' : 'No';
    const dir = v[1] === '0' ? 'CW' : 'CCW';
    const motor = v[2] === '0' ? 'Normal' : 'Inverted';
    return `Open End: ${useOE}, Dir: ${dir}, Motor: ${motor}`;
  }},
  { id: '11', label: 'PF Software Version', length: 19 },
];

const ALPHA_MID_0061_REV2: FieldDef[] = [
  { id: '01', label: 'Cell ID', length: 4 },
  { id: '02', label: 'Channel ID', length: 2 },
  { id: '03', label: 'Torque Controller Name', length: 25 },
  { id: '04', label: 'VIN Number', length: 25 },
  { id: '05', label: 'Job Number', length: 4 },
  { id: '06', label: 'Pset Number (Task)', length: 3 },
  { id: '07', label: 'Strategy', length: 2, transform: alphaStrategyTransform },
  { id: '08', label: 'Strategy Options', length: 5 },
  { id: '09', label: 'Batch Size', length: 4 },
  { id: '10', label: 'Batch Counter', length: 4 },
  { id: '11', label: 'Tightening Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
  { id: '12', label: 'Batch Status', length: 1 },
  { id: '13', label: 'Torque Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '14', label: 'Angle Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '15', label: 'Rundown Angle Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '16', label: 'Current Monitoring Status', length: 1 },
  { id: '17', label: 'Selftap Status', length: 1 },
  { id: '18', label: 'Prevailing Torque Status', length: 1 },
  { id: '19', label: 'Reserved', length: 1 },
  { id: '20', label: 'Tightening Error Status', length: 10 },
  { id: '21', label: 'Torque Min Limit', length: 6, unit: 'Nm' },
  { id: '22', label: 'Torque Max Limit', length: 6, unit: 'Nm' },
  { id: '23', label: 'Torque Target', length: 6, unit: 'Nm' },
  { id: '24', label: 'Torque', length: 6, unit: 'Nm' },
  { id: '25', label: 'Angle Min', length: 5, unit: '°' },
  { id: '26', label: 'Angle Max', length: 5, unit: '°' },
  { id: '27', label: 'Angle Target', length: 5, unit: '°' },
  { id: '28', label: 'Angle', length: 5, unit: '°' },
  { id: '29', label: 'Rundown Angle Min', length: 5, unit: '°' },
  { id: '30', label: 'Rundown Angle Max', length: 5, unit: '°' },
  { id: '31', label: 'Rundown Angle', length: 5, unit: '°' },
  { id: '32', label: 'Current Mon. Min', length: 3 },
  { id: '33', label: 'Current Mon. Max', length: 3 },
  { id: '34', label: 'Current Mon. Value', length: 3 },
  { id: '35', label: 'Selftap Min', length: 6, unit: 'Nm' },
  { id: '36', label: 'Selftap Max', length: 6, unit: 'Nm' },
  { id: '37', label: 'Selftap Torque', length: 6, unit: 'Nm' },
  { id: '38', label: 'Prev. Torque Min', length: 6, unit: 'Nm' },
  { id: '39', label: 'Prev. Torque Max', length: 6, unit: 'Nm' },
  { id: '40', label: 'Prev. Torque', length: 6, unit: 'Nm' },
  { id: '41', label: 'Tightening ID', length: 10 },
  { id: '42', label: 'Job Sequence Number', length: 5 },
  { id: '43', label: 'Sync Tightening ID', length: 5 },
  { id: '44', label: 'Tool Serial Number', length: 14 },
  { id: '45', label: 'Timestamp', length: 19 },
  { id: '46', label: 'Last Change in Pset', length: 19 },
];

const ALPHA_MID_0065_REV2: FieldDef[] = [
  { id: '01', label: 'Tightening ID', length: 10 },
  { id: '02', label: 'VIN Number', length: 25 },
  { id: '03', label: 'Job Number', length: 4 },
  { id: '04', label: 'Pset Number (Task)', length: 3 },
  { id: '05', label: 'Strategy', length: 2, transform: alphaStrategyTransform },
  { id: '06', label: 'Strategy Options', length: 5 },
  { id: '07', label: 'Batch Size', length: 4 },
  { id: '08', label: 'Batch Counter', length: 4 },
  { id: '09', label: 'Tightening Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
  { id: '10', label: 'Torque Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '11', label: 'Angle Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '12', label: 'Torque Min Limit', length: 6, unit: 'Nm' },
  { id: '13', label: 'Torque Max Limit', length: 6, unit: 'Nm' },
  { id: '14', label: 'Torque Target', length: 6, unit: 'Nm' },
  { id: '15', label: 'Torque', length: 6, unit: 'Nm' },
  { id: '16', label: 'Angle Min', length: 5, unit: '°' },
  { id: '17', label: 'Angle Max', length: 5, unit: '°' },
  { id: '18', label: 'Angle Target', length: 5, unit: '°' },
  { id: '19', label: 'Angle', length: 5, unit: '°' },
  { id: '20', label: 'Timestamp', length: 19 },
  { id: '21', label: 'Last Change in Pset', length: 19 },
  { id: '22', label: 'Batch Status', length: 1 },
];

const ALPHA_MID_0071: FieldDef[] = [
  { id: '01', label: 'Error Code', length: 4 },
  { id: '02', label: 'Controller Ready', length: 1, transform: (v) => v.trim() === '1' ? 'OK (no alarms)' : 'NOK (alarm active)' },
  { id: '03', label: 'Tool Ready', length: 1, transform: (v) => v.trim() === '1' ? 'OK (no alarms)' : 'NOK (alarm active)' },
  { id: '04', label: 'Time', length: 19 },
];

const ALPHA_MID_0076: FieldDef[] = [
  { id: '01', label: 'Alarm Status', length: 1, transform: (v) => v.trim() === '1' ? 'Active' : 'Cleared' },
  { id: '02', label: 'Error Code', length: 4 },
  { id: '03', label: 'Controller Ready', length: 1, transform: (v) => v.trim() === '1' ? 'OK (no alarms)' : 'NOK (alarm active)' },
  { id: '04', label: 'Tool Ready', length: 1, transform: (v) => v.trim() === '1' ? 'OK (no alarms)' : 'NOK (alarm active)' },
  { id: '05', label: 'Time', length: 19 },
];

export const ALPHA_DECODER_MAP: Record<string, DecoderEntry> = {
  '0041': { 2: ALPHA_MID_0041_REV2 },
  '0061': { 2: ALPHA_MID_0061_REV2 },
  '0065': { 2: ALPHA_MID_0065_REV2 },
  '0071': ALPHA_MID_0071,
  '0076': ALPHA_MID_0076,
};
