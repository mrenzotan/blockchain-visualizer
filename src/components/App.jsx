import { useBlockchain } from '../hooks/useBlockchain.js';
import BlockchainView from './BlockchainView.jsx';
import Sidebar from './Sidebar.jsx';

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
    <div className="flex h-screen bg-zinc-50 text-zinc-950">
      <Sidebar
        addBlock={addBlock}
        isMining={isMining}
        miningProgress={miningProgress}
        lastMineTime={lastMineTime}
        validationResult={validationResult}
        difficulty={blockchain.difficulty}
        setDifficulty={setDifficulty}
        autoMine={autoMine}
        chain={blockchain.chain}
        resetChain={resetChain}
      />
      <main className="flex-1 overflow-x-auto overflow-y-auto">
        <BlockchainView
          chain={blockchain.chain}
          invalidBlocks={validationResult.invalidBlocks}
          isMining={isMining}
          onEdit={editBlockData}
          onRemine={remineBlock}
        />
      </main>
    </div>
  );
}
