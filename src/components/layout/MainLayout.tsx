import React from "react";
import Header from "./Header";
import Page from "./Page";

interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Page>{children}</Page>
    </>
  );
};

export default MainLayout;
