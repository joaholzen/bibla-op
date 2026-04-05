/**
 * biblaOp — Open Protocol Library
 * MID catalog — comprehensive definition of all Open Protocol MIDs
 */

import { DIGITAL_INPUT_OPTIONS } from './protocol-constants';

export interface MIDDefinition {
  mid: string;
  name: string;
  category: string;
  direction: 'integrator' | 'controller' | 'both';
  description: string;
  hasData: boolean;
  dataFields?: DataField[];
  revisions?: number[];
  vendorNames?: Record<string, { name: string; description: string }>;
}

export interface DataField {
  name: string;
  length: number;
  description: string;
  defaultValue?: string;
  options?: { value: string; label: string }[];
  revisions?: number[];
}

const MID_CATALOG_ARRAY: MIDDefinition[] = [
  // Communication
  { mid: '0001', name: 'Communication Start', category: 'Communication', direction: 'integrator', description: 'Start communication session with controller', hasData: true, revisions: [1, 2, 3, 4, 5, 6, 7, 8],
    dataFields: [
      { name: 'Optional Keep Alive', length: 1, description: '0=Use Keep alive (mandatory), 1=Ignore Keep alive (optional)', defaultValue: '0', revisions: [7, 8] },
      { name: 'Tool Lock at Disconnection', length: 1, description: '0=No tool lock, 1=Tool lock', defaultValue: '0', revisions: [8] },
      { name: 'Early Lock Time', length: 4, description: 'Time in seconds×10 (4-digit integer). 0 or space = not used.', defaultValue: '0000', revisions: [8] },
    ] },
  { mid: '0002', name: 'Communication Start Ack', category: 'Communication', direction: 'controller', description: 'Acknowledge communication start', hasData: true, revisions: [1, 2, 3, 4, 5, 6, 7, 8] },
  { mid: '0003', name: 'Communication Stop', category: 'Communication', direction: 'integrator', description: 'Stop communication session', hasData: false },
  { mid: '0004', name: 'Negative Acknowledge', category: 'Communication', direction: 'controller', description: 'Command rejected with error code', hasData: true, revisions: [1, 2],
    dataFields: [{ name: 'MID', length: 4, description: 'MID being rejected' }, { name: 'Error Code', length: 2, description: 'Error code' }] },
  { mid: '0005', name: 'Positive Acknowledge', category: 'Communication', direction: 'both', description: 'Command accepted', hasData: true,
    dataFields: [{ name: 'MID', length: 4, description: 'MID being acknowledged' }] },
  { mid: '0006', name: 'Generic Data Request', category: 'Communication', direction: 'integrator', description: 'Request application data by MID number', hasData: true,
    dataFields: [{ name: 'Requested MID', length: 4, description: 'MID to request', defaultValue: '2501' }, { name: 'PSET ID', length: 3, description: 'Parameter set number (001-999)', defaultValue: '001' }] },
  { mid: '0008', name: 'Generic Subscribe', category: 'Communication', direction: 'integrator', description: 'Subscribe to application data by MID number', hasData: true,
    dataFields: [{ name: 'Data MID', length: 4, description: 'MID to subscribe to', defaultValue: '0900' }] },
  { mid: '0009', name: 'Generic Unsubscribe', category: 'Communication', direction: 'integrator', description: 'Unsubscribe from application data by MID number', hasData: true,
    dataFields: [{ name: 'Data MID', length: 4, description: 'MID to unsubscribe from', defaultValue: '0900' }] },
  { mid: '9997', name: 'Link Level Ack', category: 'Communication', direction: 'both', description: 'Link level acknowledge', hasData: false },
  { mid: '9998', name: 'Link Level Ack Error', category: 'Communication', direction: 'both', description: 'Link level acknowledge error', hasData: true,
    dataFields: [{ name: 'MID Number', length: 4, description: 'MID number to which the error belongs' }, { name: 'Error Code', length: 4, description: 'Error code' }] },
  { mid: '9999', name: 'Keep Alive', category: 'Communication', direction: 'both', description: 'Keep alive heartbeat message', hasData: false },
  // Parameter Set
  { mid: '0010', name: 'Pset ID Upload Request', category: 'Parameter Set', direction: 'integrator', description: 'Request list of parameter set IDs', hasData: false, revisions: [1, 2, 3, 4] },
  { mid: '0011', name: 'Pset ID Upload Reply', category: 'Parameter Set', direction: 'controller', description: 'Reply with parameter set IDs', hasData: true },
  { mid: '0012', name: 'Pset Data Upload Request', category: 'Parameter Set', direction: 'integrator', description: 'Request parameter set data', hasData: true,
    dataFields: [{ name: 'Parameter Set ID', length: 3, description: 'Pset ID (001-999)', defaultValue: '001' }], revisions: [1, 2, 3, 4, 5] },
  { mid: '0013', name: 'Pset Data Upload Reply', category: 'Parameter Set', direction: 'controller', description: 'Reply with parameter set data', hasData: true, revisions: [1, 2, 3, 4, 5] },
  { mid: '0014', name: 'Pset Selected Subscribe', category: 'Parameter Set', direction: 'integrator', description: 'Subscribe to parameter set selection changes', hasData: false },
  { mid: '0015', name: 'Pset Selected', category: 'Parameter Set', direction: 'controller', description: 'Parameter set selected notification', hasData: true, revisions: [1, 2, 3] },
  { mid: '0016', name: 'Pset Selected Ack', category: 'Parameter Set', direction: 'integrator', description: 'Acknowledge parameter set selected', hasData: false },
  { mid: '0017', name: 'Pset Selected Unsubscribe', category: 'Parameter Set', direction: 'integrator', description: 'Unsubscribe from parameter set selection', hasData: false },
  { mid: '0018', name: 'Select Pset', category: 'Parameter Set', direction: 'integrator', description: 'Select a parameter set', hasData: true,
    dataFields: [{ name: 'Parameter Set ID', length: 3, description: 'Pset ID (001-999)', defaultValue: '001' }] },
  { mid: '0019', name: 'Set Pset Batch Size', category: 'Parameter Set', direction: 'integrator', description: 'Set batch size for parameter set', hasData: true, revisions: [1, 2],
    dataFields: [{ name: 'Parameter Set ID', length: 3, description: 'Pset ID', defaultValue: '001' }, { name: 'Batch Size', length: 4, description: 'Batch size (0000-9999)', defaultValue: '0000' }] },
  { mid: '0020', name: 'Reset Pset Batch Counter', category: 'Parameter Set', direction: 'integrator', description: 'Reset batch counter for parameter set', hasData: true,
    dataFields: [{ name: 'Parameter Set ID', length: 3, description: 'Pset ID', defaultValue: '001' }] },
  // Job
  { mid: '0030', name: 'Job ID Upload Request', category: 'Job', direction: 'integrator', description: 'Request list of job IDs', hasData: false, revisions: [1, 2] },
  { mid: '0031', name: 'Job ID Upload Reply', category: 'Job', direction: 'controller', description: 'Reply with job IDs', hasData: true, revisions: [1, 2] },
  { mid: '0032', name: 'Job Data Upload Request', category: 'Job', direction: 'integrator', description: 'Request job data', hasData: true, revisions: [1, 2, 3, 4],
    dataFields: [{ name: 'Job ID', length: 4, description: 'Job ID (0001-9999)', defaultValue: '0001' }] },
  { mid: '0033', name: 'Job Data Upload Reply', category: 'Job', direction: 'controller', description: 'Reply with job data', hasData: true, revisions: [1, 2, 3, 4] },
  { mid: '0034', name: 'Job Info Subscribe', category: 'Job', direction: 'integrator', description: 'Subscribe to job info', hasData: false, revisions: [1, 2, 3, 4] },
  { mid: '0035', name: 'Job Info', category: 'Job', direction: 'controller', description: 'Job info notification', hasData: true, revisions: [1, 2, 3, 4, 5, 6] },
  { mid: '0036', name: 'Job Info Ack', category: 'Job', direction: 'integrator', description: 'Acknowledge job info', hasData: false },
  { mid: '0037', name: 'Job Info Unsubscribe', category: 'Job', direction: 'integrator', description: 'Unsubscribe from job info', hasData: false },
  { mid: '0038', name: 'Select Job', category: 'Job', direction: 'integrator', description: 'Select a job', hasData: true, revisions: [1, 2],
    dataFields: [{ name: 'Job ID', length: 4, description: 'Job ID', defaultValue: '0001' }] },
  { mid: '0039', name: 'Job Restart', category: 'Job', direction: 'integrator', description: 'Restart job', hasData: true, revisions: [1, 2],
    dataFields: [{ name: 'Job ID', length: 4, description: 'Job ID', defaultValue: '0001' }] },
  // Tool
  { mid: '0040', name: 'Tool Data Upload Request', category: 'Tool', direction: 'integrator', description: 'Request tool data', hasData: false, revisions: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { mid: '0041', name: 'Tool Data Upload Reply', category: 'Tool', direction: 'controller', description: 'Reply with tool data', hasData: true, revisions: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  // VIN / Identifier
  { mid: '0050', name: 'VIN Subscribe', category: 'Identifier', direction: 'integrator', description: 'Subscribe to VIN', hasData: false, revisions: [1, 2] },
  { mid: '0051', name: 'VIN Number', category: 'Identifier', direction: 'controller', description: 'VIN number notification', hasData: true },
  { mid: '0052', name: 'VIN Number Ack', category: 'Identifier', direction: 'integrator', description: 'Acknowledge VIN', hasData: false },
  { mid: '0053', name: 'VIN Unsubscribe', category: 'Identifier', direction: 'integrator', description: 'Unsubscribe from VIN', hasData: false },
  { mid: '0054', name: 'VIN Download', category: 'Identifier', direction: 'integrator', description: 'Download VIN to controller', hasData: true,
    dataFields: [{ name: 'VIN', length: 25, description: 'VIN string', defaultValue: '' }] },
  // Tightening
  { mid: '0060', name: 'Last Tightening Subscribe', category: 'Tightening', direction: 'integrator', description: 'Subscribe to last tightening result', hasData: false, revisions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 998, 999] },
  { mid: '0061', name: 'Last Tightening Result', category: 'Tightening', direction: 'controller', description: 'Last tightening result data', hasData: true, revisions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 998, 999] },
  { mid: '0062', name: 'Last Tightening Ack', category: 'Tightening', direction: 'integrator', description: 'Acknowledge last tightening result', hasData: false },
  { mid: '0063', name: 'Last Tightening Unsubscribe', category: 'Tightening', direction: 'integrator', description: 'Unsubscribe from last tightening result', hasData: false },
  { mid: '0064', name: 'Old Tightening Request', category: 'Tightening', direction: 'integrator', description: 'Request old tightening result', hasData: true },
  { mid: '0065', name: 'Old Tightening Result', category: 'Tightening', direction: 'controller', description: 'Old tightening result data', hasData: true },
  // Alarm
  { mid: '0070', name: 'Alarm Subscribe', category: 'Alarm', direction: 'integrator', description: 'Subscribe to alarms', hasData: false },
  { mid: '0071', name: 'Alarm', category: 'Alarm', direction: 'controller', description: 'Alarm notification', hasData: true },
  { mid: '0072', name: 'Alarm Ack', category: 'Alarm', direction: 'integrator', description: 'Acknowledge alarm', hasData: false },
  { mid: '0073', name: 'Alarm Unsubscribe', category: 'Alarm', direction: 'integrator', description: 'Unsubscribe from alarms', hasData: false },
  { mid: '0074', name: 'Alarm Acknowledged On Controller', category: 'Alarm', direction: 'controller', description: 'Alarm acknowledged on controller', hasData: true, revisions: [1, 2] },
  { mid: '0076', name: 'Alarm Status', category: 'Alarm', direction: 'controller', description: 'Alarm status notification', hasData: true, revisions: [1, 2, 3] },
  // Time
  { mid: '0080', name: 'Read Time Upload Request', category: 'Time', direction: 'integrator', description: 'Read controller time', hasData: false },
  { mid: '0081', name: 'Read Time Upload Reply', category: 'Time', direction: 'controller', description: 'Controller time reply', hasData: true },
  { mid: '0082', name: 'Set Time', category: 'Time', direction: 'integrator', description: 'Set controller time', hasData: true },
  // Multi-spindle
  { mid: '0090', name: 'Multi-spindle Status Subscribe', category: 'Multi-spindle', direction: 'integrator', description: 'Subscribe to multi-spindle status', hasData: false },
  { mid: '0091', name: 'Multi-spindle Status', category: 'Multi-spindle', direction: 'controller', description: 'Multi-spindle status', hasData: true },
  { mid: '0100', name: 'Multi-spindle Result Subscribe', category: 'Multi-spindle', direction: 'integrator', description: 'Subscribe to multi-spindle result', hasData: false, revisions: [1, 2, 3, 4, 5, 6] },
  { mid: '0101', name: 'Multi-spindle Result', category: 'Multi-spindle', direction: 'controller', description: 'Multi-spindle tightening result', hasData: true, revisions: [1, 2, 3, 4, 5, 6] },
  // PowerMACS
  { mid: '0105', name: 'Last PowerMACS Result Subscribe', category: 'PowerMACS', direction: 'integrator', description: 'Subscribe to PowerMACS results', hasData: false },
  { mid: '0106', name: 'Last PowerMACS Result Station', category: 'PowerMACS', direction: 'controller', description: 'PowerMACS station result', hasData: true },
  { mid: '0107', name: 'Last PowerMACS Result Bolt', category: 'PowerMACS', direction: 'controller', description: 'PowerMACS bolt result', hasData: true },
  { mid: '0108', name: 'Last PowerMACS Ack', category: 'PowerMACS', direction: 'integrator', description: 'Acknowledge PowerMACS result', hasData: true },
  // I/O
  { mid: '0200', name: 'Set External Controlled Relays', category: 'I/O', direction: 'integrator', description: 'Set relay states', hasData: true },
  { mid: '0210', name: 'IO Status Subscribe', category: 'I/O', direction: 'integrator', description: 'Subscribe to IO status', hasData: false },
  { mid: '0211', name: 'IO Status', category: 'I/O', direction: 'controller', description: 'IO status notification', hasData: true },
  { mid: '0214', name: 'IO Device Status Request', category: 'I/O', direction: 'integrator', description: 'Request IO device status', hasData: true },
  { mid: '0215', name: 'IO Device Status Reply', category: 'I/O', direction: 'controller', description: 'IO device status reply', hasData: true, revisions: [1, 2] },
  { mid: '0217', name: 'Relay Function', category: 'I/O', direction: 'controller', description: 'Relay function notification', hasData: true },
  { mid: '0220', name: 'Digital Input Subscribe', category: 'I/O', direction: 'integrator', description: 'Subscribe to digital input changes', hasData: false },
  { mid: '0221', name: 'Digital Input Status', category: 'I/O', direction: 'controller', description: 'Digital input status notification', hasData: true },
  // Trace
  { mid: '0900', name: 'Trace Curve Data', category: 'Trace', direction: 'controller', description: 'Trace curve data message', hasData: true, revisions: [1, 2, 3] },
  { mid: '0901', name: 'Trace Curve Plot Parameters', category: 'Trace', direction: 'controller', description: 'Trace curve plot parameters', hasData: true, revisions: [1, 2, 3] },
];

const MID_CATALOG_MAP = new Map<string, MIDDefinition>();
for (const def of MID_CATALOG_ARRAY) {
  MID_CATALOG_MAP.set(def.mid, def);
}

export const MID_CATALOG = MID_CATALOG_MAP;

export function getMidDefinition(mid: string): MIDDefinition | undefined {
  return MID_CATALOG_MAP.get(mid);
}

export function getCategories(): string[] {
  const cats = new Set<string>();
  for (const def of MID_CATALOG_ARRAY) cats.add(def.category);
  return Array.from(cats);
}

export function getAllMids(): MIDDefinition[] {
  return [...MID_CATALOG_ARRAY];
}

export function buildDefaultDataField(mid: MIDDefinition): string {
  if (!mid.dataFields) return '';
  return mid.dataFields.map(f => (f.defaultValue ?? '').padEnd(f.length, ' ')).join('');
}
