import { useState } from 'react';
import { Loader2 } from 'lucide-react';

/** Provides the text input and submit button for manually mining a new block with user-specified data. */
export default function MiningForm({ addBlock, isMining, lastMineTime }) {
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.trim()) {
      setError('Data cannot be empty');
      return;
    }
    setError('');
    addBlock(data);
    setData('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 space-y-3">
      <div className="flex gap-3">
        <input
          type="text"
          value={data}
          onChange={(e) => { setData(e.target.value); setError(''); }}
          placeholder="Enter block data..."
          className="flex-1 px-4 py-3 text-sm glass-input rounded-xl text-white placeholder-slate-500"
          disabled={isMining}
        />
        <button
          type="submit"
          disabled={isMining}
          className="px-6 py-3 text-sm font-semibold bg-cyber-blue text-white rounded-xl hover:bg-cyber-blue/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all glow-blue"
        >
          {isMining ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" />
              Mining...
            </span>
          ) : 'Mine Block'}
        </button>
      </div>
      {error && <p className="text-xs text-cyber-red">{error}</p>}
      {lastMineTime !== null && !isMining && (
        <p className="text-xs text-slate-500">Mined in {lastMineTime}ms</p>
      )}
    </form>
  );
}
