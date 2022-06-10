import React, { memo } from "react";

interface TextareaProps {
  value: string;
  name: string;
  id?: string;
  label?: string;
  rows?: number;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const Textarea: React.FC<TextareaProps> = ({
  value,
  name,
  id,
  label,
  rows = 4,
  placeholder,
  onChange,
}) => {
  return (
    <div>
      {label && (
        <label className="text-black dark:text-white" htmlFor={id || name}>
          {label}
        </label>
      )}
      <textarea
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="block border-black transition p-2.5 w-full text-sm text-gray-900 rounded-lg border  focus:ring-black focus:border-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white dark:bg-gray-600 dark:bg-opacity-25 dark:focus:bg-opacity-80 bg-white bg-opacity-25 focus:bg-opacity-100"
        value={value}
        name={name}
        id={id || name}
      />
    </div>
  );
};

export default memo(Textarea);
