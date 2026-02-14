export default function TransactionLedger({ chain }) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Ledger</h2>
      <div className="flex gap-6 overflow-x-auto pb-1">
        {chain.map((block) => (
          <div key={block.index} className="flex gap-1.5 text-sm flex-shrink-0">
            <span className="font-mono text-zinc-400">#{block.index}</span>
            <span className="text-zinc-700 max-w-48 truncate">{block.data}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
