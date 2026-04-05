/**
 * biblaOp — Open Protocol Library
 * Pre-built convenience message builders and connection configuration.
 *
 * Provides ready-to-use functions for the most common Open Protocol messages:
 * Communication Start/Stop, Keep Alive, and Positive/Negative Acknowledge.
 */

import { buildMessage } from './open-protocol';

/** Connection and protocol configuration */
export interface BiblaOpConfig {
  /** Controller IP address (e.g. "192.168.1.100") */
  host: string;
  /** Controller Open Protocol port (default: 4545) */
  port: number;
  /** Keep-alive interval in milliseconds (default: 10000) */
  keepAliveIntervalMs: number;
  /** Communication Start revision: '001' through '008' (default: '001') */
  commStartRevision: string;
}

/** Returns a BiblaOpConfig with sensible defaults, optionally overridden */
export function createDefaultConfig(overrides?: Partial<BiblaOpConfig>): BiblaOpConfig {
  return {
    host: '127.0.0.1',
    port: 4545,
    keepAliveIntervalMs: 10000,
    commStartRevision: '001',
    ...overrides,
  };
}

/** Build MID 0001 — Communication Start */
export function buildCommStart(revision: string = '001'): string {
  return buildMessage('0001', revision);
}

/** Build MID 0003 — Communication Stop */
export function buildCommStop(): string {
  return buildMessage('0003');
}

/** Build MID 9999 — Keep Alive */
export function buildKeepAlive(): string {
  return buildMessage('9999');
}

/** Build MID 0005 — Positive Acknowledge for a given MID */
export function buildPositiveAck(midToAck: string): string {
  return buildMessage('0005', '   ', midToAck.padStart(4, '0'));
}

/** Build MID 0004 — Negative Acknowledge for a given MID with error code */
export function buildNegativeAck(midToNack: string, errorCode: string = '00'): string {
  return buildMessage('0004', '   ', midToNack.padStart(4, '0') + errorCode.padStart(2, '0'));
}
