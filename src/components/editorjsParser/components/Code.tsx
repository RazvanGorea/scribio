import React from "react";

interface CodeProps {
  code: string;
}

const Code: React.FC<CodeProps> = ({ code }) => {
  return (
    <pre>
      <code>{code}</code>
    </pre>
  );
};

export default Code;
