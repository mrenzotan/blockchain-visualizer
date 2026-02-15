import { CircleCheck, CircleX } from 'lucide-react';

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
      {isValid ? (
        <CircleCheck size={14} />
      ) : (
        <CircleX size={14} />
      )}
      {isValid ? 'Chain Valid' : 'Chain Invalid'}
    </span>
  );
}
