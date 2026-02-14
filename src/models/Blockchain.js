import { Block } from './Block.js';
import { DEFAULT_DIFFICULTY, GENESIS_BLOCK_DATA } from '../constants.js';

export class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = DEFAULT_DIFFICULTY;
  }

  createGenesisBlock() {
    return new Block({
      index: 0,
      timestamp: Date.now(),
      data: GENESIS_BLOCK_DATA,
      previousHash: '0',
    });
  }

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
