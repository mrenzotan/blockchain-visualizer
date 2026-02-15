import { Link } from 'lucide-react';

/** Renders a visual chain-link connector between adjacent BlockCards in the blockchain view. */
export default function BlockArrow() {
  return (
    <div className='shrink-0 flex items-center px-3'>
      <div className='flex items-center gap-1'>
        <div className='w-6 h-px bg-slate-600' />
        <div className='w-8 h-8 rounded-full bg-dark-700/80 border border-slate-600/50 flex items-center justify-center'>
          <Link size={16} className='text-slate-400' />
        </div>
        <div className='w-6 h-px bg-slate-600' />
      </div>
    </div>
  );
}
