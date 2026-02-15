/** Renders a visual chain-link connector between adjacent BlockCards in the blockchain view. */
export default function BlockArrow() {
  return (
    <div className='shrink-0 flex items-center px-3'>
      <div className='flex items-center gap-1'>
        <div className='w-6 h-px bg-slate-600' />
        <div className='w-8 h-8 rounded-full bg-dark-700/80 border border-slate-600/50 flex items-center justify-center'>
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-slate-400'
          >
            <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />
            <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' />
          </svg>
        </div>
        <div className='w-6 h-px bg-slate-600' />
      </div>
    </div>
  );
}
