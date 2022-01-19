import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import IconButton from "../form/IconButton";
import NavMenuItem from "../NavMenuItem";
import { IoMdExit } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";

interface NavMenuProps {
  visible: boolean;
  onClose: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ visible, onClose }) => {
  const { logout } = useAuth();

  const handleClick = (c?: () => void) => {
    if (c) c();
    onClose();
  };

  return (
    <>
      <aside
        className={`fixed top-0 z-10 h-screen overflow-y-auto shadow-xl w-60 bg-white dark:bg-gray-700 transition-all ${
          visible ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <div className="flex px-6 py-3 space-x-2 border-b-2 dark:border-gray-600">
          <IconButton icon={GiHamburgerMenu} onClick={onClose} />
          <Link href="/">
            <a
              onClick={() => handleClick()}
              className="text-3xl text-gray-500 select-none hover:text-black dark:hover:text-white dark:text-gray-200"
            >
              Scribio
            </a>
          </Link>
        </div>
        <nav>
          <ul>
            <NavMenuItem
              icon={IoMdExit}
              text="Log out"
              onClick={() => handleClick(logout)}
            />
          </ul>
        </nav>
      </aside>
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
