/**
 * biblaOp — Open Protocol Library
 * Controller alarm/event code lookups
 */

export const CONTROLLER_ID_PF4000 = 'pf4000' as const;
export const CONTROLLER_ID_PF6000 = 'pf6000' as const;
export const CONTROLLER_ID_IXB = 'ixb' as const;
export const CONTROLLER_ID_FLEX = 'flex' as const;
export const CONTROLLER_ID_MPRO = 'mpro' as const;
export const CONTROLLER_ID_BS350 = 'rexroth-bs350' as const;
export const CONTROLLER_ID_NEXO = 'nexo' as const;
export const CONTROLLER_ID_PF8 = 'pf8' as const;
export const CONTROLLER_ID_PFXC = 'pfxc' as const;

export type EventType = 'Info' | 'Warning' | 'Error';

export interface EventCodeEntry {
  name: string;
  type: EventType;
  availableFor: ReadonlySet<string>;
}

function avail(...ids: string[]): ReadonlySet<string> {
  return new Set(ids);
}

const pf6 = CONTROLLER_ID_PF6000;
const pf8 = CONTROLLER_ID_PF8;
const ixb = CONTROLLER_ID_IXB;
const flex = CONTROLLER_ID_FLEX;
const pfxc = CONTROLLER_ID_PFXC;

export const PF6_EVENT_CODES: Record<string, EventCodeEntry> = {
  '1000': { name: 'Controller Started', type: 'Info', availableFor: avail(flex, ixb, pf6, pf8, pfxc) },
  '1010': { name: 'Tool Connected', type: 'Info', availableFor: avail(flex, pf6, pf8, pfxc) },
  '1011': { name: 'Tool Disconnected', type: 'Info', availableFor: avail(flex, pf6, pf8, pfxc) },
  '2000': { name: 'Battery Low', type: 'Warning', availableFor: avail(ixb, pf6, pf8, pfxc) },
  '2001': { name: 'Battery Empty', type: 'Warning', availableFor: avail(ixb, pf6, pf8, pfxc) },
  '2010': { name: 'Tool Software Version Mismatch', type: 'Error', availableFor: avail(flex, ixb, pf6, pf8, pfxc) },
  '2014': { name: 'Tool Overheated', type: 'Warning', availableFor: avail(flex, ixb, pf6, pf8, pfxc) },
  '2020': { name: 'Tool Requires Motor Tuning', type: 'Warning', availableFor: avail(flex, ixb, pf6, pf8, pfxc) },
  '2030': { name: 'Tool Memory Failure: Change Tool', type: 'Error', availableFor: avail(flex, ixb, pf6, pf8, pfxc) },
  '2040': { name: 'System Check Failure', type: 'Error', availableFor: avail(flex, ixb, pf6, pf8, pfxc) },
  '2041': { name: 'Torque Transducer Error', type: 'Error', availableFor: avail(flex, ixb, pf6, pf8, pfxc) },
  '2042': { name: 'Angle Transducer Error', type: 'Error', availableFor: avail(flex, ixb, pf6, pf8, pfxc) },
  '2044': { name: 'Tool Service Interval Expired', type: 'Info', availableFor: avail(flex, ixb, pf6, pf8, pfxc) },
  '3000': { name: 'Controller Internal Software Error', type: 'Error', availableFor: avail(ixb, pf6, pf8, pfxc) },
  '3010': { name: 'System Overheated', type: 'Warning', availableFor: avail(pf6, pf8, pfxc) },
  '3020': { name: 'Controller Hardware Failure', type: 'Warning', availableFor: avail(flex, ixb, pf6, pf8, pfxc) },
  '3030': { name: 'System Voltage Error', type: 'Warning', availableFor: avail(flex, ixb, pf6, pf8, pfxc) },
  '3040': { name: 'Network Cable Unplugged', type: 'Info', availableFor: avail(flex, pf6, pf8, pfxc) },
  '3048': { name: 'Emergency Stop', type: 'Warning', availableFor: avail(flex, pf6, pf8, pfxc) },
  '3050': { name: 'System Clock Updated', type: 'Info', availableFor: avail(flex, ixb, pf6, pf8, pfxc) },
  '4010': { name: 'Tightening NOK', type: 'Info', availableFor: avail(flex, ixb, pf6, pf8, pfxc) },
  '4011': { name: 'Torque High', type: 'Info', availableFor: avail(flex, ixb, pf6, pf8, pfxc) },
  '4012': { name: 'Torque Low', type: 'Info', availableFor: avail(flex, ixb, pf6, pf8, pfxc) },
  '4013': { name: 'Angle High', type: 'Info', availableFor: avail(flex, ixb, pf6, pf8, pfxc) },
  '4014': { name: 'Angle Low', type: 'Info', availableFor: avail(flex, ixb, pf6, pf8, pfxc) },
};

export function lookupAlarmCode(code: string, _controllerTypeId?: string): string | undefined {
  const normalizedCode = code.startsWith('E') ? code : `E${code}`;
  const numericCode = normalizedCode.replace('E', '');
  const entry = PF6_EVENT_CODES[numericCode];
  if (entry) return entry.name;
  return undefined;
}
