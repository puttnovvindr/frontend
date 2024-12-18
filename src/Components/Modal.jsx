import React from 'react';

const Modal = ({ title, content, inputValue, onInputChange, onCancel, onConfirm, confirmText }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        {content && <p className="mb-4">{content}</p>}
        {inputValue && (
          <input
            type="text"
            className="border p-2 rounded w-full mb-4"
            value={inputValue}
            onChange={onInputChange}
            placeholder="Enter group name"
          />
        )}
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded text-gray-700 hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
