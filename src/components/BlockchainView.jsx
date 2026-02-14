import BlockCard from './BlockCard.jsx';
import BlockArrow from './BlockArrow.jsx';

export default function BlockchainView({ chain, invalidBlocks = [], onEdit, onRemine, isMining }) {
  return (
    <div className="flex items-start overflow-x-auto py-8 px-4">
      {chain.map((block, i) => (
        <div key={block.index} className="flex items-center">
          {i > 0 && <BlockArrow />}
          <BlockCard
            block={block}
            isInvalid={invalidBlocks.includes(block.index)}
            onEdit={onEdit}
            onRemine={onRemine}
            isMining={isMining}
          />
        </div>
      ))}
    </div>
  );
}
