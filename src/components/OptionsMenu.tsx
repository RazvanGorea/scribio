import React, { memo, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { IconType } from "react-icons";
import IconButton from "./form/IconButton";
import { GoKebabVertical } from "react-icons/go";

export interface MenuOption {
  icon?: IconType;
  text: string;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface OptionsMenuProps {
  items: MenuOption[];
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ items }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((val) => !val);

  const onClickAway = () => {
    if (open) setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div>
        <IconButton onClick={toggle} icon={GoKebabVertical} />
        <div
          className={`${
            open
              ? "visible opacity-100 translate-y-0"
              : "-translate-y-2 opacity-0 invisible"
          } transition-all z-10 bg-white divide-y divide-gray-100 rounded shadow  dark:bg-gray-700 absolute`}
        >
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            {open &&
              items.map((item, index) => {
                const Icon = item.icon;

                return (
                  <li key={index}>
                    <button
                      style={{ color: item.color }}
                      onClick={(e) => {
                        setOpen(false);
                        item.onClick && item.onClick(e);
                      }}
                      className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {Icon && <Icon className="mr-2" />}
                      {item.text}
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default memo(OptionsMenu);
