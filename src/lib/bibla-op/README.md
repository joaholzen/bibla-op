# bibla-op

Zero-dependency **Open Protocol** message parser, builder, and decoder for Node.js and the browser.

Supports Atlas Copco, Desoutter, Bosch, Nexo, mPro, and Alpha vendor extensions.

## Install

```bash
npm install bibla-op
```

## Quick Start

```ts
import {
  buildMessage,
  parseMessage,
  buildCommStart,
  buildKeepAlive,
  decodeDataField,
  hasDecoder,
  getAllMids,
} from 'bibla-op';

// Build a Communication Start (MID 0001, revision 001)
const commStart = buildCommStart('001');
// => "00200001001         \0"

// Parse a raw message
const msg = parseMessage(commStart);
console.log(msg.mid);      // "0001"
console.log(msg.revision);  // "001"

// Decode a tightening result (MID 0061)
const raw0061 = '02360061002 ...'; // your raw message
const parsed = parseMessage(raw0061);
const decoded = decodeDataField(parsed.mid, parsed.dataField, 2);
console.log(decoded?.summary);  // "OK — 12.50 Nm / 45° (ID: 00001)"
console.log(decoded?.fields);   // Array of { id, label, value, unit?, status? }
```

## API

### Core Protocol

| Function | Description |
|---|---|
| `buildMessage(mid, revision?, data?, options?)` | Build a raw Open Protocol message string |
| `parseMessage(raw)` | Parse a raw string into an `OpenProtocolMessage` object |
| `formatRawMessage(raw)` | Escape NUL bytes for display |

### Convenience Builders

| Function | Description |
|---|---|
| `buildCommStart(revision?)` | MID 0001 — Communication Start |
| `buildCommStop()` | MID 0003 — Communication Stop |
| `buildKeepAlive()` | MID 9999 — Keep Alive |
| `buildPositiveAck(mid)` | MID 0005 — Positive Acknowledge |
| `buildNegativeAck(mid, errorCode?)` | MID 0004 — Negative Acknowledge |
| `createDefaultConfig(overrides?)` | Default `BiblaOpConfig` object |

### Decoders

| Function | Description |
|---|---|
| `decodeDataField(mid, dataField, revision?)` | Decode a data field into structured fields with labels, values, and units |
| `hasDecoder(mid)` | Check if a decoder exists for a given MID |
| `getSupportedRevisions(mid)` | Get supported revisions for a MID decoder |
| `isPidBasedMid(mid)` | Check if a MID uses PID-based variable data |
| `getMidRevisionSchemas(mid)` | Get field schemas for a MID across revisions |
| `getUnifiedSchemas()` | Get all schemas (standard + vendor) |
| `parseVariableDataFields(data)` | Parse PID-style variable data fields |

### Catalog

| Function | Description |
|---|---|
| `getAllMids()` | Get all MID definitions |
| `getMidDefinition(mid)` | Look up a single MID |
| `getCategories()` | List all MID categories |
| `buildDefaultDataField(mid)` | Build a default data field for a MID |

### Utilities

| Function | Description |
|---|---|
| `getReplyMids(mid)` | Get expected reply MIDs |
| `lookupAlarmCode(code)` | Look up alarm code description |
| `convertTorque(value, from, to)` | Convert between torque units |

## Types

All types are exported for TypeScript consumers:

```ts
import type {
  OpenProtocolMessage,
  MessageLogEntry,
  MIDDefinition,
  DataField,
  DecodedField,
  DecodedDataField,
  FieldDef,
  MidRevisionFieldSchema,
  DecoderEntry,
  BiblaOpConfig,
  UnifiedSchemas,
} from 'bibla-op';
```

## Supported MIDs

72 MIDs across 12 categories with 44+ decoders, including:

- **Communication** — 0001–0006, 9999
- **Tightening** — 0060–0065 (multi-revision)
- **Job** — 0030–0039
- **Tool** — 0040–0048
- **Alarms** — 0070–0078
- **I/O** — 0200–0225
- **Identifiers** — 0050–0054, 0150–0157
- **Parameter Sets** — 0010–0025
- **Traces** — 0900–0901
- **Vendor** — Desoutter, Bosch, Nexo, mPro, Alpha

## License

[MIT](./LICENSE)
