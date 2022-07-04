import React from "react";
import HtmlParser from "react-html-parser";

interface TableProps {
  content: string[][];
}

const Table: React.FC<TableProps> = ({ content }) => {
  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            {content[0].map((item, i) => (
              <th key={i}>{HtmlParser(item)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.map((row, index) => {
            if (index === 0) return; // Skip first row

            return (
              <tr key={index}>
                {row.map((item, i) => (
                  <td key={i}>{HtmlParser(item)}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
