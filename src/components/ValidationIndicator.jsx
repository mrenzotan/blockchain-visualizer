/** Displays a styled badge indicating whether the blockchain is currently valid or invalid. */
export default function ValidationIndicator({ validationResult }) {
  const isValid = validationResult.isValid;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${
        isValid
          ? 'bg-cyber-green/10 text-cyber-green border border-cyber-green/20'
          : 'bg-cyber-red/10 text-cyber-red border border-cyber-red/20'
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {isValid ? (
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" />
        ) : (
          <>
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </>
        )}
      </svg>
      {isValid ? 'Chain Valid' : 'Chain Invalid'}
    </span>
  );
}
