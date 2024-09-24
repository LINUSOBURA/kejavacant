"use client"; // Since you're dealing with client-side actions like showing modals

import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import Modal from "./Modal"; // Import the Modal component
import EditHouseForm from "./house-update"; // Import the form

function HouseTable({ house }) {
  const [showModal, setShowModal] = useState(false); // Track modal visibility

  return (
    <>
      {/* Button to open the modal */}
      <button onClick={() => setShowModal(true)}>
        <CiEdit />
      </button>

      {/* Modal for Editing House */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {/* Passing the house_id to the EditHouseForm */}
        <EditHouseForm
          house_id={house.house_id}
          onClose={() => setShowModal(false)}
        />
      </Modal>
    </>
  );
}

export default HouseTable;
