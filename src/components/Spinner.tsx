import React from "react";
import { CgSpinner } from "react-icons/cg";

interface SpinnerProps {
  size?: number;
  style?: React.CSSProperties;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 25, style }) => {
  return (
    <CgSpinner
      style={style}
      size={size}
      className="text-black dark:text-white animate-spin"
    />
  );
};

export default Spinner;
