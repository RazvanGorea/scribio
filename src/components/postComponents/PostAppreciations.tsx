import React, { memo } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { MdTurnedIn, MdTurnedInNot } from "react-icons/md";
import IconButton from "../form/IconButton";
import Spinner from "../Spinner";

interface PostAppreciationsProps {
  onLike: React.MouseEventHandler<HTMLButtonElement>;
  onDislike: React.MouseEventHandler<HTMLButtonElement>;
  onSave: React.MouseEventHandler<HTMLButtonElement>;
  likes?: number;
  dislikes?: number;
  saves?: number;
  userAppreciation: "like" | "dislike" | null;
  isSaved?: boolean;
}

const PostAppreciations: React.FC<PostAppreciationsProps> = ({
  onLike,
  onDislike,
  onSave,
  isSaved,
  likes,
  dislikes,
  saves,
  userAppreciation,
}) => {
  return (
    <div className="lg:flex hidden flex-col space-y-5 sticky top-[4.4rem] h-fit">
      <div className="flex flex-col items-center justify-center">
        <IconButton
          size={30}
          disabled={typeof likes === "undefined"}
          onClick={onLike}
          icon={userAppreciation === "like" ? AiFillLike : AiOutlineLike}
        />
        <span className="text-lg">{likes ?? <Spinner size={20} />}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <IconButton
          size={30}
          disabled={typeof dislikes === "undefined"}
          onClick={onDislike}
          icon={
            userAppreciation === "dislike" ? AiFillDislike : AiOutlineDislike
          }
        />
        <span className="text-lg">{dislikes ?? <Spinner size={20} />}</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <IconButton
          size={30}
          onClick={onSave}
          disabled={typeof saves === "undefined"}
          icon={isSaved ? MdTurnedIn : MdTurnedInNot}
        />
        <span className="text-lg">{saves ?? <Spinner size={20} />}</span>
      </div>
    </div>
  );
};

export default memo(PostAppreciations);
