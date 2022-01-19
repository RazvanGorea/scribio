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
      <Headroom>
        <header className="sticky flex items-center justify-between w-full px-6 py-3 bg-white shadow-lg dark:bg-gray-700 ">
          <div className="flex space-x-2">
            <IconButton
              icon={GiHamburgerMenu}
              onClick={() => setVisible(true)}
            />
            <Link href="/">
              <a className="text-3xl text-gray-500 select-none hover:text-black dark:hover:text-white dark:text-gray-200">
                Scribio
              </a>
            </Link>
          </div>
          <SearchBox onSearch={() => {}} />
          <div className="flex items-center space-x-2">
            <Authenticated>
              <IconButton
                icon={AiFillFileAdd}
                shape="square"
                href="/posts/new"
              />
            </Authenticated>

            <IconButton
              icon={isDark ? BsFillMoonFill : BsFillSunFill}
              onClick={toggle}
              shape="square"
            />
            {user?.avatar && (
              <div>
                <Avatar
                  src={{
                    height: user.avatar.height,
                    width: user.avatar.width,
                    src: user.avatar.url,
                    blurDataURL: user.avatar.placeholder,
                  }}
                />
              </div>
            )}
            <Unauthenticated>
              <Button sm href="/logIn">
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