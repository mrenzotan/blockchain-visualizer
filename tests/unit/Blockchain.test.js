import { describe, it, expect } from 'vitest';
import { Blockchain } from '../../src/models/Blockchain.js';

describe('Blockchain', () => {
  it('creates chain with genesis block', () => {
    const bc = new Blockchain();
    expect(bc.chain).toHaveLength(1);
    const genesis = bc.chain[0];
    expect(genesis.index).toBe(0);
    expect(genesis.data).toBe('Genesis Block');
    expect(genesis.previousHash).toBe('0');
  });

  it('has default difficulty of 2', () => {
    const bc = new Blockchain();
    expect(bc.difficulty).toBe(2);
  });

  describe('validateChain', () => {
    it('returns valid for a fresh chain', () => {
      const bc = new Blockchain();
      const result = bc.validateChain();
      expect(result.isValid).toBe(true);
      expect(result.invalidBlocks).toEqual([]);
    });

    it('returns invalid when hash integrity fails', () => {
      const bc = new Blockchain();
      // Manually add a second block with correct linking
      const block = bc.chain[0];
      const block2 = {
        index: 1,
        timestamp: Date.now(),
        data: 'test',
        previousHash: block.hash,
        nonce: 0,
        hash: 'tampered-hash',
        calculateHash() {
          return 'correct-hash';
        },
      };
      bc.chain.push(block2);
      const result = bc.validateChain();
      expect(result.isValid).toBe(false);
      expect(result.invalidBlocks).toContain(1);
    });

    it('returns invalid when link integrity fails', () => {
      const bc = new Blockchain();
      const block2 = {
        index: 1,
        timestamp: Date.now(),
        data: 'test',
        previousHash: 'wrong-previous-hash',
        nonce: 0,
        hash: 'some-hash',
        calculateHash() {
          return 'some-hash';
        },
      };
      bc.chain.push(block2);
      const result = bc.validateChain();
      expect(result.isValid).toBe(false);
      expect(result.invalidBlocks).toContain(1);
    });

    it('cascading invalidation marks all subsequent blocks', () => {
      const bc = new Blockchain();
      // Add block 1 with correct link
      const genesis = bc.chain[0];
      const block1 = {
        index: 1,
        timestamp: Date.now(),
        data: 'block1',
        previousHash: genesis.hash,
        nonce: 0,
        hash: 'block1-hash',
        calculateHash() {
          return 'block1-hash';
        },
      };
      // Add block 2 linked to block 1
      const block2 = {
        index: 2,
        timestamp: Date.now(),
        data: 'block2',
        previousHash: 'block1-hash',
        nonce: 0,
        hash: 'block2-hash',
        calculateHash() {
          return 'block2-hash';
        },
      };
      bc.chain.push(block1, block2);

      // Tamper with block 1 — break hash integrity
      block1.hash = 'tampered';
      const result = bc.validateChain();
      expect(result.isValid).toBe(false);
      expect(result.invalidBlocks).toContain(1);
      expect(result.invalidBlocks).toContain(2);
    });
  });
});
