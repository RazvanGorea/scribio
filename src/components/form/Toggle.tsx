import React, { useState } from "react";

interface ToggleProps {
  id: string;
  initialValue?: boolean;
  value?: boolean;
  onChange?: (newVal: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({
  id,
  initialValue,
  value,
  onChange,
}) => {
  const [checked, setChecked] = useState(initialValue || false);

  const handleChange = () => {
    const newVal = !checked;

    !value && setChecked(newVal);
    onChange && onChange(newVal);
  };

  return (
    <label
      htmlFor={id}
      className="relative inline-flex items-center cursor-pointer"
    >
      <input
        type="checkbox"
        value=""
        id={id}
        className="sr-only peer"
        onChange={handleChange}
        checked={value ?? checked}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );
};

export default Toggle;
