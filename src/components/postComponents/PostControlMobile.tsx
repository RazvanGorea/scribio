import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import IconButton from "../form/IconButton";
import Player from "../Player";

interface PostControlMobileProps {
  playerCurrentTime: number;
  playerDuration: number;
  isPlaying: boolean;
  onListen: () => void;
  onPlayerTimeChange: (val: number) => void;
}

const PostControlMobile: React.FC<PostControlMobileProps> = ({
  playerCurrentTime,
  playerDuration,
  isPlaying,
  onListen,
  onPlayerTimeChange,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isPlaying && !open) setOpen(true);
  }, [isPlaying, open]);

  const handleClose = () => {
    if (isPlaying) onListen();
    setOpen(false);
  };

  return (
    <div
      className={`${
        open ? "bottom-0" : "-bottom-full"
      } fixed transition-all left-0 flex items-center justify-between w-full bg-white dark:bg-gray-800 lg:hidden shadow-xl border-t border-gray-200 dark:border-gray-600 shadow-black`}
    >
      <Player
        currentTime={playerCurrentTime}
        duration={playerDuration}
        isPlaying={isPlaying}
        onListen={onListen}
        onTimeChange={onPlayerTimeChange}
        small
      />
      <IconButton shape="square" onClick={handleClose} icon={CgClose} />
    </div>
  );
};

export default PostControlMobile;
