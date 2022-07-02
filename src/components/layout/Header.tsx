import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import IconButton from "../form/IconButton";
import NavMenu from "./NavMenu";
import { useTheme } from "../../context/ThemeContext";
import Button from "../form/Button";
import { AiFillFileAdd } from "react-icons/ai";
import Unauthenticated from "../Unauthenticated";
import SearchBox from "../SearchBox";
import Authenticated from "../Authenticated";
import Headroom from "react-headroom";
import Avatar from "../imageRelated/Avatar";
import { useAuth } from "../../context/AuthContext";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  // Nav menu visibility state
  const [visible, setVisible] = useState(false);
  const { isDark, toggle } = useTheme();
  const { user } = useAuth();

  return (
    <>
      <NavMenu onClose={() => setVisible(false)} visible={visible} />
      <Headroom style={{ zIndex: 2 }}>
        <header className="sticky flex items-center justify-between w-full px-2 py-3 bg-white shadow-lg header dark:bg-gray-700">
          <div className="flex space-x-2">
            <IconButton
              icon={GiHamburgerMenu}
              onClick={() => setVisible(true)}
            />
            <Link href="/">
              <a className="hidden text-3xl text-gray-500 select-none sm:block hover:text-black dark:hover:text-white dark:text-gray-200">
                Scribio
              </a>
            </Link>
          </div>
          <SearchBox />

          <div className="flex items-center space-x-2">
            <Authenticated>
              <div className="hidden sm:block">
                <IconButton
                  icon={AiFillFileAdd}
                  shape="square"
                  href="/post/new"
                />
              </div>
            </Authenticated>

            <div className="hidden sm:block">
              <IconButton
                icon={isDark ? BsFillMoonFill : BsFillSunFill}
                onClick={toggle}
                shape="square"
              />
            </div>
            {user && (
              <Link href={`/profile/${user._id}`}>
                <a>
                  <Avatar src={user.avatar} />
                </a>
              </Link>
            )}
            <Unauthenticated>
              <Button style={{ whiteSpace: "nowrap" }} sm href="/logIn">
                Log In
              </Button>
            </Unauthenticated>
          </div>
        </header>
      </Headroom>
    </>
  );
};

export default Header;
