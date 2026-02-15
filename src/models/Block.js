import { calculateBlockHash } from '../services/hashService.js';

/** Represents a single block in the blockchain, containing its index, timestamp, data, previous hash, nonce, and computed hash. */
export class Block {
  constructor({ index, timestamp, data, previousHash }) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  /** Computes the SHA-256 hash of this block using all its properties. */
  calculateHash() {
    return calculateBlockHash(this.index, this.previousHash, this.timestamp, this.data, this.nonce);
  }
}
