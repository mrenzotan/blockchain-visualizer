export default function ValidationIndicator({ validationResult }) {
  const isValid = validationResult.isValid;

  return (
    <span
      className={`inline-flex px-3 py-1.5 rounded-lg text-sm font-semibold text-white ${
        isValid ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      {isValid ? 'Chain Valid' : 'Chain Invalid'}
    </span>
  );
}
