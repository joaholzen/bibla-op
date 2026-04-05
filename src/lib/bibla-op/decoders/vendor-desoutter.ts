/**
 * biblaOp — Open Protocol Library
 * Desoutter vendor-specific decoder field definitions (MID 7400–7427)
 *
 * Desoutter uses custom MIDs in the 7xxx range for phase-level tightening
 * results (7404/7406), trace curve data (7410), step-level configuration
 * (7413), accessory info (7419), and information messages (7421/7425).
 * Values are often scaled (e.g. Nm×100, °×10).
 */

import type { FieldDef, DecoderEntry } from '../types/decoders';

/** MID 7404: Phase-level tightening result — torque/angle per phase with curve indices */
const MID_7404: FieldDef[] = [
  { id: '01', label: 'Spindle Number', length: 2 },
  { id: '02', label: 'Cycle Number', length: 3 },
  { id: '03', label: 'Phase Number', length: 2 },
  { id: '04', label: 'Phase Name', length: 2 },
  { id: '05', label: 'Method Name', length: 2 },
  { id: '06', label: 'Min Torque (M-)', length: 6, unit: 'Nm×100' },
  { id: '07', label: 'Max Torque (M+)', length: 6, unit: 'Nm×100' },
  { id: '08', label: 'Safety Torque (MO)', length: 6, unit: 'Nm×100' },
  { id: '09', label: 'Angle Threshold (MS)', length: 6, unit: '°×100' },
  { id: '10', label: 'Target Torque (MA)', length: 6, unit: 'Nm×100' },
  { id: '11', label: 'Measured Torque (MI)', length: 6, unit: 'Nm×100' },
  { id: '12', label: 'Min Angle (W-)', length: 6, unit: '°×10' },
  { id: '13', label: 'Max Angle (W+)', length: 6, unit: '°×10' },
  { id: '14', label: 'Safety Angle (WO)', length: 6, unit: '°×10' },
  { id: '15', label: 'Target Angle (WA)', length: 6, unit: '°×10' },
  { id: '16', label: 'Measured Angle (WI)', length: 6, unit: '°×10' },
  { id: '17', label: 'Reserved (t-)', length: 6 },
  { id: '18', label: 'Reserved (t+)', length: 6 },
  { id: '19', label: 'Reserved (tA)', length: 6 },
  { id: '20', label: 'Reserved (tI)', length: 6 },
  { id: '21', label: 'Speed (%)', length: 6 },
  { id: '22', label: 'Reserved', length: 6 },
  { id: '23', label: 'Reserved', length: 6 },
  { id: '24', label: 'Reserved', length: 2 },
  { id: '25', label: 'Reserved', length: 6 },
  { id: '26', label: 'Reserved', length: 6 },
  { id: '27', label: 'Curve Index 1', length: 4 },
  { id: '28', label: 'Curve Index 2', length: 4 },
  { id: '29', label: 'Reserved', length: 6 },
  { id: '30', label: 'Reserved', length: 6 },
  { id: '31', label: 'Reserved', length: 6 },
  { id: '32', label: 'Reserved', length: 6 },
  { id: '33', label: 'Reserved', length: 6 },
  { id: '34', label: 'Reserved', length: 6 },
  { id: '35', label: 'Report Status', length: 10 },
];

/** MID 7406: Cycle-level result summary — overall torque/angle + VIN + batch info */
const MID_7406: FieldDef[] = [
  { id: '01', label: 'Spindle Number', length: 2 },
  { id: '02', label: 'Cycle Number', length: 3 },
  { id: '03', label: 'Number of Phases', length: 2 },
  { id: '04', label: 'Cycle Status', length: 1 },
  { id: '05', label: 'Measured Torque', length: 6, unit: 'Nm×100' },
  { id: '06', label: 'Measured Angle', length: 6, unit: '°×10' },
  { id: '07', label: 'Timestamp', length: 19 },
  { id: '08', label: 'VIN', length: 25 },
  { id: '09', label: 'Batch Count', length: 4 },
  { id: '10', label: 'Batch Size', length: 4 },
];

/** MID 7410 rev 1: Trace curve header — coefficients and sample count */
const MID_7410_REV1: FieldDef[] = [
  { id: '01', label: 'Tool Number', length: 2 },
  { id: '02', label: 'Pset Number', length: 3 },
  { id: '03', label: 'Time Coefficient', length: 14 },
  { id: '04', label: 'Torque Coefficient', length: 14 },
  { id: '05', label: 'Angle Coefficient', length: 14 },
  { id: '06', label: 'Nb Measurement Points', length: 4 },
  { id: '07', label: 'Nb Telegrams', length: 2 },
  { id: '08', label: 'Telegram ID', length: 2 },
];

/** Rev 2: adds result number and speed coefficient */
const MID_7410_REV2: FieldDef[] = [
  { id: '01', label: 'Tool Number', length: 2 },
  { id: '02', label: 'Pset Number', length: 3 },
  { id: '03', label: 'Result Number', length: 10 },
  { id: '04', label: 'Time Coefficient', length: 14 },
  { id: '05', label: 'Torque Coefficient', length: 14 },
  { id: '06', label: 'Angle Coefficient', length: 14 },
  { id: '07', label: 'Speed Coefficient', length: 14 },
  { id: '08', label: 'Nb Measurement Points', length: 4 },
  { id: '09', label: 'Nb Telegrams', length: 2 },
  { id: '10', label: 'Telegram ID', length: 2 },
];

/** MID 7413 rev 1: Step/phase configuration — limits, targets, and strategy */
const MID_7413_REV1: FieldDef[] = [
  { id: '01', label: 'Spindle/Tool Number', length: 2 },
  { id: '02', label: 'Cycle/Pset Number', length: 3 },
  { id: '03', label: 'Phase/Step Number', length: 2 },
  { id: '04', label: 'Phase/Step Type', length: 2 },
  { id: '05', label: 'Tightening Strategy', length: 2 },
  { id: '06', label: 'Min Torque', length: 6, unit: 'Nm×100' },
  { id: '07', label: 'Max Torque', length: 6, unit: 'Nm×100' },
  { id: '08', label: 'Safety/Abort Torque', length: 6, unit: 'Nm×100' },
  { id: '09', label: 'Angle Threshold', length: 6, unit: '°×100' },
  { id: '10', label: 'Target Torque', length: 6, unit: 'Nm×100' },
  { id: '11', label: 'Reserved', length: 6 },
  { id: '12', label: 'Min Angle', length: 6, unit: '°×10' },
  { id: '13', label: 'Max Angle', length: 6, unit: '°×10' },
  { id: '14', label: 'Safety/Abort Angle', length: 6, unit: '°×10' },
  { id: '15', label: 'Target Angle', length: 6, unit: '°×10' },
  { id: '16', label: 'Reserved', length: 6 },
  { id: '17', label: 'Reserved', length: 6 },
  { id: '18', label: 'Reserved', length: 6 },
  { id: '19', label: 'Interphase Time', length: 6, unit: 'ms' },
  { id: '20', label: 'Reserved', length: 6 },
  { id: '21', label: 'Speed', length: 6, unit: '%' },
  { id: '22', label: 'Reserved', length: 6 },
  { id: '23', label: 'Reserved', length: 6 },
  { id: '24', label: 'Reserved', length: 2 },
  { id: '25', label: 'Reserved', length: 6 },
  { id: '26', label: 'Reserved', length: 6 },
  { id: '27', label: 'Curve Index 1', length: 4 },
  { id: '28', label: 'Curve Index 2', length: 4 },
  { id: '29', label: 'Reserved', length: 6 },
  { id: '30', label: 'Reserved', length: 6 },
  { id: '31', label: 'Reserved', length: 6 },
  { id: '32', label: 'Direction', length: 2 },
  { id: '33', label: 'Rotation Type', length: 1 },
  { id: '34', label: 'Rotation Time/Angle', length: 3 },
  { id: '35', label: 'Number of Rotations', length: 1 },
  { id: '36', label: 'Torque Unit', length: 4 },
  { id: '37', label: 'Last Modification Date', length: 19 },
];

/** Rev 2: adds torque rate, angle delay, gradient fields */
const MID_7413_REV2: FieldDef[] = [
  ...MID_7413_REV1.slice(0, 20),
  { id: '21', label: 'Speed', length: 6, unit: '%' },
  { id: '22', label: 'Target Torque Rate', length: 6, unit: '×10000' },
  { id: '23', label: 'Angle Delay', length: 6, unit: '°×10' },
  { id: '24', label: 'Nbr Samples T.Rate', length: 2 },
  { id: '25', label: 'Gradient Torque', length: 6, unit: 'Nm×100' },
  { id: '26', label: 'Gradient Angle', length: 6, unit: '°×10' },
  ...MID_7413_REV1.slice(26),
];

/** MID 7419: Removable Accessory info */
const MID_7419: FieldDef[] = [
  { id: '01', label: 'Pset Number', length: 3 },
  { id: '02', label: 'Timestamp', length: 20 },
  { id: '03', label: 'Removable Accessory Name', length: 50 },
];

/** MID 7421/7425: Information message */
const MID_7421: FieldDef[] = [
  { id: '01', label: 'Information Number', length: 3 },
  { id: '02', label: 'Number of Parameters', length: 2 },
  { id: '03', label: 'Information Data 1', length: 10 },
];

/** Desoutter vendor decoder map */
export const DESOUTTER_DECODER_MAP: Record<string, DecoderEntry> = {
  '7404': MID_7404,
  '7406': MID_7406,
  '7410': { 1: MID_7410_REV1, 2: MID_7410_REV2 } as DecoderEntry,
  '7413': { 1: MID_7413_REV1, 2: MID_7413_REV2 } as DecoderEntry,
  '7419': MID_7419,
  '7421': MID_7421,
  '7425': MID_7421,
};
