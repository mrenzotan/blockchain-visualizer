import MiningForm from './MiningForm.jsx';
import DifficultySelector from './DifficultySelector.jsx';
import AutoMine from './AutoMine.jsx';
import TransactionLedger from './TransactionLedger.jsx';

/** Alternative layout component that renders mining controls, difficulty selector, auto-mine, and transaction ledger in a horizontal header arrangement. */
export default function Sidebar({
  addBlock,
  isMining,
  lastMineTime,
  difficulty,
  setDifficulty,
  autoMine,
  miningProgress,
  chain,
  resetChain,
}) {
  return (
    <header className="bg-white shadow-sm border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-8 py-5 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Blockchain Visualizer</h1>
          {resetChain && (
            <button
              onClick={resetChain}
              className="px-3 py-1.5 text-sm font-medium bg-zinc-100 text-zinc-600 rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Reset Chain
            </button>
          )}
        </div>

        <div className="flex items-start gap-8 flex-wrap">
          <MiningForm
            addBlock={addBlock}
            isMining={isMining}
            lastMineTime={lastMineTime}
          />
          <div className="w-px h-16 bg-zinc-200 self-center" />
          <DifficultySelector
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
          <div className="w-px h-16 bg-zinc-200 self-center" />
          <AutoMine
            autoMine={autoMine}
            isMining={isMining}
            miningProgress={miningProgress}
          />
        </div>

        <TransactionLedger chain={chain} />
      </div>
    </header>
  );
}
