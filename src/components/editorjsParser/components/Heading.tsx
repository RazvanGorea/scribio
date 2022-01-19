import React from "react";
import HtmlParser from "react-html-parser";

interface HeadingProps {
  level: number;
  text: string;
}

const Heading: React.FC<HeadingProps> = ({ level, text }) => {
  const parsedText = HtmlParser(text);

  switch (level) {
    case 1:
      return <h1>{parsedText}</h1>;
    case 2:
      return <h2>{parsedText}</h2>;
    case 3:
      return <h3>{parsedText}</h3>;
    case 4:
      return <h4>{parsedText}</h4>;
    case 5:
      return <h5>{parsedText}</h5>;
    case 6:
      return <h6>{parsedText}</h6>;

    default:
      return <h1>{parsedText}</h1>;
  }
};

export default Heading;
