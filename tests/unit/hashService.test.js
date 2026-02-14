import { describe, it, expect } from 'vitest';
import { calculateBlockHash } from '../../src/services/hashService.js';

describe('hashService', () => {
  describe('calculateBlockHash', () => {
    it('returns a 64-character lowercase hex string', () => {
      const hash = calculateBlockHash(0, '0', 1000, 'test', 0);
      expect(hash).toMatch(/^[0-9a-f]{64}$/);
    });

    it('is deterministic — same inputs produce the same output', () => {
      const hash1 = calculateBlockHash(0, '0', 1000, 'test', 0);
      const hash2 = calculateBlockHash(0, '0', 1000, 'test', 0);
      expect(hash1).toBe(hash2);
    });

    it('produces different outputs for different inputs', () => {
      const hash1 = calculateBlockHash(0, '0', 1000, 'data1', 0);
      const hash2 = calculateBlockHash(0, '0', 1000, 'data2', 0);
      expect(hash1).not.toBe(hash2);
    });

    it('produces different outputs when nonce changes', () => {
      const hash1 = calculateBlockHash(0, '0', 1000, 'test', 0);
      const hash2 = calculateBlockHash(0, '0', 1000, 'test', 1);
      expect(hash1).not.toBe(hash2);
    });

    it('coerces all parameters to strings', () => {
      // Should not throw when given numeric values
      const hash = calculateBlockHash(0, '0', 1234567890, 'data', 42);
      expect(hash).toMatch(/^[0-9a-f]{64}$/);
    });
  });
});
