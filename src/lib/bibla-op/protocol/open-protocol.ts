/**
 * biblaOp — Open Protocol Library
 * Core message builder and parser.
 *
 * Open Protocol messages have a fixed 20-byte header followed by a variable-length
 * data field and a NUL terminator. The header contains: length (4), MID (4),
 * revision (3), noAck (1), stationId (2), spindleId (2), sequenceNumber (2),
 * messageParts (1), messagePartNumber (1).
 */

import type { OpenProtocolMessage } from '../types/protocol';

/**
 * Build a raw Open Protocol message string from components.
 * Automatically calculates and prepends the 4-digit total length.
 */
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

  // Assemble header: MID + revision + flags (without length prefix)
  const header = mid.padStart(4, '0') +
    revision.padStart(3, ' ') +
    noAck +
    stationId.padStart(2, ' ') +
    spindleId.padStart(2, ' ') +
    sequenceNumber.padStart(2, ' ') +
    messageParts +
    messagePartNumber;

  // Total length = 20 (header with length) + data field length
  const totalLength = (20 + dataField.length).toString().padStart(4, '0');
  return totalLength + header + dataField + '\0';
}

/**
 * Parse a raw Open Protocol message string into its component fields.
 * Strips the trailing NUL terminator before extracting fixed-position fields.
 */
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

/** Format a raw message for display by escaping NUL characters */
export function formatRawMessage(raw: string): string {
  return raw.replace(/\0/g, '\\0');
}
