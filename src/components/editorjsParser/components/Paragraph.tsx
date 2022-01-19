import React from "react";
import HtmlParser from "react-html-parser";

interface ParagraphProps {
  text: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ text }) => {
  return <p>{HtmlParser(text)}</p>;
};

export default Paragraph;
