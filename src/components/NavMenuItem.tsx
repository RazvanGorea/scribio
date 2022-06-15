import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface NavMenuItemProps {
  icon: IconType;
  text: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  href?: string;
  style?: React.CSSProperties;
}

const NavMenuItem: React.FC<NavMenuItemProps> = ({
  icon,
  onClick,
  href,
  text,
  style,
}) => {
  const IconComp = icon;

  const item = (
    <div
      onClick={onClick}
      className="flex items-center transition-colors ease-out bg-black bg-opacity-0 cursor-pointer select-none dark:bg-white dark:bg-opacity-0 dark:hover:bg-opacity-10 hover:bg-opacity-10 active:bg-opacity-25 dark:active:bg-opacity-25"
    >
      <IconComp size={25} className="m-3 text-black dark:text-white" />
      <span className="text-black dark:text-white">{text}</span>
    </div>
  );

  return href ? (
    <li style={style}>
      <Link href={href}>
        <a>{item}</a>
      </Link>
    </li>
  ) : (
    <li style={style}>{item}</li>
  );
};

export default NavMenuItem;
