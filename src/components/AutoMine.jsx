import { useState } from 'react';

export default function AutoMine({ autoMine, isMining, miningProgress }) {
  const [count, setCount] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (count > 0) autoMine(count);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Auto Mine</h2>
      <div className="flex gap-2">
        <input
          type="number"
          min="1"
          max="50"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-20 px-3 py-2 text-sm bg-zinc-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-300"
          disabled={isMining}
        />
        <button
          type="submit"
          disabled={isMining}
          className="flex-1 px-4 py-2 text-sm font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Auto Mine
        </button>
      </div>
      {miningProgress && (
        <p className="text-xs text-zinc-400">
          Mining block {miningProgress.current} of {miningProgress.total}...
        </p>
      )}
    </form>
  );
}
