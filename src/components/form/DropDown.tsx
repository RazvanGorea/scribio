import React, { memo, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Button from "./Button";
import ClickAwayListener from "react-click-away-listener";

interface DropDownProps {
  emptyText?: string;
  items: string[];
  defaultSelect?: string;
  onSelect?: (itemText: string, itemIndex: number) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  emptyText = "Select an option",
  defaultSelect,
  items,
  onSelect,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    defaultSelect
  );
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (itemText: string, itemIndex: number) => {
    setOpen(false);
    setSelectedItem(itemText);
    if (onSelect) onSelect(itemText, itemIndex);
  };

  const onClickAway = () => {
    if (open) setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div ref={containerRef}>
        <Button style={{ border: 0 }} sm onClick={() => setOpen((val) => !val)}>
          {selectedItem || emptyText}
          <MdKeyboardArrowDown
            className={`w-6 h-6 ml-1 transition-transform ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </Button>
        <div
          style={{
            // Set menu width same as container
            minWidth: containerRef.current
              ? containerRef.current.offsetWidth
              : "initial",
          }}
          className={`${
            open
              ? "visible opacity-100 translate-y-0"
              : "-translate-y-2 opacity-0 invisible"
          } transition-all z-10 bg-white divide-y divide-gray-100 rounded shadow  dark:bg-gray-700 absolute`}
        >
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            {open &&
              items.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSelect(item, index)}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {item}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default memo(DropDown);
