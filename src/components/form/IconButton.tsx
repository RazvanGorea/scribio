import Link from "next/link";
import React, { memo } from "react";
import { IconType } from "react-icons";

interface IconButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  href?: string;
  shape?: "square" | "circle";
  icon: IconType;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  style,
  shape = "circle",
  href,
}) => {
  const IconComp = icon;
  const isCircle = shape === "circle";

  const button = (
    <button
      style={style}
      onClick={onClick}
      className={`${
        isCircle ? "rounded-full" : "rounded"
      } cursor-pointer bg-black dark:bg-white dark:bg-opacity-0 dark:hover:bg-opacity-10 p-2 bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-25 dark:active:bg-opacity-25 transition-colors ease-out`}
    >
      <IconComp size={25} className="text-black dark:text-white" />
    </button>
  );

  return href ? (
    <Link href={href}>
      <a>{button}</a>
    </Link>
  ) : (
    button
  );
};

export default memo(IconButton);