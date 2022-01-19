import React from "react";
import IconButton from "../form/IconButton";
import { MdClose } from "react-icons/md";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  withCross?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  children,
  onClose,
  withCross = false,
}) => {
  return (
    <div
      onClick={onClose}
      className={`fixed top-0 left-0 z-20 flex items-center justify-center w-full h-screen transition-all filter backdrop-blur ${
        visible
          ? "visible opacity-100 backdrop-brightness-75"
          : "opacity-0 invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-3/4 max-w-4xl p-5 bg-white rounded-lg shadow-lg dark:bg-gray-700"
      >
        {withCross && (
          <IconButton
            style={{ position: "absolute", right: 15, top: 15 }}
            icon={MdClose}
            onClick={onClose}
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
