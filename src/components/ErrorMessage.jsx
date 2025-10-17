function ErrorMessage({ message }) {
  return (
    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-2xl p-3">
      <div className="flex items-center gap-3 justify-center">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="font-semibold text-lg">{message}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;