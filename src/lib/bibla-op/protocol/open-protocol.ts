/**
 * biblaOp — Open Protocol Library
 * Core message builder and parser
 */

import type { OpenProtocolMessage } from '../types/protocol';

export function buildMessage(
  mid: string,
  revision: string = '   ',
  dataField: string = '',
  options: {
    noAck?: string;
    stationId?: string;
    spindleId?: string;
    sequenceNumber?: string;
    messageParts?: string;
    messagePartNumber?: string;
  } = {}
): string {
  const {
    noAck = ' ',
    stationId = '  ',
    spindleId = '  ',
    sequenceNumber = '  ',
    messageParts = ' ',
    messagePartNumber = ' ',
  } = options;

  const header = mid.padStart(4, '0') +
    revision.padStart(3, ' ') +
    noAck +
    stationId.padStart(2, ' ') +
    spindleId.padStart(2, ' ') +
    sequenceNumber.padStart(2, ' ') +
    messageParts +
    messagePartNumber;

  const totalLength = (20 + dataField.length).toString().padStart(4, '0');
  return totalLength + header + dataField + '\0';
}

export function parseMessage(raw: string): OpenProtocolMessage {
  const cleaned = raw.replace(/\0$/, '');
  return {
    length: cleaned.substring(0, 4),
    mid: cleaned.substring(4, 8),
    revision: cleaned.substring(8, 11),
    noAck: cleaned.substring(11, 12),
    stationId: cleaned.substring(12, 14),
    spindleId: cleaned.substring(14, 16),
    sequenceNumber: cleaned.substring(16, 18),
    messageParts: cleaned.substring(18, 19),
    messagePartNumber: cleaned.substring(19, 20),
    dataField: cleaned.substring(20),
    raw: raw,
  };
}

export function formatRawMessage(raw: string): string {
  return raw.replace(/\0/g, '\\0');
}
