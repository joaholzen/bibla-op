/**
 * biblaOp — Open Protocol Library
 * Nexo (Bosch Rexroth Nexo) vendor-specific decoder field definitions.
 *
 * Extends Bosch base decoders with Nexo-specific tool data (MID 0041)
 * and tightening results (MID 0065) with power redundancy monitoring.
 */

import type { FieldDef, DecoderEntry } from '../types/decoders';
import { BOSCH_MID_0041_REV1 } from './vendor-bosch';
import { statusOkNok, tighteningStatusLabel, torqueAngleStatusLabel, torqueAngleStatusFn } from './parsers';

/** Nexo MID 0041 rev 2: extends Bosch rev 1 with calibration, service, and software info */
const NEXO_MID_0041_REV2: FieldDef[] = [
  ...BOSCH_MID_0041_REV1,
  { id: '05', label: 'Calibration Value', length: 4 },
  { id: '06', label: 'Last Service Date', length: 19 },
  { id: '07', label: 'Cycles Since Service', length: 10 },
  { id: '08', label: 'Tool Type', length: 2 },
  { id: '09', label: 'Motor Size', length: 2 },
  { id: '10', label: 'Open End Data', length: 3 },
  { id: '11', label: 'Software Version', length: 19 },
];

/** Nexo MID 0065 rev 2: tightening result with power redundancy monitoring */
const NEXO_MID_0065_REV2: FieldDef[] = [
  { id: '01', label: 'Cell ID', length: 4 }, { id: '02', label: 'Channel ID', length: 2 },
  { id: '03', label: 'Controller Name', length: 25 }, { id: '04', label: 'ID Code', length: 25 },
  { id: '05', label: 'Job Number', length: 4 }, { id: '06', label: 'Tightening Program Number', length: 3 },
  { id: '07', label: 'Tightening Status', length: 1, transform: tighteningStatusLabel, statusFn: statusOkNok },
  { id: '08', label: 'OK/NOK Counter Status', length: 1 },
  { id: '09', label: 'Torque Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '10', label: 'Angle Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '11', label: 'Total Angle Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '12', label: 'Power Redundancy Mon. Status', length: 1, transform: torqueAngleStatusLabel, statusFn: torqueAngleStatusFn },
  { id: '13', label: 'Self-tap Status', length: 1 },
  { id: '14', label: 'Placeholder', length: 1 }, { id: '15', label: 'Placeholder', length: 1 },
  { id: '16', label: 'Torque Min', length: 6, unit: 'Nm' }, { id: '17', label: 'Torque Max', length: 6, unit: 'Nm' },
  { id: '18', label: 'Tightening Error Status', length: 10 },
  { id: '19', label: 'Final Torque', length: 6, unit: 'Nm' }, { id: '20', label: 'Final Angle', length: 5, unit: '°' },
  { id: '21', label: 'Total Angle', length: 5, unit: '°' }, { id: '22', label: 'Power Redundancy Value', length: 5, unit: '%' },
  { id: '23', label: 'Self-tap Torque', length: 6, unit: 'Nm' },
  { id: '24', label: 'Friction Torque', length: 6, unit: 'Nm' },
  { id: '25', label: 'Job Sequence Number', length: 5 },
  { id: '26', label: 'Sync Tightening ID', length: 5 }, { id: '27', label: 'Serial Number', length: 14 },
  { id: '28', label: 'Timestamp', length: 19 },
];

/** Rev 3: adds program name, torque unit, result type */
const NEXO_MID_0065_REV3: FieldDef[] = [
  ...NEXO_MID_0065_REV2,
  { id: '29', label: 'Tightening Program Name', length: 25 },
  { id: '30', label: 'Torque Values Unit', length: 1 },
  { id: '31', label: 'Result Type', length: 2 },
];

/** Rev 4: adds multi-part ID codes */
const NEXO_MID_0065_REV4: FieldDef[] = [
  ...NEXO_MID_0065_REV3,
  { id: '32', label: 'ID Code Part 2', length: 25 },
  { id: '33', label: 'ID Code Part 3', length: 25 },
  { id: '34', label: 'ID Code Part 4', length: 25 },
];

/** Nexo vendor decoder map */
export const NEXO_DECODER_MAP: Record<string, DecoderEntry> = {
  '0041': { 1: BOSCH_MID_0041_REV1, 2: NEXO_MID_0041_REV2 },
  '0065': { 1: NEXO_MID_0065_REV2, 2: NEXO_MID_0065_REV2, 3: NEXO_MID_0065_REV3, 4: NEXO_MID_0065_REV4 },
};
