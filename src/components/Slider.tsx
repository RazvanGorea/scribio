import React, { useState } from "react";

interface SliderProps {
  progress: number;
  onChange: (newVal: number) => void;
}

const Slider: React.FC<SliderProps> = ({ progress, onChange }) => {
  const [internalProgress, setInternalProgress] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const value = isMouseDown ? internalProgress : progress;

  return (
    <>
      <div className="mt-1">
        <div className="relative flex items-center h-1 bg-gray-400 rounded-full">
          <div
            style={{ width: value + "%" }}
            className="h-1 bg-blue-400 rounded-full "
          />
          <input
            value={value || 0}
            onChange={(e) => setInternalProgress(parseInt(e.target.value))}
            onMouseDown={() => setIsMouseDown(true)}
            onMouseUp={() => {
              setIsMouseDown(false);
              onChange(internalProgress);
            }}
            onTouchStart={() => setIsMouseDown(true)}
            onTouchEnd={() => {
              setIsMouseDown(false);
              onChange(internalProgress);
            }}
            type="range"
            className="absolute w-full h-6 p-0 bg-transparent appearance-none form-range focus:outline-none focus:ring-0 focus:shadow-none"
            min={0}
            max={100}
          />
        </div>
      </div>
    </>
  );
};

export default Slider;
