/** Renders the top navigation bar displaying the chain height, validation status, and reset button. */
export default function Header({ chainLength, validationResult, resetChain }) {
  const isValid = validationResult.isValid;

  return (
    <header className='glass-card border-t-0 border-x-0 rounded-none px-6 py-3'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div>
            <h1 className='text-xl font-bold text-white leading-tight'>
              Blockchain Visualizer
            </h1>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-700/60 border border-slate-700/50'>
            <svg
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-slate-400'
            >
              <path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' />
            </svg>
            <span className='text-sm text-slate-300'>
              Height:{' '}
              <span className='font-semibold text-white'>{chainLength}</span>
            </span>
          </div>

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
              isValid
                ? 'bg-cyber-green/10 text-cyber-green border border-cyber-green/20'
                : 'bg-cyber-red/10 text-cyber-red border border-cyber-red/20'
            }`}
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              {isValid ? (
                <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3' />
              ) : (
                <>
                  <circle cx='12' cy='12' r='10' />
                  <line x1='15' y1='9' x2='9' y2='15' />
                  <line x1='9' y1='9' x2='15' y2='15' />
                </>
              )}
            </svg>
            {isValid ? 'Chain Valid' : 'Chain Invalid'}
          </div>

          {resetChain && (
            <button
              onClick={resetChain}
              className='p-2 rounded-lg bg-dark-700/60 border border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600 transition-colors'
              title='Reset Chain'
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <polyline points='1 4 1 10 7 10' />
                <path d='M3.51 15a9 9 0 1 0 2.13-9.36L1 10' />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
