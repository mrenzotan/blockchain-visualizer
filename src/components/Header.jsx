import { Box, CircleCheck, CircleX, RotateCcw } from 'lucide-react';

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
            <Box size={14} className='text-slate-400' />
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
            {isValid ? (
              <CircleCheck size={14} />
            ) : (
              <CircleX size={14} />
            )}
            {isValid ? 'Chain Valid' : 'Chain Invalid'}
          </div>

          {resetChain && (
            <button
              onClick={resetChain}
              className='p-2 rounded-lg bg-dark-700/60 border border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600 transition-colors'
              title='Reset Chain'
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
