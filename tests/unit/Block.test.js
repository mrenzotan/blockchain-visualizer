import { describe, it, expect } from 'vitest';
import { Block } from '../../src/models/Block.js';

describe('Block', () => {
  it('stores all 6 fields', () => {
    const block = new Block({ index: 0, timestamp: 1000, data: 'test', previousHash: '0' });
    expect(block.index).toBe(0);
    expect(block.timestamp).toBe(1000);
    expect(block.data).toBe('test');
    expect(block.previousHash).toBe('0');
    expect(block.nonce).toBe(0);
    expect(block.hash).toBeDefined();
    expect(typeof block.hash).toBe('string');
  });

  it('calculateHash returns a 64-character hex string', () => {
    const block = new Block({ index: 0, timestamp: 1000, data: 'test', previousHash: '0' });
    const hash = block.calculateHash();
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it('sets hash in constructor via calculateHash', () => {
    const block = new Block({ index: 0, timestamp: 1000, data: 'test', previousHash: '0' });
    expect(block.hash).toBe(block.calculateHash());
  });

  it('hash changes when data changes', () => {
    const block = new Block({ index: 0, timestamp: 1000, data: 'original', previousHash: '0' });
    const originalHash = block.hash;
    block.data = 'modified';
    expect(block.calculateHash()).not.toBe(originalHash);
  });

  it('hash changes when nonce changes', () => {
    const block = new Block({ index: 0, timestamp: 1000, data: 'test', previousHash: '0' });
    const hash0 = block.calculateHash();
    block.nonce = 1;
    expect(block.calculateHash()).not.toBe(hash0);
  });

  it('defaults nonce to 0', () => {
    const block = new Block({ index: 0, timestamp: 1000, data: 'test', previousHash: '0' });
    expect(block.nonce).toBe(0);
  });
});
