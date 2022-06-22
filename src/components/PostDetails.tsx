import React, { memo } from "react";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { MdTurnedInNot, MdTurnedIn } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import IconButton from "./form/IconButton";
import Spinner from "./Spinner";

interface PostDetailsProps {
  createdAt: string;
  timeToRead: string;
  likes?: number;
  dislikes?: number;
  saves?: number;
  views?: number;
  userAppreciation: "like" | "dislike" | null;
  isSaved?: boolean;
  onLike?: React.MouseEventHandler<HTMLButtonElement>;
  onDislike?: React.MouseEventHandler<HTMLButtonElement>;
  onSave?: React.MouseEventHandler<HTMLButtonElement>;
}

const PostDetails: React.FC<PostDetailsProps> = ({
  createdAt,
  timeToRead,
  likes,
  dislikes,
  saves,
  views,
  userAppreciation,
  isSaved = false,
  onLike,
  onDislike,
  onSave,
}) => {
  let viewsText: JSX.Element | string = <Skeleton width={60} />;
  if (views) viewsText = views + (views === 1 ? " view" : " views");

  return (
    <div className="flex justify-between mb-5">
      <div className="flex items-center">
        <span className="text-sm font-semibold">{createdAt}</span>
        <span className="mx-1 text-xl font-semibold">·</span>
        <span className="text-sm font-semibold">{timeToRead} read</span>
        <span className="mx-1 text-xl font-semibold">·</span>
        <span className="text-sm font-semibold">{viewsText}</span>
      </div>
      <div className="flex items-center justify-center mt-2 space-x-3">
        <div className="flex items-center">
          <span className="mr-1">{likes ?? <Spinner size={20} />}</span>
          <IconButton
            disabled={typeof likes === "undefined"}
            onClick={onLike}
            icon={userAppreciation === "like" ? AiFillLike : AiOutlineLike}
          />
        </div>
        <div className="flex items-center">
          <span className="mr-1">{dislikes ?? <Spinner size={20} />}</span>
          <IconButton
            disabled={typeof dislikes === "undefined"}
            onClick={onDislike}
            icon={
              userAppreciation === "dislike" ? AiFillDislike : AiOutlineDislike
            }
          />
        </div>
        <div className="flex items-center">
          <span className="mr-1">{saves ?? <Spinner size={20} />}</span>
          <IconButton
            onClick={onSave}
            disabled={typeof saves === "undefined"}
            icon={isSaved ? MdTurnedIn : MdTurnedInNot}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(PostDetails);
