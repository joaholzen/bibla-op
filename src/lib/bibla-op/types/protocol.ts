/**
 * biblaOp — Open Protocol Library
 * Core protocol type definitions
 */

export interface OpenProtocolMessage {
  length: string;
  mid: string;
  revision: string;
  noAck: string;
  stationId: string;
  spindleId: string;
  sequenceNumber: string;
  messageParts: string;
  messagePartNumber: string;
  dataField: string;
  raw: string;
}

export interface MessageLogEntry {
  id: string;
  timestamp: Date;
  direction: 'sent' | 'received';
  message: OpenProtocolMessage;
  raw: string;
}
