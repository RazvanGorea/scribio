import React, { memo, useState } from "react";
import IconButton from "./IconButton";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface InputProps {
  value: string;
  name: string;
  id?: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required: boolean;
  error?: string | false;
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
      <div className="relative flex items-center justify-end w-full">
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
        />
        {type === "password" && (
          <IconButton
            style={{ position: "absolute", right: 0 }}
            onClick={() => setVisible((val) => !val)}
            shape="square"
          >
            {visible ? (
              <AiFillEye className="text-black dark:text-white " size={23} />
            ) : (
              <AiFillEyeInvisible
                className="text-black dark:text-white opacity-80"
                size={23}
              />
            )}
          </IconButton>
        )}
      </div>
      {error && typeof error === "string" && (
        <span className="block text-red-500">{error}</span>
      )}
    </div>
  );
};

export default memo(Input);
