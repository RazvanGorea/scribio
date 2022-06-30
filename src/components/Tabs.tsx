import React, { memo, useState } from "react";
import { IconType } from "react-icons";

interface TabItem {
  text: string;
  value: string;
  icon?: IconType;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  fullWidth?: boolean;
  onChange: (selectedTabValue: string) => void;
}

const getLongestTabTextLength = (items: TabItem[]) => {
  let length = 0;

  items.forEach((item) => {
    const textLength = item.text.length;

    if (textLength > length) length = textLength;
  });

  return length;
};

const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  fullWidth = false,
  onChange,
}) => {
  const activeIndex = items.findIndex((item) => item.value === value);
  const minTabTextLength = getLongestTabTextLength(items);
  const tabWidth = 100 / items.length + "%";

  const handleChange = (newVal: string) => {
    if (value !== newVal) {
      onChange(newVal);
    }
  };

  return (
    <div className={fullWidth ? "w-full" : "w-fit"}>
      <div className={`flex ${fullWidth ? "w-full" : ""}`}>
        {items.map((item, i) => (
          <Tab
            onClick={() => handleChange(item.value)}
            key={item.value}
            text={item.text}
            // Used to equalise all tabs width
            width={tabWidth}
            minTextLength={minTabTextLength}
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

type TabProps = Omit<
  TabItem & {
    onClick: () => void;
    minTextLength: number;
    width: string | number;
  },
  "value"
>;

const Tab: React.FC<TabProps> = ({
  text,
  icon,
  onClick,
  minTextLength,
  width,
}) => (
  <div
    style={{ width }}
    onClick={onClick}
    className={`px-3 py-2 transition-colors bg-black bg-opacity-0 rounded cursor-pointer hover:bg-opacity-5 flex justify-center`}
  >
    <span style={{ width: minTextLength + "ch" }} className="block text-center">
      {text}
    </span>
  </div>
);

export default memo(Tabs);
