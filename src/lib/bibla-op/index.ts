/**
 * biblaOp — Open Protocol Library
 * Public API
 */

// Core protocol
export { buildMessage, parseMessage, formatRawMessage } from './protocol/open-protocol';

// Convenience builders & config
export {
  buildCommStart,
  buildCommStop,
  buildKeepAlive,
  buildPositiveAck,
  buildNegativeAck,
  createDefaultConfig,
} from './protocol/convenience';
export type { BiblaOpConfig } from './protocol/convenience';

// MID catalog
export { MID_CATALOG, getMidDefinition, getCategories, getAllMids, buildDefaultDataField } from './protocol/mid-catalog';

// Protocol constants
export { RELAY_FUNCTION_OPTIONS, DIGITAL_INPUT_OPTIONS, ERROR_CODES } from './protocol/protocol-constants';

// Reply mapping
export { getExpectedReply } from './protocol/mid-replies';

// Alarm codes
export { getAlarmDescription } from './protocol/alarm-codes';

// Torque units
export { convertTorque, TORQUE_UNITS } from './protocol/torque-units';

// Decoders
export {
  decodeDataField,
  hasDecoder,
  getSupportedRevisions,
  isPidBasedMid,
  getMidRevisionSchemas,
  getUnifiedSchemas,
  parseVariableDataFields,
} from './decoders';

// Types
export type {
  OpenProtocolMessage,
  MessageLogEntry,
} from './types/protocol';

export type {
  MIDDefinition,
  DataField,
} from './types/mid-catalog';

export type {
  DecodedField,
  DecodedDataField,
  FieldDef,
  MidRevisionFieldSchema,
  DecoderEntry,
} from './types/decoders';

export type { UnifiedSchemas } from './decoders';
