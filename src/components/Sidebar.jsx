import MiningForm from './MiningForm.jsx';
import ValidationIndicator from './ValidationIndicator.jsx';
import DifficultySelector from './DifficultySelector.jsx';
import AutoMine from './AutoMine.jsx';
import TransactionLedger from './TransactionLedger.jsx';

export default function Sidebar({
  addBlock, isMining, lastMineTime, validationResult,
  difficulty, setDifficulty, autoMine, miningProgress,
  chain, resetChain,
}) {
  return (
    <aside className="w-80 flex-shrink-0 bg-white shadow-md overflow-y-auto p-8 space-y-8">
      <h1 className="text-xl font-bold">Blockchain Visualizer</h1>
      <ValidationIndicator validationResult={validationResult} />
      <MiningForm addBlock={addBlock} isMining={isMining} lastMineTime={lastMineTime} />
      <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
      <AutoMine autoMine={autoMine} isMining={isMining} miningProgress={miningProgress} />
      <TransactionLedger chain={chain} />
      {resetChain && (
        <button
          onClick={resetChain}
          className="w-full px-4 py-2 text-sm font-medium bg-zinc-100 text-zinc-600 rounded-lg hover:bg-zinc-200 transition-colors"
        >
          Reset Chain
        </button>
      )}
    </aside>
  );
}
