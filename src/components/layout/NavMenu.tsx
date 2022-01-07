import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import IconButton from "../form/IconButton";

interface NavMenuProps {
  visible: boolean;
  onClose: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ visible, onClose }) => {
  return (
    <>
      <div
        className={`fixed top-0 z-10 h-screen overflow-y-auto shadow-xl w-60 bg-white dark:bg-gray-700 transition-all ${
          visible ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <div className="flex px-6 py-3 space-x-2 border-b-2 dark:border-gray-600">
          <IconButton onClick={onClose}>
            <GiHamburgerMenu size={25} className="text-black dark:text-white" />
          </IconButton>
          <Link href="/">
            <a
              onClick={onClose}
              className="text-3xl text-gray-500 select-none hover:text-black dark:hover:text-white dark:text-gray-200"
            >
              Scribio
            </a>
          </Link>
        </div>
      </div>
      <div
        onClick={onClose}
        style={{ zIndex: 5 }}
        className={`fixed top-0 left-0 w-full h-screen bg-black transition-all ${
          visible ? "visible opacity-50" : "invisible opacity-0"
        }`}
      />
    </>
  );
};

export default NavMenu;
