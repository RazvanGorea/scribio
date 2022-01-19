import React from "react";
import { CgClose } from "react-icons/cg";
import { FiCheck } from "react-icons/fi";

interface Item {
  checked: boolean;
  text: string;
}

interface ChecklistProps {
  items: Item[];
}

const Checklist: React.FC<ChecklistProps> = ({ items }) => {
  return (
    <ul style={{ paddingLeft: 0 }}>
      {items.map((item, i) => (
        <li style={{ display: "flex", alignItems: "center" }} key={i}>
          {item.checked ? (
            <FiCheck size={25} className="mx-1 text-green-500" />
          ) : (
            <CgClose size={25} className="mx-1 text-red-500" />
          )}
          <span className="ml-2">{item.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default Checklist;
