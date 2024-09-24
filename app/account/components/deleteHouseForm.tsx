"use client";

import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { deleteHouse } from "@/utils/post-ad/handleDeleteHouse";

function DeleteHouseForm({ houseId }) {
  const [loading, setLoading] = useState(false); // Track loading state

  const handleDeleteHouse = async (e, houseId) => {
    e.preventDefault();
    // Ask for confirmation before proceeding
    const confirmed = window.confirm(
      "Are you sure you want to delete this house?"
    );
    if (!confirmed) return;

    setLoading(true); // Set loading to true when the request starts

    deleteHouse(houseId)
      .then((result) => {
        if (result.success) {
          window.location.reload(); // Refresh the page if successful
        } else {
          alert("Failed to delete the house.");
          setLoading(false); // Stop loading if there was an error
        }
      })
      .catch((error) => {
        console.error("Error deleting house:", error);
        alert("An error occurred.");
        setLoading(false); // Stop loading on error
      });
  };

  return (
    <form onSubmit={(e) => handleDeleteHouse(e, houseId)}>
      <button type="submit" disabled={loading} className="flex items-center">
        {loading ? (
          // Show spinner when loading
          <svg
            className="animate-spin h-5 w-5 mr-2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
            ></path>
          </svg>
        ) : (
          <MdDeleteOutline />
        )}
        {loading ? "Deleting..." : ""}
      </button>
    </form>
  );
}

export default DeleteHouseForm;
