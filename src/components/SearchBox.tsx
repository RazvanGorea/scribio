import React, { useState, memo } from "react";
import IconButton from "./form/IconButton";
import { BiSearch } from "react-icons/bi";

interface SearchBoxProps {
  onSearch: (searchText: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [value, setValue] = useState("");

  return (
    <div className="flex rounded dark:bg-black bg-slate-300 md:w-96">
      <input
        className="w-full pl-3 text-black bg-transparent outline-none dark:text-white"
        placeholder="Search"
        name="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconButton
        onClick={() => onSearch(value)}
        icon={BiSearch}
        shape="square"
      />
    </div>
  );
};

export default memo(SearchBox);