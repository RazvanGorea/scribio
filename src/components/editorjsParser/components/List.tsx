import React from "react";
import HtmlParser from "react-html-parser";

interface ListProps {
  style: "ordered" | "unordered";
  items: string[];
}

const List: React.FC<ListProps> = ({ style, items }) => {
  const list = items.map((item, i) => <li key={i}>{HtmlParser(item)}</li>);

  return style === "ordered" ? <ol>{list}</ol> : <ul>{list}</ul>;
};

export default List;
