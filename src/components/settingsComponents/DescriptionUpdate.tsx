import React, { memo, useState } from "react";
import Button from "../form/Button";
import Textarea from "../form/Textarea";

interface DescriptionUpdateProps {
  initialValue?: string;
  onUpdate?: (newValue: string) => void;
}

const DescriptionUpdate: React.FC<DescriptionUpdateProps> = ({
  initialValue = "",
  onUpdate,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isLoading, setLoading] = useState(false);

  const handleClick = () => {
    if (onUpdate) {
      onUpdate(value);
      setLoading(true);
    }
  };

  return (
    <div>
      <Textarea
        value={value}
        name="description"
        label="About you"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write about you..."
      />
      <div className="flex justify-center mt-3">
        <Button
          loading={isLoading}
          disabled={value === initialValue || value.length === 0}
          onClick={handleClick}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default memo(DescriptionUpdate);
