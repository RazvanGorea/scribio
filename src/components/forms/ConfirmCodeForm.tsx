import dynamic from "next/dynamic";

import React, { useState } from "react";
const ReactCodeInput = dynamic(import("react-code-input"));
import Button from "../form/Button";

interface ConfirmSignUpFormProps {
  onSubmit: (value: string) => void;
  heading?: string;
  description?: string;
}

const ConfirmCodeForm: React.FC<ConfirmSignUpFormProps> = ({
  onSubmit,
  heading = "Confirmation",
  description = "We sent you a code. Please check your inbox!",
}) => {
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent page to reload
    e.preventDefault();

    setLoading(true);
    onSubmit(value);
  };

  return (
    <div className="flex items-center justify-center w-1/2 h-full">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1 className="text-center ">{heading}</h1>
        <p className="mb-7 dark:text-white">{description}</p>
        <ReactCodeInput
          value={value}
          onChange={setValue}
          type="number"
          fields={5}
          name="code"
          inputMode="numeric"
          inputStyle={{
            fontFamily: "monospace",
            borderRadius: 6,
            border: "1px solid lightgrey",
            boxShadow: "rgb(0 0 0 / 10%) 0px 0px 10px 0px",
            margin: 4,
            paddingLeft: 0,
            paddingRight: 0,
            textAlign: "center",
            width: 36,
            height: 42,
            fontSize: 32,
            boxSizing: "border-box",
            color: "black",
            backgroundColor: "white",
          }}
        />
        <Button
          type="submit"
          loading={isLoading}
          disabled={value.length !== 5}
          style={{ marginTop: 15, marginBottom: 3 }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ConfirmCodeForm;
