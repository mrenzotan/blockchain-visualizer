import SHA256 from 'crypto-js/sha256';

/** Computes a SHA-256 hash from a block's properties by concatenating them into a single input string. */
export function calculateBlockHash(index, previousHash, timestamp, data, nonce) {
  const input = String(index) + String(previousHash) + String(timestamp) + String(data) + String(nonce);
  return SHA256(input).toString();
}
