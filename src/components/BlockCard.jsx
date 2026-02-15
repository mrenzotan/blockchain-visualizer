import { useState } from 'react';

/** Formats a Unix timestamp into a localized 12-hour time string (e.g., '2:30:45 PM'). */
function formatTimestamp(timestamp) {
  return new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(new Date(timestamp));
}

/** Shortens a hash string for display by keeping the first 8 and last 6 characters with ellipsis. */
function truncateHash(hash) {
  if (!hash || hash.length <= 16) return hash;
  return hash.slice(0, 8) + '...' + hash.slice(-6);
}

/** Renders a small SVG hash/pound icon used as a label prefix for hash fields. */
function HashIcon({ className = '' }) {
  return (
    <svg
      width='12'
      height='12'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <line x1='4' y1='9' x2='20' y2='9' />
      <line x1='4' y1='15' x2='20' y2='15' />
      <line x1='10' y1='3' x2='8' y2='21' />
      <line x1='16' y1='3' x2='14' y2='21' />
    </svg>
  );
}

/** Renders an individual block's details (index, timestamp, data, hashes, nonce) with inline editing and re-mining capabilities. */
export default function BlockCard({
  block,
  isInvalid,
  onEdit,
  onRemine,
  isMining,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(block.data);
  const [showTooltip, setShowTooltip] = useState(null);

  const isGenesis = block.index === 0;

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
      className={`group relative shrink-0 w-72 glass-card glass-card-hover rounded-xl p-5 transition-all duration-300 ${
        isInvalid ? 'border-cyber-red/40 glow-red' : ''
      }`}
    >
      <div className='flex flex-col gap-4'>
        {/* Header: Block number + timestamp + validity */}
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-3'>
            <span
              className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold ${
                isInvalid
                  ? 'bg-cyber-red/15 text-cyber-red border border-cyber-red/30'
                  : 'bg-cyber-green/15 text-cyber-green border border-cyber-green/30'
              }`}
            >
              #{block.index}
            </span>
            <div>
              <span className='text-sm font-semibold text-white'>
                {isGenesis ? 'GENESIS BLOCK' : 'BLOCK'}
              </span>
              <div className='flex items-center gap-1 text-xs text-slate-400 mt-0.5'>
                <svg
                  width='10'
                  height='10'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <circle cx='12' cy='12' r='10' />
                  <polyline points='12 6 12 12 16 14' />
                </svg>
                <span
                  className='cursor-help relative'
                  onMouseEnter={() => setShowTooltip('timestamp')}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  {formatTimestamp(block.timestamp)}
                  {showTooltip === 'timestamp' && (
                    <span className='absolute z-10 top-full left-0 mt-1 px-2 py-1 bg-dark-900 text-white text-xs rounded shadow-lg whitespace-nowrap font-mono border border-slate-700'>
                      {new Date(block.timestamp).toISOString()}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className='flex items-center gap-1'>
            {!isInvalid && (
              <div className='w-6 h-6 rounded-full bg-cyber-green/15 flex items-center justify-center'>
                <svg
                  width='12'
                  height='12'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-cyber-green'
                >
                  <polyline points='20 6 9 17 4 12' />
                </svg>
              </div>
            )}
            {isInvalid && (
              <div className='w-6 h-6 rounded-full bg-cyber-red/15 flex items-center justify-center'>
                <svg
                  width='12'
                  height='12'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-cyber-red'
                >
                  <line x1='18' y1='6' x2='6' y2='18' />
                  <line x1='6' y1='6' x2='18' y2='18' />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Data field */}
        <div>
          <div className='flex items-center gap-1.5 mb-1'>
            <svg
              width='11'
              height='11'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-slate-500'
            >
              <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
              <polyline points='14 2 14 8 20 8' />
            </svg>
            <span className='text-xs font-medium text-slate-400 uppercase tracking-wider'>
              Data
            </span>
          </div>
          {isEditing ? (
            <div className='flex gap-1.5'>
              <input
                type='text'
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className='flex-1 text-sm px-2 py-1.5 glass-input rounded-lg text-white font-mono'
                autoFocus
              />
              <button
                onClick={handleSaveEdit}
                className='text-xs px-2 py-1 bg-cyber-green/20 text-cyber-green rounded-lg hover:bg-cyber-green/30 transition-colors'
              >
                OK
              </button>
              <button
                onClick={handleCancelEdit}
                className='text-xs px-2 py-1 bg-dark-500 text-slate-400 rounded-lg hover:bg-dark-700 transition-colors'
              >
                X
              </button>
            </div>
          ) : (
            <p className='text-sm font-mono text-slate-200 break-all line-clamp-2 pl-0.5'>
              {block.data}
            </p>
          )}
        </div>

        {/* Nonce + Difficulty side by side */}
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <div className='flex items-center gap-1.5 mb-1'>
              <svg
                width='11'
                height='11'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-slate-500'
              >
                <circle cx='12' cy='12' r='3' />
                <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' />
              </svg>
              <span className='text-xs font-medium text-slate-400 uppercase tracking-wider'>
                Nonce
              </span>
            </div>
            <div className='bg-dark-700/50 rounded-lg px-3 py-1.5'>
              <span className='text-sm font-mono text-cyber-green'>
                {block.nonce}
              </span>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-1.5 mb-1'>
              <svg
                width='11'
                height='11'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-slate-500'
              >
                <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
              </svg>
              <span className='text-xs font-medium text-slate-400 uppercase tracking-wider'>
                Difficulty
              </span>
            </div>
            <div className='bg-dark-700/50 rounded-lg px-3 py-1.5'>
              <span className='text-sm font-mono text-cyber-amber'>
                {block.hash ? block.hash.match(/^0*/)[0].length : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Previous Hash */}
        <div>
          <div className='flex items-center gap-1.5 mb-1'>
            <HashIcon className='text-slate-500' />
            <span className='text-xs font-medium text-slate-400 uppercase tracking-wider'>
              Previous Hash
            </span>
          </div>
          <p
            className='text-xs font-mono text-slate-400 cursor-help relative pl-0.5'
            onMouseEnter={() => setShowTooltip('prevHash')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            {block.previousHash === '0'
              ? '0'
              : truncateHash(block.previousHash)}
            {showTooltip === 'prevHash' && block.previousHash !== '0' && (
              <span className='absolute z-10 bottom-full left-0 mb-1 px-2 py-1 bg-dark-900 text-white text-xs rounded shadow-lg font-mono break-all max-w-xs border border-slate-700'>
                {block.previousHash}
              </span>
            )}
          </p>
        </div>

        {/* Current Hash */}
        <div>
          <div className='flex items-center gap-1.5 mb-1'>
            <HashIcon className='text-slate-500' />
            <span className='text-xs font-medium text-slate-400 uppercase tracking-wider'>
              Current Hash
            </span>
          </div>
          <p
            className='text-xs font-mono text-slate-300 cursor-help relative pl-0.5'
            onMouseEnter={() => setShowTooltip('hash')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            {truncateHash(block.hash)}
            {showTooltip === 'hash' && (
              <span className='absolute z-10 bottom-full left-0 mb-1 px-2 py-1 bg-dark-900 text-white text-xs rounded shadow-lg font-mono break-all max-w-xs border border-slate-700'>
                {block.hash}
              </span>
            )}
          </p>
        </div>

        {/* Edit/Re-mine buttons */}
        {onEdit && onRemine && (
          <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity pt-1 border-t border-slate-700/30'>
            <button
              onClick={() => {
                setEditValue(block.data);
                setIsEditing(true);
              }}
              className='flex-1 text-xs px-3 py-1.5 rounded-lg bg-cyber-blue/10 text-cyber-blue hover:bg-cyber-blue/20 transition-colors border border-cyber-blue/20'
            >
              Edit Data
            </button>
            <button
              onClick={() => onRemine(block.index)}
              disabled={isMining}
              className='flex-1 text-xs px-3 py-1.5 rounded-lg bg-cyber-green/10 text-cyber-green hover:bg-cyber-green/20 transition-colors border border-cyber-green/20 disabled:opacity-30 disabled:cursor-not-allowed'
            >
              Re-mine
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
