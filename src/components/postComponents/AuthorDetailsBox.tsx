import React from "react";
import Skeleton from "react-loading-skeleton";
import { ImageData } from "../../types/ImageData.type";
import Button from "../form/Button";
import Avatar from "../imageRelated/Avatar";
import { AiOutlineCheck } from "react-icons/ai";
import Link from "next/link";
import Player from "../Player";
import { FiEdit, FiTrash } from "react-icons/fi";

interface AuthorDetailsBoxProps {
  uid: string;
  postId: string;
  avatar: ImageData;
  username: string;
  userDescription: string;
  isFollowing?: boolean;
  followers?: number;
  isPlaying: boolean;
  playerCurrentTime: number;
  playerDuration: number;
  onPlayerTimeChange: (newVal: number) => void;
  onPlayerListen: () => void;
  onFollow: React.MouseEventHandler<HTMLButtonElement>;
  isPersonal: boolean;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
}

const AuthorDetailsBox: React.FC<AuthorDetailsBoxProps> = ({
  uid,
  postId,
  avatar,
  username,
  isFollowing,
  userDescription,
  followers,
  isPlaying,
  playerCurrentTime,
  playerDuration,
  onPlayerTimeChange,
  onPlayerListen,
  onFollow,
  isPersonal,
  onDelete,
}) => {
  let followersText: JSX.Element | string = <Skeleton />;
  if (typeof followers !== "undefined")
    followersText = followers + (followers === 1 ? " Follower" : " Followers");

  return (
    <div className="sticky hidden lg:block lg:max-w-[19rem] xl:max-w-sm w-full px-5 py-6 bg-white rounded-lg shadow-lg dark:bg-gray-700 h-fit top-[4.4rem]">
      <div className="flex">
        <Avatar href={`/profile/${uid}`} src={avatar} size={65} />
        <div className="pl-3">
          <h5>
            <Link href={`/profile/${uid}`}>
              <a>{username}</a>
            </Link>
          </h5>
          <h6 className="font-medium text-gray-500 ">{followersText}</h6>
        </div>
      </div>

      <div>
        <p className="my-3 text-gray-500 line-clamp-6">{userDescription}</p>
        {!isPersonal && (
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
      <hr className="my-4 border-gray-500 dark:border-gray-400" />
      <Player
        isPlaying={isPlaying}
        currentTime={playerCurrentTime}
        duration={playerDuration}
        onListen={onPlayerListen}
        onTimeChange={onPlayerTimeChange}
      />
      {isPersonal && (
        <>
          <hr className="my-4 border-gray-500 dark:border-gray-400" />
          <div className="flex justify-between ">
            <Button href={`/post/${postId}/edit`} sm icon={FiEdit}>
              Edit
            </Button>
            <Button onClick={onDelete} color="red" sm icon={FiTrash}>
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthorDetailsBox;
