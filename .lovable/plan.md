

# biblaOp — Updated Plan

Two changes from previous revision:

## 1. Connection config added to convenience module

`protocol/convenience.ts` will export a `BiblaOpConfig` type that includes connection and keep-alive settings:

```ts
interface BiblaOpConfig {
  host: string;              // e.g. "192.168.1.100"
  port: number;              // e.g. 4545
  keepAliveIntervalMs: number; // e.g. 10000
  commStartRevision: string;   // '001' through '008'
}
```

A `createDefaultConfig()` helper returns sensible defaults (localhost, port 4545, 10s keep-alive, revision '001'). The library still does not manage connections — this config is a data shape consumers pass to their own transport layer.

## 2. Remove all vendor documentation references

All comments referencing vendor specifications, manuals, or appendices will be stripped from every ported file. This includes:

- "Source: Bosch Rexroth System 350 Open Protocol specification (3 608 878 300)" in `alarm-codes.ts`
- "per Atlas Copco Appendix 3.14" references in controller files and catalog
- "based on Desoutter CVI3/TWINCVI3/Workgroup specification" references
- "See Open Protocol specification Appendix" references in type files
- "Px2 Appendix 3.14 and Cleco P2565PM specifications" references
- Any other "Source:", "See:", "per specification", or vendor manual citation comments

The actual data (alarm codes, MID definitions, field schemas) stays — only the documentary attribution comments are removed. Vendor-specific decoder files (`vendor-alpha.ts`, `vendor-bosch.ts`, etc.) keep their functional code but lose any spec-citation comments.

## Everything else unchanged

The library structure, exclusions (no simulation, no transport, no handlers), and implementation steps remain the same as the previous revision.

