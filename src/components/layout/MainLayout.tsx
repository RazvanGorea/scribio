import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Page from "./Page";

interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Page>{children}</Page>
      <Footer />
    </>
  );
};

export default MainLayout;
