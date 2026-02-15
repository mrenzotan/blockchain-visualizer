import BlockCard from './BlockCard.jsx';
import BlockArrow from './BlockArrow.jsx';

/** Renders the horizontal chain of BlockCards connected by BlockArrows, highlighting invalid blocks. */
export default function BlockchainView({ chain, invalidBlocks = [], onEdit, onRemine, isMining }) {
  return (
    <div className="overflow-x-auto py-8 px-6">
      <div className="flex items-stretch w-fit mx-auto">
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
    </div>
  );
}
