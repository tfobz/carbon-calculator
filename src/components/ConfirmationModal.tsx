import { useEffect } from 'preact/hooks';

interface Props {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDelete?: boolean; // If true, shows red styling
}

export function ConfirmationModal({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDelete = false
}: Props) {

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [onCancel]);

  return (
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <h2 class="text-xl font-bold mb-2">{title}</h2>
        <p class="text-gray-600 text-sm mb-6">{message}</p>

        <div class="flex justify-end gap-3">
          <button 
            onClick={onCancel} 
            class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded font-medium"
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm} 
            class={`px-4 py-2 text-white font-bold rounded ${
              isDelete 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-700 hover:bg-green-800'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
