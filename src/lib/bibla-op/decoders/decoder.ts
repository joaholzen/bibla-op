/**
 * biblaOp — Open Protocol Library
 * Main decoder logic
 */

import type { FieldDef, DecoderEntry, DecodedDataField, DecodedField, MidRevisionFieldSchema } from '../types/decoders';
import { parseParameterized, parseFlat } from './parsers';
import { communicationDecoderEntries } from './communication';
import { psetDecoderEntries } from './pset';
import { jobDecoderEntries } from './job';
import { toolDecoderEntries } from './tool';
import { tighteningDecoderEntries } from './tightening';
import { alarmDecoderEntries } from './alarm';
import { identifierDecoderEntries } from './identifiers';
import { ioDecoderEntries, decodeMID0215 } from './io';
import { traceDecoderEntries, decodeMid0900, decodeMid0901 } from './traces';
import { miscDecoderEntries } from './misc-fields';
import { parseVariableDataFields, decodeMID1201, decodeMID1202 } from './variable-data';
import { DESOUTTER_DECODER_MAP } from './vendor-desoutter';

const DECODER_MAP: Record<string, DecoderEntry> = {
  ...communicationDecoderEntries,
  ...psetDecoderEntries,
  ...jobDecoderEntries,
  ...toolDecoderEntries,
  ...tighteningDecoderEntries,
  ...alarmDecoderEntries,
  ...identifierDecoderEntries,
  ...ioDecoderEntries,
  ...traceDecoderEntries,
  ...miscDecoderEntries,
  ...DESOUTTER_DECODER_MAP,
};

const PID_MIDS = new Set([
  '0031', '0702', '0703', '0704', '1000', '1201', '1202', '1601', '1900', '1901', '2100', '2500', '2501', '2506',
]);

export function isPidBasedMid(mid: string): boolean {
  return PID_MIDS.has(mid);
}

function resolveFields(mid: string, revision: number): FieldDef[] | null {
  const entry = DECODER_MAP[mid];
  if (!entry) return null;
  if (Array.isArray(entry)) return entry;
  if (entry[revision]) return entry[revision];
  const revisions = Object.keys(entry).map(Number).sort((a, b) => a - b);
  for (let i = revisions.length - 1; i >= 0; i--) {
    if (revisions[i] <= revision) return entry[revisions[i]];
  }
  return entry[revisions[0]] || null;
}

export function getSupportedRevisions(mid: string): number[] | null {
  if (mid === '0031') return [1, 2];
  if (mid === '1201') return [1, 2, 3];
  if (mid === '1202') return [1, 2];
  const entry = DECODER_MAP[mid];
  if (!entry) return null;
  if (Array.isArray(entry)) return [1];
  return Object.keys(entry).map(Number).sort((a, b) => a - b);
}

function decodeMID0031(dataField: string, revision: number): DecodedDataField | null {
  if (!dataField) return null;
  const fields: DecodedField[] = [];
  const isRev2 = revision >= 2;
  const numLen = isRev2 ? 4 : 2;
  const idLen = isRev2 ? 4 : 2;
  const numJobsStr = dataField.substring(0, numLen);
  const numJobs = parseInt(numJobsStr) || 0;
  fields.push({ id: '01', label: 'Number of Jobs', value: numJobsStr.trim() });
  const jobIds: string[] = [];
  let pos = numLen;
  for (let i = 0; i < numJobs && pos + idLen <= dataField.length; i++) {
    const jobId = dataField.substring(pos, pos + idLen);
    jobIds.push(jobId.trim());
    pos += idLen;
  }
  if (jobIds.length > 0) fields.push({ id: '02', label: 'Job IDs', value: jobIds.join(', ') });
  return { fields, summary: `${numJobs} job(s): ${jobIds.join(', ')}`, revision };
}

export function decodeDataField(mid: string, dataField: string, revision: number = 0): DecodedDataField | null {
  if (mid === '0031') return decodeMID0031(dataField, revision);
  if (mid === '0215') return decodeMID0215(dataField, revision);
  if (mid === '1201') return decodeMID1201(dataField, revision);
  if (mid === '1202') return decodeMID1202(dataField, revision);
  if (mid === '0900') return decodeMid0900(dataField, revision);
  if (mid === '0901') return decodeMid0901(dataField, revision);

  if (PID_MIDS.has(mid) && dataField) {
    const numFields = parseInt(dataField.substring(0, 3)) || 0;
    if (numFields > 0) {
      const fields = parseVariableDataFields(dataField.substring(3));
      if (fields.length > 0) return { fields, revision };
    }
    return null;
  }

  const fieldDefs = resolveFields(mid, revision);
  if (!fieldDefs || !dataField) return null;

  const flatMids = new Set(['0200', '0224', '0225', '0004', '0005', '9998', '0050', '0110', '0262', '0404', '0411', '0082', '0104', '0064', '0108', '0504', '0046', '0214', '0240', '0242']);
  const isFlatFormat = ((mid === '0061' || mid === '0065') && revision === 999) || flatMids.has(mid);
  const fields = isFlatFormat ? parseFlat(dataField, fieldDefs) : parseParameterized(dataField, fieldDefs);
  if (fields.length === 0) return null;

  if ((mid === '0061' || mid === '0065') && revision === 998) {
    const numStageResults = parseInt(fields.find(f => f.id === '57')?.value ?? '0') || 0;
    if (numStageResults > 0) {
      const field57 = fields.find(f => f.id === '57');
      if (field57) {
        const f57Marker = dataField.lastIndexOf('57');
        if (f57Marker >= 0) {
          let pos = f57Marker + 2 + 2;
          for (let i = 0; i < numStageResults; i++) {
            if (pos + 2 + 11 <= dataField.length && dataField.substring(pos, pos + 2) === '58') {
              const stageTorque = dataField.substring(pos + 2, pos + 8);
              const stageAngle = dataField.substring(pos + 8, pos + 13);
              fields.push({
                id: `58-${i + 1}`,
                label: `Stage ${i + 1} Result`,
                value: `${parseFloat(stageTorque).toFixed(2)} Nm / ${parseInt(stageAngle, 10)}°`,
              });
              pos += 13;
            }
          }
        }
      }
    }
  }

  let summary: string | undefined;
  if (mid === '0061' || mid === '0065') {
    const unitField = fields.find(f => f.label === 'Torque Values Unit');
    const actualUnit = unitField?.value && unitField.value !== 'Nm' ? unitField.value : 'Nm';
    if (actualUnit !== 'Nm') { for (const f of fields) { if (f.unit === 'Nm') f.unit = actualUnit; } }
    const statusField = fields.find(f => f.label === 'Tightening Status');
    const torqueField = fields.find(f => f.label === 'Final Torque');
    const angleField = fields.find(f => f.label === 'Final Angle');
    const tidField = fields.find(f => f.label === 'Tightening ID');
    if (statusField && torqueField) summary = `${statusField.value} — ${torqueField.value} ${actualUnit} / ${angleField?.value ?? '?'}° (ID: ${tidField?.value ?? '?'})`;
  } else if (mid === '0041') {
    const model = fields.find(f => f.label === 'Tool Model');
    const serial = fields.find(f => f.label === 'Tool Serial Number');
    if (model || serial) summary = `${model?.value ?? 'Unknown'} (S/N: ${serial?.value ?? '?'})`;
  } else if (mid === '0002') {
    const name = fields.find(f => f.label === 'Controller Name');
    const sw = fields.find(f => f.label === 'Software Version');
    if (name) summary = `${name.value}${sw ? ` — v${sw.value}` : ''}`;
  } else if (mid === '0217') {
    const num = fields.find(f => f.label === 'Relay Number');
    const st = fields.find(f => f.label === 'Relay State');
    if (num && st) summary = `Relay #${num.value} → ${st.value}`;
  } else if (mid === '0221') {
    const num = fields.find(f => f.label === 'Digital Input Number');
    const st = fields.find(f => f.label === 'Digital Input Status');
    if (num && st) summary = `DigIn #${num.value} → ${st.value}`;
  } else if (mid === '0200') {
    summary = `Relays: ${fields.map(f => f.value).join(', ')}`;
  }

  return { fields, summary, revision };
}

export function hasDecoder(mid: string): boolean {
  return mid in DECODER_MAP || mid === '0031' || mid === '1201' || mid === '1202';
}

function schemaFromEntry(entry: DecoderEntry, mid: string): MidRevisionFieldSchema[] {
  const flatMids = new Set(['0200', '0224', '0225', '0004', '0005', '9998', '0050', '0110', '0262', '0404', '0411', '0082', '0104', '0064', '0108', '0504', '0046', '0214', '0240', '0242']);
  if (Array.isArray(entry)) {
    const format = flatMids.has(mid) ? 'flat' : 'parameterized';
    return [{ revision: 1, format, fields: entry.map(f => ({ id: f.id, label: f.label, length: f.length, unit: f.unit })) }];
  }
  return Object.entries(entry).map(([rev, defs]) => {
    const r = Number(rev);
    let format: 'parameterized' | 'flat' | 'pid' = 'parameterized';
    if (flatMids.has(mid) || ((mid === '0061' || mid === '0065') && r === 999)) format = 'flat';
    return { revision: r, format, fields: (defs as FieldDef[]).map(f => ({ id: f.id, label: f.label, length: f.length, unit: f.unit })) };
  }).sort((a, b) => a.revision - b.revision);
}

export function getMidRevisionSchemas(mid: string): MidRevisionFieldSchema[] | null {
  const entry = DECODER_MAP[mid];
  if (!entry) return null;
  return schemaFromEntry(entry, mid);
}

export type UnifiedSchemas = {
  standard: Record<string, MidRevisionFieldSchema[]>;
  mpro: Record<string, MidRevisionFieldSchema[]>;
  bosch: Record<string, MidRevisionFieldSchema[]>;
  nexo: Record<string, MidRevisionFieldSchema[]>;
  alpha: Record<string, MidRevisionFieldSchema[]>;
};

export function getUnifiedSchemas(): UnifiedSchemas {
  const standard: Record<string, MidRevisionFieldSchema[]> = {};
  for (const [mid, entry] of Object.entries(DECODER_MAP)) {
    standard[mid] = schemaFromEntry(entry, mid);
  }

  const buildMap = (map: Record<string, DecoderEntry>) => {
    const result: Record<string, MidRevisionFieldSchema[]> = {};
    for (const [mid, entry] of Object.entries(map)) {
      result[mid] = schemaFromEntry(entry, mid);
    }
    return result;
  };

  // Import vendor maps lazily to avoid circular deps at module level
  const { MPRO_DECODER_MAP } = require('./vendor-mpro');
  const { BOSCH_DECODER_MAP } = require('./vendor-bosch');
  const { NEXO_DECODER_MAP } = require('./vendor-nexo');
  const { ALPHA_DECODER_MAP } = require('./vendor-alpha');

  return {
    standard,
    mpro: buildMap(MPRO_DECODER_MAP),
    bosch: buildMap(BOSCH_DECODER_MAP),
    nexo: buildMap(NEXO_DECODER_MAP),
    alpha: buildMap(ALPHA_DECODER_MAP),
  };
}
