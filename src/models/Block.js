import { calculateBlockHash } from '../services/hashService.js';

export class Block {
  constructor({ index, timestamp, data, previousHash }) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return calculateBlockHash(this.index, this.previousHash, this.timestamp, this.data, this.nonce);
  }
}
