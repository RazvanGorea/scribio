import React, { memo, useEffect, useState } from "react";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
  AiOutlineCheck,
} from "react-icons/ai";
import { FaPlay, FaPause } from "react-icons/fa";
import { BsHeadphones } from "react-icons/bs";
import { MdTurnedInNot, MdTurnedIn } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import Button from "../form/Button";
import IconButton from "../form/IconButton";
import Spinner from "../Spinner";
import Avatar from "../imageRelated/Avatar";
import { ImageData } from "../../types/ImageData.type";
import Link from "next/link";
import OptionsMenu from "../OptionsMenu";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useRouter } from "next/router";

interface PostDetailsProps {
  createdAt: string;
  timeToRead: string;
  likes?: number;
  dislikes?: number;
  saves?: number;
  views?: number;
  userAppreciation: "like" | "dislike" | null;
  isSaved?: boolean;
  isListening: boolean;
  followers?: number;
  isFollowing?: boolean;
  authorUsername: string;
  authorAvatar: ImageData;
  authorUid: string;
  isPersonal?: boolean;
  postId: string;
  onDelete: () => void;
  onFollow: () => void;
  onListen: () => void;
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
  isListening,
  followers,
  isFollowing,
  authorUsername,
  authorAvatar,
  authorUid,
  isPersonal = false,
  postId,
  onDelete,
  onFollow,
  onListen,
  onLike,
  onDislike,
  onSave,
}) => {
  const router = useRouter();

  const [wasPlayed, setWasPlayed] = useState(false);

  useEffect(() => {
    if (isListening && !wasPlayed) setWasPlayed(true);
  }, [isListening, wasPlayed]);

  let playButtonIcon = BsHeadphones;
  let playButtonText = "Listen";

  if (wasPlayed && isListening) {
    playButtonIcon = FaPause;
    playButtonText = "Pause";
  } else if (wasPlayed && !isListening) {
    playButtonIcon = FaPlay;
    playButtonText = "Play";
  }

  let viewsText: JSX.Element | string = <Skeleton width={60} />;
  if (views) viewsText = views + (views === 1 ? " view" : " views");

  let followersText: JSX.Element | string = <Skeleton />;
  if (typeof followers !== "undefined")
    followersText = followers + (followers === 1 ? " Follower" : " Followers");

  return (
    <div className="flex flex-col flex-wrap items-center justify-between mb-5 sm:flex-row">
      <div className="flex items-center justify-between w-full mb-4 lg:hidden basis-full not-prose">
        <div className="flex">
          <Avatar href={`/profile/${authorUid}`} src={authorAvatar} size={40} />
          <div className="pl-3">
            <h5>
              <Link href={`/profile/${authorUid}`}>
                <a className="no-underline">{authorUsername}</a>
              </Link>
            </h5>
            <h6 className="text-sm font-medium text-gray-500">
              {followersText}
            </h6>
          </div>
        </div>
        {isPersonal ? (
          <OptionsMenu
            items={[
              {
                text: "Edit",
                icon: FiEdit,
                onClick: () => router.push(`/post/${postId}/edit`),
              },
              {
                text: "Delete",
                icon: FiTrash,
                color: "red",
                onClick: () => onDelete(),
              },
            ]}
          />
        ) : (
          <Button
            onClick={onFollow}
            sm
            loading={typeof isFollowing === "undefined"}
            style={{ borderRadius: 30 }}
            active={isFollowing}
            icon={isFollowing ? AiOutlineCheck : undefined}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        )}
      </div>
      <div className="flex items-center w-full max-w-xs justify-evenly sm:justify-start sm:w-fit sm:max-w-none">
        <span className="text-sm font-semibold">{createdAt}</span>
        <span className="mx-1 text-xl font-semibold">·</span>
        <span className="text-sm font-semibold">{timeToRead} read</span>
        <span className="mx-1 text-xl font-semibold">·</span>
        <span className="text-sm font-semibold">{viewsText}</span>
      </div>
      <div className="flex items-center justify-center mt-2 space-x-3 post-details-appreciations lg:hidden">
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
        <div>
          <Button onClick={onListen} icon={playButtonIcon} sm>
            {playButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(PostDetails);
