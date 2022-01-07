import React from "react";

interface PageProps {}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <div
      style={{ minHeight: "calc( 100vh - 65px )" }}
      className="grid w-full bg-gray-100 dark:bg-gray-800"
    >
      {children}
    </div>
  );
};

export default Page;
