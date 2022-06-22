import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { BsPauseCircle, BsPlayCircle } from "react-icons/bs";
import IconButton from "./form/IconButton";
import Slider from "./Slider";

interface PlayerProps {
  soundUrl: string;
}

const Player: React.FC<PlayerProps> = ({ soundUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audio = useRef<HTMLAudioElement | null>(null);

  const listen = () => {
    if (!audio.current) return;

    if (isPlaying) {
      audio.current.pause();
      setIsPlaying(false);
    } else {
      audio.current.play();
      setIsPlaying(true);
    }
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

  useEffect(() => {
    audio.current = new Audio(soundUrl);
  }, [soundUrl]);

  useEffect(() => {
    const audioElem = audio.current;

    if (audioElem) {
      audioElem.addEventListener("loadedmetadata", (e: any) => {
        setDuration(e.target.duration);
      });

      audioElem.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }

    const timeInterval = setInterval(() => {
      if (audioElem) setCurrentTime(audioElem.currentTime);
    }, 1000);

    return () => {
      if (audioElem) audioElem.pause();
      clearInterval(timeInterval);
    };
  }, [audio]);

  const handleChange = (progress: number) => {
    if (!audio.current) return;

    const newDuration = (progress * duration) / 100;

    setCurrentTime(newDuration);
    audio.current.currentTime = newDuration;
  };

  return (
    <div>
      <div className="flex justify-center">
        <IconButton
          size={40}
          onClick={listen}
          icon={isPlaying ? BsPauseCircle : BsPlayCircle}
        />
      </div>
      <div className="pb-2 mx-8">
        <div className="flex justify-between text-sm text-gray-400">
          <p>{getDisplayTime(currentTime)}</p>
          <p>{getDisplayTime(duration)}</p>
        </div>
        <Slider
          onChange={handleChange}
          progress={(currentTime / duration) * 100}
        />
      </div>
    </div>
  );
};

export default memo(Player);
