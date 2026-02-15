import { calculateBlockHash } from './hashService.js';
import { MINE_BATCH_SIZE } from '../constants.js';

/** Performs proof-of-work mining by incrementing a nonce until the hash meets the difficulty target. Yields to the event loop periodically to keep the UI responsive. */
export async function mine(block, difficulty) {
  const target = '0'.repeat(difficulty);
  const start = performance.now();
  let nonce = 0;

  while (true) {
    const hash = calculateBlockHash(block.index, block.previousHash, block.timestamp, block.data, nonce);
    if (hash.startsWith(target)) {
      return { nonce, hash, durationMs: Math.round(performance.now() - start) };
    }
    nonce++;
    if (nonce % MINE_BATCH_SIZE === 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
}
