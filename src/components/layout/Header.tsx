import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import IconButton from "../form/IconButton";
import NavMenu from "./NavMenu";
import { useTheme } from "../../context/ThemeContext";
import Button from "../form/Button";
import { useAuth } from "../../context/AuthContext";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  // Nav menu visibility state
  const [visible, setVisible] = useState(false);
  const { isDark, toggle } = useTheme();
  const { logout } = useAuth();

  return (
    <>
      <NavMenu onClose={() => setVisible(false)} visible={visible} />
      <div className="sticky flex items-center justify-between w-full px-6 py-3 bg-white shadow-lg dark:bg-gray-700 ">
        <div className="flex space-x-2">
          <IconButton onClick={() => setVisible(true)}>
            <GiHamburgerMenu size={25} className="text-black dark:text-white" />
          </IconButton>
          <Link href="/">
            <a className="text-3xl text-gray-500 select-none hover:text-black dark:hover:text-white dark:text-gray-200">
              Scribio
            </a>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <IconButton onClick={toggle} shape="square">
            {isDark ? (
              <BsFillMoonFill size={25} className="text-white" />
            ) : (
              <BsFillSunFill size={25} className="text-black" />
            )}
          </IconButton>
          <Button sm href="/logIn">
            Log In
          </Button>
          <Button onClick={logout} sm>
            Log Out
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
