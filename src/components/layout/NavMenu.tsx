import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import IconButton from "../form/IconButton";
import NavMenuItem from "../NavMenuItem";
import { IoMdExit } from "react-icons/io";
import {
  AiOutlineHome,
  AiOutlineClockCircle,
  AiOutlineLike,
} from "react-icons/ai";
import {
  MdOutlineSubscriptions,
  MdHistory,
  MdOutlineLibraryBooks,
} from "react-icons/md";
import { BiLibrary } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

interface NavMenuProps {
  visible: boolean;
  onClose: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ visible, onClose }) => {
  const { logout } = useAuth();

  const router = useRouter();

  const navigateHome = (path: string) => {
    onClose(); // Close menu
    router.push(path); // Navigate to path
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
              onClick={() => navigateHome("/")}
              className="text-3xl text-gray-500 select-none hover:text-black dark:hover:text-white dark:text-gray-200"
            >
              Scribio
            </a>
          </Link>
        </div>
        <nav>
          <ul>
            <NavMenuItem
              icon={AiOutlineHome}
              text="Home"
              onClick={() => navigateHome("/")}
            />
            <NavMenuItem
              icon={MdOutlineSubscriptions}
              text="Follows"
              onClick={() => navigateHome("/")}
            />
            <NavMenuItem
              icon={BiLibrary}
              text="Library"
              onClick={() => navigateHome("/")}
            />
            <NavMenuItem
              icon={MdHistory}
              text="History"
              onClick={() => navigateHome("/history")}
            />
            <NavMenuItem
              icon={MdOutlineLibraryBooks}
              text="Your posts"
              onClick={() => navigateHome("/")}
            />
            <NavMenuItem
              icon={AiOutlineClockCircle}
              text="Read later"
              onClick={() => navigateHome("/")}
            />
            <NavMenuItem
              icon={AiOutlineLike}
              text="Liked"
              onClick={() => navigateHome("/")}
            />
            <NavMenuItem
              icon={IoMdExit}
              text="Log Out"
              onClick={() => {
                onClose();
                logout();
              }}
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
