import React, { useState } from "react";
import swal from "sweetalert";

const EditColor = ({ color, saveEdit, removeEdit, cancelEdit }) => {
  const [editedDescription, setEditedDescription] = useState(color.description);
  const [editedColor, setEditedColor] = useState(color.color);

  const handleSaveEdit = () => {
    saveEdit(color.id, editedDescription, editedColor);
  };

  const handleRemoveColor = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, this color will be removed from your favorites.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        removeEdit(color.id);
        swal("Your color has been deleted!", {
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <div className="isolate -space-y-px rounded-md text-left w-full p-5">
        <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-ce-blue">
          <label
            htmlFor="name"
            className="block text-xs font-medium text-gray-900"
          >
            Description
          </label>
          <textarea
            rows={2}
            name="comment"
            id="comment"
            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 resize-none focus:outline-none"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        </div>
        <div
          className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-ce-blue"
          style={{ backgroundColor: editedColor }}
        >
          <label
            htmlFor="job-title"
            className="block text-xs font-medium text-gray-900"
          >
            Color (#HEX or Name)
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 bg-transparent"
            value={editedColor}
            onChange={(e) => setEditedColor(e.target.value)}
          />
        </div>
        <div className="gap-x-6 pt-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={cancelEdit}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveEdit}
            className="rounded-md bg-white border-ce border ml-5 px-3 py-2 text-sm font-semibold text-ce shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>

          <button
            type="button"
            onClick={handleRemoveColor}
            className="rounded-md bg-white float-right px-3 py-2 text-sm font-semibold text-red-500 hover:bg-ce-darkOrange hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <i className="fa-light fa-trash"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default EditColor;
