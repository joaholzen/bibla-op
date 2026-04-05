/**
 * biblaOp — Open Protocol Library
 * Decoder type definitions
 */

export interface DecodedField {
  id: string;
  label: string;
  value: string;
  unit?: string;
  status?: 'ok' | 'nok' | 'info';
}

export interface DecodedDataField {
  fields: DecodedField[];
  summary?: string;
  revision?: number;
  jsonPayload?: string;
}

export interface FieldDef {
  id: string;
  label: string;
  length: number;
  unit?: string;
  transform?: (raw: string) => string;
  statusFn?: (raw: string) => 'ok' | 'nok' | 'info' | undefined;
}

export interface MidRevisionFieldSchema {
  revision: number;
  format: 'parameterized' | 'flat' | 'pid';
  fields: Array<{
    id: string;
    label: string;
    length: number;
    unit?: string;
  }>;
}

export type DecoderEntry = FieldDef[] | Record<number, FieldDef[]>;
