import React from "react";

interface ContainerProps {
  sm?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, sm = false }) => {
  return (
    <div
      className={`w-full px-2 mx-auto ${
        sm ? "max-w-screen-lg" : "max-w-screen-2xl"
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
