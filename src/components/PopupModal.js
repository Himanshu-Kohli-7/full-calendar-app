import React from "react";

const PopupModal = ({ popupEvent, onDelete, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-6 shadow-lg w-4/5 sm:w-1/2 lg:w-1/3">
      <h2 className="text-lg font-semibold mb-4 text-center">Delete Event</h2>
      <p className="text-center mb-6">
        Are you sure you want to delete the event{" "}
        <span className="font-bold">{popupEvent.title}</span>?
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default PopupModal;
