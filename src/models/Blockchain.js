import { Block } from './Block.js';
import { DEFAULT_DIFFICULTY, GENESIS_BLOCK_DATA } from '../constants.js';

/** Manages the full chain of blocks, including genesis block creation, difficulty settings, and chain validation. */
export class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = DEFAULT_DIFFICULTY;
  }

  /** Creates the first block in the chain with default data and a previous hash of '0'. */
  createGenesisBlock() {
    return new Block({
      index: 0,
      timestamp: Date.now(),
      data: GENESIS_BLOCK_DATA,
      previousHash: '0',
    });
  }

  /** Validates the entire chain by checking each block's hash integrity and link to its predecessor, returning invalid block indices. */
  validateChain() {
    const invalidBlocks = [];
    let cascading = false;

    for (let i = 1; i < this.chain.length; i++) {
      const block = this.chain[i];
      const prevBlock = this.chain[i - 1];

      const hashIntegrity = block.hash === block.calculateHash();
      const linkIntegrity = block.previousHash === prevBlock.hash;

      if (!hashIntegrity || !linkIntegrity || cascading) {
        invalidBlocks.push(i);
        cascading = true;
      }
    }

    return { isValid: invalidBlocks.length === 0, invalidBlocks };
  }
}
