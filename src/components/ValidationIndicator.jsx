export default function ValidationIndicator({ validationResult }) {
  const isValid = validationResult.isValid;

  return (
    <div
      className={`px-4 py-3 rounded-lg text-sm font-semibold text-white text-center ${
        isValid ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      {isValid ? 'Chain Valid' : 'Chain Invalid'}
    </div>
  );
}
