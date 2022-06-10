import React, { memo, useState } from "react";
import Button from "../form/Button";
import Input from "../form/Input";

interface EmailUpdateProps {
  initialValue?: string;
  onUpdate?: (newValue: string) => void;
}

const EmailUpdate: React.FC<EmailUpdateProps> = ({
  initialValue = "",
  onUpdate,
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [isBlur, setIsBlur] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const validate = (newVal: string) => {
    let err = "";

    const emailValidation =
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newVal);

    if (!emailValidation) err = "Invalid email!";

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
      <label className="text-black dark:text-white" htmlFor="email">
        Email
      </label>
      <div className="flex">
        <Input
          error={isBlur && error ? error : false}
          value={value}
          onBlur={() => setIsBlur(true)}
          onChange={(e) => handleChange(e.target.value)}
          name="email"
          rightButton={{
            disabled: value === initialValue || value.length === 0,
            text: "Update",
            loading: false,
          }}
          onRightButtonClick={handleUpdate}
        />
      </div>
    </div>
  );
};

export default memo(EmailUpdate);
