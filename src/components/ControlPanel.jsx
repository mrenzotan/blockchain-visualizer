import MiningForm from './MiningForm.jsx';
import DifficultySelector from './DifficultySelector.jsx';
import AutoMine from './AutoMine.jsx';
import TransactionLedger from './TransactionLedger.jsx';

export default function ControlPanel({
  addBlock,
  isMining,
  lastMineTime,
  difficulty,
  setDifficulty,
  autoMine,
  miningProgress,
  chain,
}) {
  return (
    <section className="border-t border-slate-700/30 bg-dark-900/50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Extend the Chain</h2>
          <p className="text-sm text-slate-400">
            Enter data below to mine a new block. The Proof-of-Work algorithm will search for a valid hash.
          </p>
        </div>

        <div className="space-y-6">
          <MiningForm
            addBlock={addBlock}
            isMining={isMining}
            lastMineTime={lastMineTime}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-4">
              <DifficultySelector
                difficulty={difficulty}
                setDifficulty={setDifficulty}
              />
            </div>
            <div className="glass-card rounded-xl p-4">
              <AutoMine
                autoMine={autoMine}
                isMining={isMining}
                miningProgress={miningProgress}
              />
            </div>
          </div>

          <TransactionLedger chain={chain} />
        </div>
      </div>
    </section>
  );
}
