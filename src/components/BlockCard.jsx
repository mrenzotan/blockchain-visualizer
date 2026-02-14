import { useState } from 'react';

function formatTimestamp(timestamp) {
  const now = Date.now();
  const diffSeconds = Math.round((now - timestamp) / 1000);

  if (Math.abs(diffSeconds) <= 60) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    return rtf.format(-diffSeconds, 'second');
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(timestamp));
}

function truncateHash(hash) {
  if (!hash || hash.length <= 13) return hash;
  return hash.slice(0, 10) + '...';
}

export default function BlockCard({ block, isInvalid, onEdit, onRemine, isMining }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(block.data);
  const [showTooltip, setShowTooltip] = useState(null);

  const handleSaveEdit = () => {
    if (onEdit) {
      onEdit(block.index, editValue);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditValue(block.data);
    setIsEditing(false);
  };

  return (
    <div
      className={`group relative flex-shrink-0 w-80 aspect-square bg-white rounded-lg shadow-sm p-6 transition-all ${
        isInvalid ? 'ring-2 ring-red-500' : ''
      }`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Block #{block.index}
          </span>
          {onEdit && onRemine && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => { setEditValue(block.data); setIsEditing(true); }}
                className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              >
                Edit
              </button>
              <button
                onClick={() => onRemine(block.index)}
                disabled={isMining}
                className="text-xs px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 hover:bg-zinc-200 disabled:opacity-40"
              >
                Re-mine
              </button>
            </div>
          )}
        </div>

        <div>
          <span className="text-xs text-zinc-400">Timestamp</span>
          <div
            className="text-sm text-zinc-700 cursor-help relative"
            onMouseEnter={() => setShowTooltip('timestamp')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            {formatTimestamp(block.timestamp)}
            {showTooltip === 'timestamp' && (
              <div className="absolute z-10 bottom-full left-0 mb-1 px-2 py-1 bg-zinc-900 text-white text-xs rounded shadow-lg whitespace-nowrap font-mono">
                {new Date(block.timestamp).toISOString()} ({block.timestamp}ms)
              </div>
            )}
          </div>
        </div>

        <div>
          <span className="text-xs text-zinc-400">Data</span>
          {isEditing ? (
            <div className="flex gap-1 mt-1">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="flex-1 text-sm px-2 py-1 border border-zinc-300 rounded"
                autoFocus
              />
              <button onClick={handleSaveEdit} className="text-xs px-2 py-1 bg-zinc-900 text-white rounded">OK</button>
              <button onClick={handleCancelEdit} className="text-xs px-2 py-1 bg-zinc-200 rounded">X</button>
            </div>
          ) : (
            <p className="text-sm text-zinc-900 break-all line-clamp-2">{block.data}</p>
          )}
        </div>

        <div>
          <span className="text-xs text-zinc-400">Nonce</span>
          <p className="text-sm font-mono text-zinc-700">{block.nonce}</p>
        </div>

        <div>
          <span className="text-xs text-zinc-400">Previous Hash</span>
          <p
            className="text-sm font-mono text-zinc-600 cursor-help relative"
            onMouseEnter={() => setShowTooltip('prevHash')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            {truncateHash(block.previousHash)}
            {showTooltip === 'prevHash' && (
              <div className="absolute z-10 bottom-full left-0 mb-1 px-2 py-1 bg-zinc-900 text-white text-xs rounded shadow-lg font-mono break-all max-w-xs">
                {block.previousHash}
              </div>
            )}
          </p>
        </div>

        <div>
          <span className="text-xs text-zinc-400">Hash</span>
          <p
            className="text-sm font-mono text-zinc-600 cursor-help relative"
            onMouseEnter={() => setShowTooltip('hash')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            {truncateHash(block.hash)}
            {showTooltip === 'hash' && (
              <div className="absolute z-10 bottom-full left-0 mb-1 px-2 py-1 bg-zinc-900 text-white text-xs rounded shadow-lg font-mono break-all max-w-xs">
                {block.hash}
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
