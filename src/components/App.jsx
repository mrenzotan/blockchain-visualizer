import { useBlockchain } from '../hooks/useBlockchain.js';
import BlockchainView from './BlockchainView.jsx';
import Sidebar from './Sidebar.jsx';
import ValidationIndicator from './ValidationIndicator.jsx';

export default function App() {
  const {
    blockchain,
    isMining,
    miningProgress,
    lastMineTime,
    validationResult,
    addBlock,
    editBlockData,
    remineBlock,
    autoMine,
    setDifficulty,
    resetChain,
  } = useBlockchain();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <Sidebar
        addBlock={addBlock}
        isMining={isMining}
        miningProgress={miningProgress}
        lastMineTime={lastMineTime}
        difficulty={blockchain.difficulty}
        setDifficulty={setDifficulty}
        autoMine={autoMine}
        chain={blockchain.chain}
        resetChain={resetChain}
      />
      <main className="pt-6">
        <div className="max-w-6xl mx-auto px-8">
          <ValidationIndicator validationResult={validationResult} />
        </div>
        <div className="overflow-x-auto">
          <BlockchainView
            chain={blockchain.chain}
            invalidBlocks={validationResult.invalidBlocks}
            isMining={isMining}
            onEdit={editBlockData}
            onRemine={remineBlock}
          />
        </div>
      </main>
    </div>
  );
}
