import { useState } from 'react';
import { List, ChevronDown } from 'lucide-react';

/** Renders a collapsible list of all blocks in reverse chronological order, showing each block's index, data, and truncated hash. */
export default function TransactionLedger({ chain }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='glass-card rounded-xl overflow-hidden'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex items-center justify-between px-4 py-3 hover:bg-white/2 transition-colors'
      >
        <div className='flex items-center gap-2'>
          <List size={14} className='text-slate-400' />
          <span className='text-sm font-medium text-slate-300'>
            Activity Ledger
          </span>
          <span className='text-xs px-2 py-0.5 rounded-full bg-dark-500 text-slate-400 font-mono'>
            {chain.length}
          </span>
        </div>
        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className='px-4 pb-3 space-y-1.5 max-h-48 overflow-y-auto border-t border-slate-700/30'>
          {chain
            .slice()
            .reverse()
            .map((block) => (
              <div
                key={block.index}
                className='flex items-center gap-3 py-1.5 text-sm'
              >
                <span className='shrink-0 w-7 h-7 rounded-full bg-cyber-green/10 text-cyber-green text-xs font-bold flex items-center justify-center border border-cyber-green/20'>
                  {block.index}
                </span>
                <span className='text-slate-300 truncate flex-1'>
                  {block.data}
                </span>
                <span className='text-xs font-mono text-slate-500 shrink-0'>
                  {block.hash.slice(0, 8)}...
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
