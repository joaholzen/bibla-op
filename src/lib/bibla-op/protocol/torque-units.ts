/**
 * biblaOp — Open Protocol Library
 * Torque unit definitions and conversion utilities.
 *
 * Supports 11 torque units with conversion factors relative to Nm.
 * Includes alias resolution (e.g. "ft lbf" → "ft·lbf") and
 * display-ready formatting with appropriate decimal precision.
 */

export type TorqueDisplayUnit = 'Nm' | 'cNm' | 'dNm' | 'mNm' | 'kNm' | 'ft·lbf' | 'in·lbf' | 'kgf·cm' | 'gf·cm' | 'ft·ozf' | 'Kpm';

export interface TorqueUnitDef {
  value: TorqueDisplayUnit;
  label: string;
  description: string;
  /** Multiply Nm by this factor to get the target unit */
  fromNm: number;
  /** Open Protocol unit code */
  opCode: string;
}

/** All supported torque units with conversion factors from Nm */
export const TORQUE_UNITS: TorqueUnitDef[] = [
  { value: 'Nm',     label: 'N·m',      description: 'Newton meter',               fromNm: 1,           opCode: '001' },
  { value: 'cNm',    label: 'cN·m',     description: 'Centi Newton meter',         fromNm: 100,         opCode: '003' },
  { value: 'dNm',    label: 'dN·m',     description: 'Deci Newton meter',          fromNm: 10,          opCode: '011' },
  { value: 'mNm',    label: 'mN·m',     description: 'Milli Newton meter',         fromNm: 1000,        opCode: '012' },
  { value: 'kNm',    label: 'kN·m',     description: 'Kilo Newton meter',          fromNm: 0.001,       opCode: '004' },
  { value: 'ft·lbf', label: 'ft·lbf',   description: 'Foot-pound force',           fromNm: 0.7375621,   opCode: '002' },
  { value: 'in·lbf', label: 'in·lbf',   description: 'Inch-pound force',           fromNm: 8.8507457,   opCode: '006' },
  { value: 'kgf·cm', label: 'kgf·cm',   description: 'Kilogram force centimeter',  fromNm: 10.19716213, opCode: '013' },
  { value: 'gf·cm',  label: 'gf·cm',    description: 'Gram force centimeter',      fromNm: 10197.16213, opCode: '014' },
  { value: 'ft·ozf', label: 'ft·ozf',   description: 'Ounce force foot',           fromNm: 11.80099,    opCode: '015' },
  { value: 'Kpm',    label: 'Kpm',      description: 'Kilo pound meter',           fromNm: 0.1019716,   opCode: '007' },
];

/** Set of all recognized torque unit strings (for validation) */
export const TORQUE_UNIT_STRINGS = new Set(['Nm', 'N·m', 'cNm', 'cN·m', 'dNm', 'dN·m', 'mNm', 'mN·m', 'kNm', 'kN·m', 'ft·lbf', 'in·lbf', 'kgf·cm', 'gf·cm', 'ft·ozf', 'Kpm']);

/** Map of common unit string variants to canonical unit names */
const UNIT_ALIASES: Record<string, TorqueDisplayUnit> = {
  'Nm': 'Nm', 'N·m': 'Nm',
  'cNm': 'cNm', 'cN·m': 'cNm', 'Ncm': 'cNm',
  'dNm': 'dNm', 'dN·m': 'dNm',
  'mNm': 'mNm', 'mN·m': 'mNm',
  'kNm': 'kNm', 'kN·m': 'kNm',
  'ft·lbf': 'ft·lbf', 'ft lbf': 'ft·lbf', 'Lbf.ft': 'ft·lbf',
  'in·lbf': 'in·lbf', 'in lbf': 'in·lbf', 'Lbf.In': 'in·lbf',
  'kgf·cm': 'kgf·cm', 'kgf.cm': 'kgf·cm', 'Kgf.cm': 'kgf·cm',
  'gf·cm': 'gf·cm', 'gf.cm': 'gf·cm',
  'ft·ozf': 'ft·ozf', 'ft ozf': 'ft·ozf',
  'Kpm': 'Kpm',
};

/** Get the unit definition for a given canonical unit */
function getUnitDef(unit: TorqueDisplayUnit): TorqueUnitDef {
  return TORQUE_UNITS.find(u => u.value === unit) || TORQUE_UNITS[0];
}

/** Resolve a string (possibly an alias) to a canonical TorqueDisplayUnit */
export function resolveTorqueUnit(unit?: string): TorqueDisplayUnit {
  if (!unit) return 'Nm';
  return UNIT_ALIASES[unit.trim()] || 'Nm';
}

/** Convert a torque value between two units */
export function convertTorque(value: number, from: TorqueDisplayUnit, to: TorqueDisplayUnit): number {
  if (from === to) return value;
  const fromDef = getUnitDef(from);
  const toDef = getUnitDef(to);
  const inNm = value / fromDef.fromNm;
  return inNm * toDef.fromNm;
}

/** Convert and format a torque value for display, with adaptive decimal precision */
export function convertTorqueForDisplay(
  valueStr: string,
  sourceUnit: TorqueDisplayUnit,
  displayUnit: TorqueDisplayUnit,
): { value: string; unit: TorqueDisplayUnit } {
  const num = parseFloat(valueStr);
  if (isNaN(num)) return { value: valueStr, unit: sourceUnit };
  const converted = sourceUnit === displayUnit ? num : convertTorque(num, sourceUnit, displayUnit);
  // Adaptive precision: fewer decimals for large values, more for small
  const formatted = Math.abs(converted) >= 100 ? converted.toFixed(1)
    : Math.abs(converted) >= 1 ? converted.toFixed(2)
    : Math.abs(converted) >= 0.01 ? converted.toFixed(4)
    : converted.toFixed(6);
  const trimmed = formatted.includes('.') ? formatted.replace(/0+$/, '').replace(/\.$/, '') : formatted;
  return { value: trimmed, unit: displayUnit };
}
