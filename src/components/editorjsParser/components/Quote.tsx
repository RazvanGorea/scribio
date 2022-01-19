import React from "react";
import HtmlParser from "react-html-parser";

interface QuoteProps {
  text: string;
  caption?: string;
}

const Quote: React.FC<QuoteProps> = ({ text, caption }) => {
  return (
    <div className="mb-4">
      <blockquote style={{ marginBottom: 0 }}>
        <p style={{ marginBottom: 0 }}>{HtmlParser(text)}</p>
      </blockquote>
      {caption && <i>-{HtmlParser(caption)}-</i>}
    </div>
  );
};

export default Quote;
