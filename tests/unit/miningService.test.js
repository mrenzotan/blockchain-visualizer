import { describe, it, expect } from 'vitest';
import { mine } from '../../src/services/miningService.js';

describe('miningService', () => {
  describe('mine', () => {
    it('returns a Promise resolving to { nonce, hash, durationMs }', async () => {
      const block = { index: 0, previousHash: '0', timestamp: 1000, data: 'test' };
      const result = await mine(block, 1);
      expect(result).toHaveProperty('nonce');
      expect(result).toHaveProperty('hash');
      expect(result).toHaveProperty('durationMs');
      expect(typeof result.nonce).toBe('number');
      expect(typeof result.hash).toBe('string');
      expect(typeof result.durationMs).toBe('number');
    });

    it('returns a hash starting with the required leading zeros for difficulty 1', async () => {
      const block = { index: 0, previousHash: '0', timestamp: 1000, data: 'test' };
      const result = await mine(block, 1);
      expect(result.hash.startsWith('0')).toBe(true);
    });

    it('returns a hash starting with the required leading zeros for difficulty 2', async () => {
      const block = { index: 0, previousHash: '0', timestamp: 1000, data: 'test' };
      const result = await mine(block, 2);
      expect(result.hash.startsWith('00')).toBe(true);
    });

    it('returns a hash starting with the required leading zeros for difficulty 3', async () => {
      const block = { index: 1, previousHash: 'abc123', timestamp: 2000, data: 'data' };
      const result = await mine(block, 3);
      expect(result.hash.startsWith('000')).toBe(true);
    });

    it('returns a valid 64-character hex hash', async () => {
      const block = { index: 0, previousHash: '0', timestamp: 1000, data: 'test' };
      const result = await mine(block, 1);
      expect(result.hash).toMatch(/^[0-9a-f]{64}$/);
    });

    it('returns a non-negative nonce', async () => {
      const block = { index: 0, previousHash: '0', timestamp: 1000, data: 'test' };
      const result = await mine(block, 1);
      expect(result.nonce).toBeGreaterThanOrEqual(0);
    });
  });
});
