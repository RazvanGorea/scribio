import React, { useState } from "react";
import { IconType } from "react-icons";

interface TabItem {
  text: string;
  icon?: IconType;
}

type TabProps = TabItem & {
  onClick: () => void;
  innerWidth: number;
};

interface TabsProps {
  items: TabItem[];
  onChange: (selectedTabIndex: number) => void;
}

const getLongestTabTextLength = (items: TabItem[]) => {
  let length = 0;

  items.forEach((item) => {
    const textLength = item.text.length;

    if (textLength > length) length = textLength;
  });

  return length;
};

const Tabs: React.FC<TabsProps> = ({ items, onChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabWidthInChars = getLongestTabTextLength(items);

  const handleChange = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      onChange(index);
    }
  };

  return (
    <div className="w-fit">
      <div className="flex">
        {items.map((item, i) => (
          <Tab
            onClick={() => handleChange(i)}
            key={i}
            text={item.text}
            // Used to equalise all tabs width
            innerWidth={tabWidthInChars}
          />
        ))}
      </div>
      <div
        className="transition-all rounded bg-slate-800 dark:bg-slate-400"
        style={{
          height: 2,
          width: `${100 / items.length}%`,
          transform: `translate(${100 * activeIndex}%)`,
        }}
      />
    </div>
  );
};

const Tab: React.FC<TabProps> = ({ text, icon, onClick, innerWidth }) => (
  <div
    onClick={onClick}
    className={`px-3 py-2 transition-colors bg-black bg-opacity-0 rounded cursor-pointer hover:bg-opacity-5 flex justify-center`}
  >
    <span style={{ width: `${innerWidth}ch` }} className="block text-center">
      {text}
    </span>
  </div>
);

export default Tabs;
