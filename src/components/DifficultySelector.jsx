/** Renders a range slider for adjusting the mining difficulty level from 1 (easy) to 4 (hard). */
export default function DifficultySelector({ difficulty, setDifficulty }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider">Difficulty</h3>
        <span className="text-sm font-mono font-semibold text-cyber-amber">{difficulty}</span>
      </div>
      <input
        type="range"
        min="1"
        max="4"
        step="1"
        value={difficulty}
        onChange={(e) => setDifficulty(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-dark-500
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyber-amber
          [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(245,158,11,0.4)]
          [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-shadow
          [&::-webkit-slider-thumb]:hover:shadow-[0_0_12px_rgba(245,158,11,0.6)]
          [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-cyber-amber [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:cursor-pointer"
      />
      <div className="flex justify-between text-xs text-slate-500">
        <span>Easy</span>
        <span>Hard</span>
      </div>
    </div>
  );
}
