import React from "react";

interface CodeProps {
  code: string;
}

const Code: React.FC<CodeProps> = ({ code }) => {
  return (
    <pre className="break-all whitespace-pre-wrap">
      <code className="language-html">{code}</code>
    </pre>
  );
};

export default Code;
