import { useState } from 'react';

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
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Mine Block</h2>
      <input
        type="text"
        value={data}
        onChange={(e) => { setData(e.target.value); setError(''); }}
        placeholder="Enter transaction data..."
        className="w-full px-3 py-2 text-sm bg-zinc-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-300"
        disabled={isMining}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isMining}
        className="w-full px-4 py-2 text-sm font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {isMining ? 'Mining...' : 'Mine'}
      </button>
      {lastMineTime !== null && !isMining && (
        <p className="text-xs text-zinc-400">Mined in {lastMineTime}ms</p>
      )}
    </form>
  );
}
