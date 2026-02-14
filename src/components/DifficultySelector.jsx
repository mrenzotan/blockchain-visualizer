export default function DifficultySelector({ difficulty, setDifficulty }) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Difficulty</h2>
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              difficulty === level
                ? 'bg-zinc-900 text-white shadow-md'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}
