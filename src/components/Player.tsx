import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { BsPauseCircle, BsPlayCircle } from "react-icons/bs";
import IconButton from "./form/IconButton";
import Slider from "./Slider";

interface PlayerProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  small?: boolean;
  onTimeChange: (newVal: number) => void;
  onListen: () => void;
}

const Player: React.FC<PlayerProps> = ({
  isPlaying,
  currentTime,
  duration,
  small = false,
  onTimeChange,
  onListen,
}) => {
  return (
    <div className={`${small ? "flex items-center w-full" : ""}`}>
      <div className="flex justify-center">
        <IconButton
          shape={small ? "square" : "circle"}
          size={small ? 30 : 40}
          onClick={onListen}
          icon={isPlaying ? BsPauseCircle : BsPlayCircle}
        />
      </div>
      <div className={`pb-2 ${small ? "mx-3 w-full" : "mx-8"}`}>
        <div className="flex justify-between text-sm text-gray-400">
          <p>{getDisplayTime(currentTime)}</p>
          <p>{getDisplayTime(duration)}</p>
        </div>
        <Slider
          onChange={onTimeChange}
          progress={(currentTime / duration) * 100}
        />
      </div>
    </div>
  );
};

const getDisplayTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);

  const getSecs = () => {
    if (seconds < 10) return "0" + seconds;
    return seconds;
  };

  return minutes + ":" + getSecs();
};

export default memo(Player);
