export default function SuccessToast({ message, onClose }) {
  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in">
      <div className="bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3">
        <span className="text-lg">✅</span>
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-3 text-white text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
