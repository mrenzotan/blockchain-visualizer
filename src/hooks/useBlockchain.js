import { useState, useCallback } from 'react';
import { Blockchain } from '../models/Blockchain.js';
import { Block } from '../models/Block.js';
import { mine } from '../services/miningService.js';

export function useBlockchain() {
  const [blockchain, setBlockchain] = useState(() => new Blockchain());
  const [isMining, setIsMining] = useState(false);
  const [miningProgress, setMiningProgress] = useState(null);
  const [lastMineTime, setLastMineTime] = useState(null);

  const validationResult = blockchain.validateChain();

  const triggerUpdate = useCallback((bc) => {
    const updated = Object.assign(Object.create(Object.getPrototypeOf(bc)), bc);
    updated.chain = [...bc.chain];
    setBlockchain(updated);
  }, []);

  const addBlock = useCallback(async (data) => {
    if (!data || !data.trim()) return;
    if (isMining) return;

    setIsMining(true);
    setLastMineTime(null);

    try {
      const prevBlock = blockchain.chain[blockchain.chain.length - 1];
      const newBlock = new Block({
        index: blockchain.chain.length,
        timestamp: Date.now(),
        data: data.trim(),
        previousHash: prevBlock.hash,
      });

      const result = await mine(newBlock, blockchain.difficulty);
      newBlock.nonce = result.nonce;
      newBlock.hash = result.hash;
      blockchain.chain.push(newBlock);
      setLastMineTime(result.durationMs);
      triggerUpdate(blockchain);
    } finally {
      setIsMining(false);
    }
  }, [blockchain, isMining, triggerUpdate]);

  const editBlockData = useCallback((blockIndex, newData) => {
    const block = blockchain.chain[blockIndex];
    if (!block) return;
    block.data = newData;
    triggerUpdate(blockchain);
  }, [blockchain, triggerUpdate]);

  const remineBlock = useCallback(async (blockIndex) => {
    if (isMining) return;
    const block = blockchain.chain[blockIndex];
    if (!block) return;

    setIsMining(true);
    setLastMineTime(null);

    try {
      if (blockIndex > 0) {
        block.previousHash = blockchain.chain[blockIndex - 1].hash;
      }
      const result = await mine(block, blockchain.difficulty);
      block.nonce = result.nonce;
      block.hash = result.hash;
      setLastMineTime(result.durationMs);
      triggerUpdate(blockchain);
    } finally {
      setIsMining(false);
    }
  }, [blockchain, isMining, triggerUpdate]);

  const autoMine = useCallback(async (count) => {
    if (isMining || count < 1) return;

    setIsMining(true);
    setLastMineTime(null);
    setMiningProgress({ current: 0, total: count });

    try {
      for (let i = 0; i < count; i++) {
        setMiningProgress({ current: i + 1, total: count });
        const prevBlock = blockchain.chain[blockchain.chain.length - 1];
        const newBlock = new Block({
          index: blockchain.chain.length,
          timestamp: Date.now(),
          data: `Transaction #${i + 1}`,
          previousHash: prevBlock.hash,
        });

        const result = await mine(newBlock, blockchain.difficulty);
        newBlock.nonce = result.nonce;
        newBlock.hash = result.hash;
        blockchain.chain.push(newBlock);
        triggerUpdate(blockchain);
      }
    } finally {
      setIsMining(false);
      setMiningProgress(null);
    }
  }, [blockchain, isMining, triggerUpdate]);

  const setDifficulty = useCallback((level) => {
    const d = Number(level);
    if (!Number.isInteger(d) || d < 1 || d > 4) return;
    blockchain.difficulty = d;
    triggerUpdate(blockchain);
  }, [blockchain, triggerUpdate]);

  const resetChain = useCallback(() => {
    const fresh = new Blockchain();
    fresh.difficulty = blockchain.difficulty;
    setBlockchain(fresh);
    setIsMining(false);
    setMiningProgress(null);
    setLastMineTime(null);
  }, [blockchain.difficulty]);

  return {
    blockchain,
    isMining,
    miningProgress,
    lastMineTime,
    validationResult,
    addBlock,
    editBlockData,
    remineBlock,
    autoMine,
    setDifficulty,
    resetChain,
  };
}
