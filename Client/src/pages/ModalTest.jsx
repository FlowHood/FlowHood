import React, { useState } from "react";
import Modal from "../components/Modal";

const ModalTest = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    console.log("Confirmed!");
    handleCloseModal();
  };

  return (
    <div>
      <h1>React Modal Example</h1>
      <button onClick={handleOpenModal}>Open Modal</button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title="¿Quieres crear la solicitud de invitación?"
        description="This is a description for the modal."
      />
    </div>
  );
};

export default ModalTest;
