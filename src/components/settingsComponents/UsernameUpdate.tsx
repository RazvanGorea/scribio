import React, { memo, useState } from "react";
import Button from "../form/Button";
import Input from "../form/Input";

interface UsernameUpdateProps {
  initialValue?: string;
  onUpdate?: (newValue: string) => void;
}

const UsernameUpdate: React.FC<UsernameUpdateProps> = ({
  initialValue = "",
  onUpdate,
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [isBlur, setIsBlur] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const validate = (newVal: string) => {
    let err = "";

    if (newVal.length > 20) err = "Username is too long!";

    setError(err);

    return err;
  };

  const handleChange = (newVal: string) => {
    validate(newVal);

    setValue(newVal);
  };

  const handleUpdate = () => {
    const err = validate(value);

    if (onUpdate && !err) {
      onUpdate(value);
      setLoading(true);
    }
  };

  return (
    <div>
      <label className="text-black dark:text-white" htmlFor="username">
        Username
      </label>
      <div className="flex">
        <Input
          error={isBlur && error ? error : false}
          onBlur={() => setIsBlur(true)}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          name="username"
          rightButton={{
            text: "update",
            loading: isLoading,
            disabled: value === initialValue || !!error || value.length === 0,
          }}
          onRightButtonClick={handleUpdate}
        />
      </div>
    </div>
  );
};

export default memo(UsernameUpdate);
