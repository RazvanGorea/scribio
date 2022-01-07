import React from "react";

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
  shape?: "square" | "circle";
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  style,
  shape = "circle",
}) => {
  const isCircle = shape === "circle";

  return (
    <div
      style={style}
      onClick={onClick}
      className={`${
        isCircle ? "rounded-full" : "rounded"
      } cursor-pointer bg-black dark:bg-white dark:bg-opacity-0 dark:hover:bg-opacity-10 p-2 bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-25 dark:active:bg-opacity-25 transition-colors ease-out`}
    >
      {children}
    </div>
  );
};

export default IconButton;
