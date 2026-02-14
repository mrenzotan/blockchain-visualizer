import SHA256 from 'crypto-js/sha256';

export function calculateBlockHash(index, previousHash, timestamp, data, nonce) {
  const input = String(index) + String(previousHash) + String(timestamp) + String(data) + String(nonce);
  return SHA256(input).toString();
}
