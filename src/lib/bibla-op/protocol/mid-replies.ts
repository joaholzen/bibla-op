/**
 * biblaOp — Open Protocol Library
 * Reply MID derivation logic.
 *
 * Given a MID definition, determines which MID(s) a controller would
 * send in response. Uses explicit overrides for well-known pairs,
 * then falls back to sequential MID number heuristics.
 */

import type { MIDDefinition } from '../types/mid-catalog';

/** Explicit reply mappings for MIDs that don't follow standard patterns */
const MID_REPLY_OVERRIDES: Record<string, string[]> = {
  '0001': ['0002', '0004'],
  '0003': [],
  '0006': ['(requested MID)', '0004'],
  '0008': ['0005', '0004'],
  '0009': ['0005', '0004'],
  '0105': ['0106', '0107'],
  '0106': ['0108'],
  '0107': [],
  '0108': ['0107'],
  '0120': ['0005', '0004'],
  '0121': ['0125'], '0122': ['0125'], '0123': ['0125'], '0124': ['0125'],
  '1201': ['1203'], '1202': ['1203'],
  '1601': ['1602'],
  '9997': [], '9998': [], '9999': [],
};

export interface ReplyMidInfo {
  mid: string;
  name: string;
}

/**
 * Determine expected reply MID(s) for a given MID.
 * Checks overrides first, then uses direction and naming conventions
 * to infer the reply (e.g. request → reply, notification → ack).
 */
export function getReplyMids(mid: MIDDefinition, allMids: MIDDefinition[]): ReplyMidInfo[] {
  const overrides = MID_REPLY_OVERRIDES[mid.mid];
  if (overrides !== undefined) {
    return overrides.map(r => {
      if (r.startsWith('(')) return { mid: r, name: '' };
      const found = allMids.find(m => m.mid === r);
      return { mid: r, name: found?.name ?? '' };
    });
  }
  
  const midNum = parseInt(mid.mid);
  const nextMid = allMids.find(m => parseInt(m.mid) === midNum + 1);
  
  // Integrator → controller: expect next MID if it's a reply/data type
  if (mid.direction === 'integrator') {
    if (nextMid && nextMid.direction === 'controller' && 
        (nextMid.name.includes('Reply') || nextMid.name.includes('Upload') || nextMid.name.includes('Result') || nextMid.name.includes('Status') || nextMid.name.includes('Info'))) {
      if (!mid.name.includes('Subscribe') && !mid.name.includes('Unsubscribe')) {
        return [{ mid: nextMid.mid, name: nextMid.name }];
      }
    }
    // Default: expect ACK or NACK
    const mid5 = allMids.find(m => m.mid === '0005');
    const mid4 = allMids.find(m => m.mid === '0004');
    return [
      { mid: '0005', name: mid5?.name ?? 'Positive Acknowledge' },
      { mid: '0004', name: mid4?.name ?? 'Negative Acknowledge' },
    ];
  }
  
  // Controller → integrator: expect next MID if it's an ACK
  if (mid.direction === 'controller') {
    if (nextMid && nextMid.direction === 'integrator' && 
        (nextMid.name.includes('Ack') || nextMid.name.includes('Acknowledge'))) {
      return [{ mid: nextMid.mid, name: nextMid.name }];
    }
    return [];
  }
  
  return [];
}
