import React, { memo, useState } from "react";
import IconButton from "./IconButton";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Button from "./Button";

interface InputProps {
  value: string;
  name: string;
  id?: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  error?: string | false;
  rightButton?: {
    text: string;
    loading: boolean;
    disabled: boolean;
  };
  onRightButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  value,
  name,
  label,
  type = "text",
  placeholder,
  id = name,
  required = false,
  error,
  rightButton,
  onRightButtonClick,
  onChange,
  onBlur,
}) => {
  const [visible, setVisible] = useState(!(type === "password"));

  return (
    <div className="w-full">
      {label && (
        <label className="block dark:text-gray-200" htmlFor={id}>
          {required ? label + "*" : label}
        </label>
      )}
      <div
        className={`${
          rightButton ? "" : "items-center"
        } relative flex justify-end w-full`}
      >
        <input
          className={`${
            type === "password" ? "pr-10" : ""
          } w-full transition bg-white bg-opacity-25 rounded focus:bg-opacity-100 ring-0 focus:ring-1 focus:ring-black focus:border-black dark:focus:border-white dark:text-white dark:bg-gray-600 dark:bg-opacity-25 dark:focus:bg-opacity-80 `}
          placeholder={placeholder}
          value={value}
          name={name}
          type={visible && type === "password" ? "text" : type}
          onChange={onChange}
          onBlur={onBlur}
          id={id}
          style={
            rightButton
              ? {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRight: 0,
                }
              : {}
          }
        />
        {rightButton && (
          <Button
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            disabled={rightButton.disabled}
            loading={rightButton.loading}
            onClick={onRightButtonClick}
          >
            {rightButton.text}
          </Button>
        )}
        {type === "password" && (
          <IconButton
            style={{ position: "absolute", right: 0 }}
            onClick={() => setVisible((val) => !val)}
            shape="square"
            icon={visible ? AiFillEye : AiFillEyeInvisible}
          />
        )}
      </div>
      {error && typeof error === "string" && (
        <span className="block text-red-500">{error}</span>
      )}
    </div>
  );
};

export default memo(Input);
