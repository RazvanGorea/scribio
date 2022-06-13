import React from "react";
import Link from "next/link";
import Spinner from "../Spinner";
import { IconType } from "react-icons";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
  sm?: boolean;
  active?: boolean;
  icon?: IconType;
  color?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  style,
  disabled = false,
  loading = false,
  href,
  type = "button",
  sm = false,
  active = false,
  icon,
  color,
}) => {
  const IconComp = icon;

  const button = (
    <button
      type={type}
      disabled={disabled || loading}
      style={{ ...style, borderColor: color }}
      onClick={onClick}
      className={`relative ${
        sm ? "px-3" : "px-5"
      } py-1 text-base font-semibold transition bg-black ${
        active
          ? "bg-opacity-10 dark:bg-opacity-10"
          : "bg-opacity-0 dark:bg-opacity-0"
      } border-2 border-black rounded dark:border-white dark:bg-white ${
        !loading
          ? "dark:hover:bg-opacity-20 hover:bg-opacity-10 dark:active:bg-opacity-40 active:bg-opacity-25 cursor-pointer dark:cursor-pointer"
          : "cursor-default dark:cursor-default"
      } disabled:bg-opacity-40 disabled:hover:bg-opacity-40 disabled:active:bg-opacity-40 disabled:bg-slate-600 dark:disabled:bg-opacity-30 dark:disabled:hover:bg-opacity-30 dark:disabled:active:bg-opacity-30 dark:disabled:bg-white disabled:cursor-not-allowed dark:disabled:cursor-not-allowed`}
    >
      <span
        style={{ color: color }}
        className={`text-black dark:text-white transition-opacity flex items-center ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {IconComp && <IconComp style={{ marginRight: 7 }} />}
        {children}
      </span>
      {loading && (
        <Spinner
          style={{
            position: "absolute",
            top: "calc( 50% - 25px / 2 )",
            left: "calc( 50% - 25px / 2 )",
          }}
        />
      )}
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

export default Button;
