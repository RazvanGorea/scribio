import React, { useState } from "react";
import Button from "../form/Button";
import Modal from "../layout/Modal";

interface DeleteConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  visible,
  onClose,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);

  const confirmHandler = async () => {
    setLoading(true);
    await onDelete();
    setLoading(false);
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <h2 className="text-center">Are you sure?</h2>
      <div className="flex justify-center mt-5 space-x-3">
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={confirmHandler} loading={loading} color="red">
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
