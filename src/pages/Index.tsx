import { useState } from 'react';
import {
  buildMessage,
  parseMessage,
  buildCommStart,
  buildCommStop,
  buildKeepAlive,
  buildPositiveAck,
  buildNegativeAck,
  createDefaultConfig,
  getAllMids,
  getCategories,
  decodeDataField,
  hasDecoder,
} from '@/lib/bibla-op';
import type { BiblaOpConfig } from '@/lib/bibla-op';

const SAMPLE_MID0061 =
  '02360061002         01000102010301PF6000 Controller       04VIN12345678901234567890050106001070010080001091101101112009.50130010.501400010.0150009.801600100170012018000101900110202024-12-01:12:30:002121 2022-01-01:00:00:0022123 0000000001';

const Index = () => {
  const [config, setConfig] = useState<BiblaOpConfig>(createDefaultConfig());
  const [revision, setRevision] = useState('001');
  const [rawInput, setRawInput] = useState(SAMPLE_MID0061);

  const commStart = buildCommStart(revision);
  const commStop = buildCommStop();
  const keepAlive = buildKeepAlive();
  const ack = buildPositiveAck('0061');
  const nack = buildNegativeAck('0061', '01');

  const parsed = parseMessage(rawInput);
  const decoded = parsed ? decodeDataField(parsed.mid, parsed.dataField, parseInt(parsed.revision) || 1) : null;

  const allMids = getAllMids();
  const categories = getCategories();
  const decodableMids = allMids.filter(m => hasDecoder(m.mid));

  return (
    <div className="min-h-screen bg-background text-foreground p-6 max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold">biblaOp — Open Protocol Library Demo</h1>
        <p className="text-muted-foreground mt-1">
          Zero-dependency protocol parser, builder, and decoder
        </p>
      </header>

      {/* Config */}
      <section className="rounded-lg border p-4 space-y-3">
        <h2 className="text-xl font-semibold">Connection Config</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <label className="space-y-1">
            <span className="text-muted-foreground">Host</span>
            <input className="w-full rounded border px-2 py-1 bg-background" value={config.host}
              onChange={e => setConfig({ ...config, host: e.target.value })} />
          </label>
          <label className="space-y-1">
            <span className="text-muted-foreground">Port</span>
            <input className="w-full rounded border px-2 py-1 bg-background" type="number" value={config.port}
              onChange={e => setConfig({ ...config, port: parseInt(e.target.value) || 4545 })} />
          </label>
          <label className="space-y-1">
            <span className="text-muted-foreground">Keep-alive (ms)</span>
            <input className="w-full rounded border px-2 py-1 bg-background" type="number" value={config.keepAliveIntervalMs}
              onChange={e => setConfig({ ...config, keepAliveIntervalMs: parseInt(e.target.value) || 10000 })} />
          </label>
          <label className="space-y-1">
            <span className="text-muted-foreground">Comm Start Rev</span>
            <select className="w-full rounded border px-2 py-1 bg-background" value={revision}
              onChange={e => { setRevision(e.target.value); setConfig({ ...config, commStartRevision: e.target.value }); }}>
              {['001','002','003','004','005','006','007','008'].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>
        </div>
      </section>

      {/* Convenience Builders */}
      <section className="rounded-lg border p-4 space-y-3">
        <h2 className="text-xl font-semibold">Convenience Builders</h2>
        <div className="space-y-2 text-sm font-mono">
          <div><span className="text-muted-foreground mr-2">CommStart:</span>{commStart}</div>
          <div><span className="text-muted-foreground mr-2">CommStop:</span>{commStop}</div>
          <div><span className="text-muted-foreground mr-2">KeepAlive:</span>{keepAlive}</div>
          <div><span className="text-muted-foreground mr-2">ACK(0061):</span>{ack}</div>
          <div><span className="text-muted-foreground mr-2">NACK(0061):</span>{nack}</div>
        </div>
      </section>

      {/* Parser + Decoder */}
      <section className="rounded-lg border p-4 space-y-3">
        <h2 className="text-xl font-semibold">Parse & Decode</h2>
        <textarea className="w-full rounded border px-3 py-2 bg-background font-mono text-xs h-20"
          value={rawInput} onChange={e => setRawInput(e.target.value)}
          placeholder="Paste a raw Open Protocol message..." />
        {parsed && (
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-3 gap-2">
              <div><span className="text-muted-foreground">MID:</span> {parsed.mid}</div>
              <div><span className="text-muted-foreground">Rev:</span> {parsed.revision}</div>
              <div><span className="text-muted-foreground">Length:</span> {parsed.length}</div>
            </div>
            {decoded && (
              <div className="mt-3">
                {decoded.summary && <div className="font-semibold text-primary mb-2">{decoded.summary}</div>}
                <table className="w-full text-xs">
                  <thead><tr className="border-b"><th className="text-left py-1">ID</th><th className="text-left py-1">Field</th><th className="text-left py-1">Value</th></tr></thead>
                  <tbody>
                    {decoded.fields.map((f, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-1 text-muted-foreground">{f.id}</td>
                        <td className="py-1">{f.label}</td>
                        <td className="py-1 font-mono">
                          <span className={f.status === 'ok' ? 'text-green-500' : f.status === 'nok' ? 'text-red-500' : ''}>
                            {f.value}{f.unit ? ` ${f.unit}` : ''}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Catalog Stats */}
      <section className="rounded-lg border p-4 space-y-2">
        <h2 className="text-xl font-semibold">MID Catalog</h2>
        <p className="text-sm text-muted-foreground">
          {allMids.length} MIDs across {categories.length} categories — {decodableMids.length} with decoders
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <span key={cat} className="text-xs rounded-full border px-3 py-1">{cat} ({allMids.filter(m => m.category === cat).length})</span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
