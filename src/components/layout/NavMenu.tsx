import Link from "next/link";
import React, { useLayoutEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import IconButton from "../form/IconButton";
import NavMenuItem from "../NavMenuItem";
import { IoMdExit } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { MdHistory, MdOutlineLibraryBooks, MdTurnedIn } from "react-icons/md";
import { BiLibrary } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import FollowItem from "../FollowItem";
import { useTheme } from "../../context/ThemeContext";

import DotsLoading from "../DotsLoading";

interface NavMenuProps {
  visible: boolean;
  onClose: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ visible, onClose }) => {
  const { logout, isUserInitialized, followings } = useAuth();
  const { isDark } = useTheme();

  const headerRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState("auto");

  const router = useRouter();

  useLayoutEffect(() => {
    if (!headerRef.current) return;

    setNavHeight(`calc( 100% - ${headerRef.current.offsetHeight}px )`);
  }, []);

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
        <div
          ref={headerRef}
          className="flex px-6 py-3 space-x-2 border-b-2 dark:border-gray-600"
        >
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
        <nav style={{ height: navHeight }}>
          <ul className="flex flex-col h-full">
            <NavMenuItem
              onClick={onClose}
              icon={AiOutlineHome}
              text="Home"
              href="/"
            />
            <NavMenuItem
              onClick={onClose}
              icon={MdHistory}
              text="History"
              href="/history"
            />
            <NavMenuItem
              icon={MdOutlineLibraryBooks}
              text="Your posts"
              onClick={() => navigateHome("/")}
            />
            <NavMenuItem
              icon={MdTurnedIn}
              text="Saves"
              onClick={() => navigateHome("/")}
            />

            <div>
              <h6 className="pl-4">
                {followings && followings.length === 0
                  ? "No follows"
                  : "Follows"}
              </h6>
              {followings
                ? followings.map((item) => (
                    <FollowItem
                      onClick={onClose}
                      key={item._id}
                      avatar={item.avatar}
                      href={`/profile/${item._id}`}
                      username={item.username}
                    />
                  ))
                : isUserInitialized && <DotsLoading />}
            </div>
            {isUserInitialized && (
              <NavMenuItem
                style={{
                  marginTop: "auto",
                  borderTop: `2px solid ${isDark ? "#4b5563" : "#e5e7eb"}`,
                }}
                icon={IoMdExit}
                text="Log Out"
                onClick={() => {
                  onClose();
                  logout();
                }}
              />
            )}
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
