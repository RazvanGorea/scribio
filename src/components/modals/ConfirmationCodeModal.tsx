import React, { memo, useState } from "react";
import ConfirmCodeForm from "../forms/ConfirmCodeForm";
import Modal from "../layout/Modal";

interface ConfirmationCodeModalProps {
  heading: string;
  description: string;
  visible: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

const ConfirmationCodeModal: React.FC<ConfirmationCodeModalProps> = ({
  heading,
  description,
  visible,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal withCross visible={visible} onClose={onClose}>
      <div className="flex justify-center">
        <ConfirmCodeForm
          heading={heading}
          description={description}
          onSubmit={onSubmit}
        />
      </div>
    </Modal>
  );
};

export default memo(ConfirmationCodeModal);
