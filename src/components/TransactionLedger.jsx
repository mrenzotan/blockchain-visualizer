import { useState } from 'react';

export default function TransactionLedger({ chain }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          <span className="text-sm font-medium text-slate-300">Activity Ledger</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-dark-500 text-slate-400 font-mono">
            {chain.length}
          </span>
        </div>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 pb-3 space-y-1.5 max-h-48 overflow-y-auto border-t border-slate-700/30">
          {chain.slice().reverse().map((block) => (
            <div key={block.index} className="flex items-center gap-3 py-1.5 text-sm">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cyber-green/10 text-cyber-green text-xs font-bold flex items-center justify-center border border-cyber-green/20">
                {block.index}
              </span>
              <span className="text-slate-300 truncate flex-1">{block.data}</span>
              <span className="text-xs font-mono text-slate-500 flex-shrink-0">
                {block.hash.slice(0, 8)}...
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
