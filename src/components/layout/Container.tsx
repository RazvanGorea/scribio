import React from "react";

interface ContainerProps {}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="mx-auto max-w-7xl px-2">{children}</div>;
};

export default Container;
