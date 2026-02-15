import { useBlockchain } from '../hooks/useBlockchain.js';
import Header from './Header.jsx';
import BlockchainView from './BlockchainView.jsx';
import ControlPanel from './ControlPanel.jsx';

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
    <div className="min-h-screen bg-dark-800 text-slate-200 flex flex-col">
      <Header
        chainLength={blockchain.chain.length}
        validationResult={validationResult}
        resetChain={resetChain}
      />

      <main className="flex-1">
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

      <ControlPanel
        addBlock={addBlock}
        isMining={isMining}
        lastMineTime={lastMineTime}
        difficulty={blockchain.difficulty}
        setDifficulty={setDifficulty}
        autoMine={autoMine}
        miningProgress={miningProgress}
        chain={blockchain.chain}
      />
    </div>
  );
}
