export default function TransactionLedger({ chain }) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Ledger</h2>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {chain.map((block) => (
          <div key={block.index} className="flex gap-2 text-sm">
            <span className="font-mono text-zinc-400 flex-shrink-0">#{block.index}</span>
            <span className="text-zinc-700 truncate">{block.data}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
