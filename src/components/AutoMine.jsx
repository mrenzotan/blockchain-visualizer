import { useState } from 'react';

/** Provides controls to automatically generate and mine a batch of blocks, displaying progress during the operation. */
export default function AutoMine({ autoMine, isMining, miningProgress }) {
  const [count, setCount] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (count > 0) autoMine(count);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider">Auto Mine</h3>
      <div className="flex gap-2">
        <input
          type="number"
          min="1"
          max="50"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-20 px-3 py-2 text-sm glass-input rounded-lg text-white text-center font-mono"
          disabled={isMining}
        />
        <button
          type="submit"
          disabled={isMining}
          className="px-4 py-2 text-sm font-medium bg-cyber-green/15 text-cyber-green rounded-lg hover:bg-cyber-green/25 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-cyber-green/20"
        >
          Generate
        </button>
      </div>
      {miningProgress && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Mining block {miningProgress.current}/{miningProgress.total}</span>
            <span>{Math.round((miningProgress.current / miningProgress.total) * 100)}%</span>
          </div>
          <div className="w-full h-1 bg-dark-500 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyber-green rounded-full transition-all duration-300"
              style={{ width: `${(miningProgress.current / miningProgress.total) * 100}%` }}
            />
          </div>
        </div>
      )}
    </form>
  );
}
