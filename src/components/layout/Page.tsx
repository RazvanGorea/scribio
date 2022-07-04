import React from "react";

interface PageProps {}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <main
      style={{ minHeight: "calc( 100vh - 4.1rem )" }}
      className="w-full py-4 bg-gray-100 dark:bg-gray-800"
    >
      {children}
    </main>
  );
};

export default Page;
