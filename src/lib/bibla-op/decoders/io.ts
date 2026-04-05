/**
 * biblaOp — Open Protocol Library
 * I/O MID field definitions: MID 0200-0225
 *
 * Handles relay outputs and digital input status messages,
 * including the complex MID 0215 (IO device status) with its
 * relay/digital-input list parsing across revisions.
 */

import type { FieldDef, DecoderEntry, DecodedDataField, DecodedField } from '../types/decoders';
import { RELAY_FUNCTION_OPTIONS, DIGITAL_INPUT_OPTIONS } from '../protocol/protocol-constants';

/** Relay state code to label mapping */
const RELAY_STATE_LABELS: Record<string, string> = { '0': 'Off', '1': 'On', '2': 'Flash', '3': 'Keep' };
const transformRelayState = (raw: string): string => RELAY_STATE_LABELS[raw.trim()] ?? raw.trim();
const relayStatusFn = (raw: string): 'ok' | 'nok' | 'info' | undefined => raw.trim() === '1' ? 'ok' : raw.trim() === '0' ? undefined : 'info';

/** MID 0200: Set External Controlled Relays — 10 relay states (flat format) */
const MID_0200_FIELDS: FieldDef[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1).padStart(2, '0'),
  label: `Relay ${i + 1} (#${93 + i})`,
  length: 1,
  transform: transformRelayState,
  statusFn: relayStatusFn,
}));

/** MID 0211: Digital Input Status — 8 digital input states */
const MID_0211_FIELDS: FieldDef[] = Array.from({ length: 8 }, (_, i) => ({
  id: String(i + 1).padStart(2, '0'),
  label: `Status Dig In ${i + 1}`,
  length: 1,
  transform: (r: string) => r === '1' ? 'High' : 'Low',
}));

const MID_0214_FIELDS: FieldDef[] = [{ id: '01', label: 'IO Device ID', length: 3 }];

/** MID 0217: Relay Function notification — relay number + state */
const MID_0217_FIELDS: FieldDef[] = [
  { id: '01', label: 'Relay Number', length: 3 },
  { id: '02', label: 'Relay State', length: 1, transform: transformRelayState, statusFn: relayStatusFn },
];

/** MID 0221: Digital Input Status notification */
const MID_0221_FIELDS: FieldDef[] = [
  { id: '01', label: 'Digital Input Number', length: 3 },
  { id: '02', label: 'Digital Input Status', length: 1, transform: (r) => r === '1' ? 'High (Set)' : 'Low (Reset)', statusFn: (r) => r === '1' ? 'ok' : undefined },
];

const MID_0224_FIELDS: FieldDef[] = [{ id: '01', label: 'Digital Input Number', length: 3 }];
const MID_0225_FIELDS: FieldDef[] = [{ id: '01', label: 'Digital Input Number', length: 3 }];

/** Lookup maps for relay/digital-input function names from protocol constants */
const relayLabelMap = new Map(RELAY_FUNCTION_OPTIONS.map(o => [o.value, o.label.replace(/^\d+\s*[-–—]\s*/, '')]));
const diginLabelMap = new Map(DIGITAL_INPUT_OPTIONS.map(o => [o.value, o.label.replace(/^\d+\s*[-–—]\s*/, '')]));

/**
 * Parse a list of relay or digital input entries.
 * Each entry is 4 chars: 3-digit function number + 1-digit status.
 */
function parseIOList(data: string, count: number, type: 'relay' | 'digin'): DecodedField[] {
  const fields: DecodedField[] = [];
  const labelMap = type === 'relay' ? relayLabelMap : diginLabelMap;
  const statusLabel = type === 'relay'
    ? (s: string) => s === '0' ? 'Reset' : s === '1' ? 'Set' : s
    : (s: string) => s === '0' ? 'Low' : s === '1' ? 'High' : s;
  const statusFn = (s: string): 'ok' | 'nok' | undefined => s === '1' ? 'ok' : undefined;

  for (let i = 0; i < count && (i * 4 + 4) <= data.length; i++) {
    const funcNum = data.substring(i * 4, i * 4 + 3);
    const status = data.substring(i * 4 + 3, i * 4 + 4);
    const funcName = labelMap.get(funcNum) ?? `Unknown (${funcNum})`;
    const typeLabel = type === 'relay' ? 'Relay' : 'DigIn';
    fields.push({
      id: String(i + 1).padStart(2, '0'),
      label: `${typeLabel} #${funcNum} ${funcName}`,
      value: statusLabel(status),
      status: statusFn(status),
    });
  }
  return fields;
}

/**
 * Custom decoder for MID 0215 (IO Device Status Reply).
 * Rev 1: fixed 8 relays + 8 digital inputs per device.
 * Rev 2+: variable counts with explicit relay/digin count fields.
 */
export function decodeMID0215(dataField: string, revision: number): DecodedDataField | null {
  if (!dataField) return null;
  const fields: DecodedField[] = [];

  if (revision <= 1) {
    // Rev 1: fixed-format — device ID + 8 relays + 8 digital inputs
    let pos = 0;
    if (dataField.substring(pos, pos + 2) === '01') pos += 2;
    const deviceId = dataField.substring(pos, pos + 2);
    fields.push({ id: '01', label: 'IO Device ID', value: deviceId.trim() });
    pos += 2;

    if (dataField.substring(pos, pos + 2) === '02') pos += 2;
    const relayData = dataField.substring(pos, pos + 32);
    pos += 32;
    const relayFields = parseIOList(relayData, 8, 'relay');

    if (dataField.substring(pos, pos + 2) === '03') pos += 2;
    const diginData = dataField.substring(pos, pos + 32);
    const diginFields = parseIOList(diginData, 8, 'digin');

    fields.push(...relayFields, ...diginFields);
    const activeRelays = relayFields.filter(f => f.value === 'Set').length;
    const activeDigins = diginFields.filter(f => f.value === 'High').length;
    return {
      fields,
      summary: `Device ${deviceId.trim()}: ${activeRelays} relay(s) set, ${activeDigins} input(s) high`,
      revision,
    };
  }

  // Rev 2+: variable-length relay and digital input lists
  let pos = 0;
  if (dataField.substring(pos, pos + 2) === '01') pos += 2;
  const deviceId = dataField.substring(pos, pos + 2);
  fields.push({ id: '01', label: 'IO Device ID', value: deviceId.trim() });
  pos += 2;

  if (dataField.substring(pos, pos + 2) === '02') pos += 2;
  const numRelays = parseInt(dataField.substring(pos, pos + 2)) || 0;
  fields.push({ id: '02', label: 'Number of Relays', value: String(numRelays) });
  pos += 2;

  if (dataField.substring(pos, pos + 2) === '03') pos += 2;
  const relayListLen = numRelays * 4;
  const relayData = dataField.substring(pos, pos + relayListLen);
  pos += relayListLen;
  const relayFields = parseIOList(relayData, numRelays, 'relay');

  if (dataField.substring(pos, pos + 2) === '04') pos += 2;
  const numDigins = parseInt(dataField.substring(pos, pos + 2)) || 0;
  fields.push({ id: '04', label: 'Number of Digital Inputs', value: String(numDigins) });
  pos += 2;

  if (dataField.substring(pos, pos + 2) === '05') pos += 2;
  const diginData = dataField.substring(pos, pos + numDigins * 4);
  const diginFields = parseIOList(diginData, numDigins, 'digin');

  fields.push(...relayFields, ...diginFields);
  const activeRelays = relayFields.filter(f => f.value === 'Set').length;
  const activeDigins = diginFields.filter(f => f.value === 'High').length;
  return {
    fields,
    summary: `Device ${deviceId.trim()}: ${numRelays} relays (${activeRelays} set), ${numDigins} inputs (${activeDigins} high)`,
    revision,
  };
}

/** All I/O decoder entries keyed by MID number */
export const ioDecoderEntries: Record<string, DecoderEntry> = {
  '0200': MID_0200_FIELDS,
  '0211': MID_0211_FIELDS,
  '0214': MID_0214_FIELDS,
  '0217': MID_0217_FIELDS,
  '0221': MID_0221_FIELDS,
  '0224': MID_0224_FIELDS,
  '0225': MID_0225_FIELDS,
};
