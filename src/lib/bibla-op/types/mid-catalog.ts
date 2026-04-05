/**
 * biblaOp — Open Protocol Library
 * MID catalog type definitions
 */

export interface MIDDefinition {
  mid: string;
  name: string;
  category: string;
  direction: 'integrator' | 'controller' | 'both';
  description: string;
  hasData: boolean;
  dataFields?: DataField[];
  revisions?: number[];
  vendorNames?: Record<string, { name: string; description: string }>;
}

export interface DataField {
  name: string;
  length: number;
  description: string;
  defaultValue?: string;
  options?: { value: string; label: string }[];
  revisions?: number[];
}
