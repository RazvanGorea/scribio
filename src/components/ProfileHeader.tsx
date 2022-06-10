import React, { memo } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import { ImageData } from "../types/ImageData.type";
import Button from "./form/Button";
import Avatar from "./imageRelated/Avatar";

interface ProfileHeaderProps {
  username: string;
  isFollowing?: boolean;
  followers?: number;
  avatar: ImageData;
  isPersonal: boolean;
  onFollow: React.MouseEventHandler<HTMLButtonElement>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  isFollowing,
  followers,
  avatar,
  isPersonal,
  onFollow,
}) => {
  let followersText: JSX.Element | string = <Skeleton width={75} />;
  if (typeof followers !== "undefined")
    followersText = followers + (followers === 1 ? " Follower" : " Followers");

  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-3">
        <Avatar size={55} src={avatar} />
        <div>
          <h5>{username}</h5>
          <span className="font-light">{followersText}</span>
        </div>
      </div>
      {isPersonal ? (
        <Button href="/profile/edit" active={isFollowing} icon={FiEdit}>
          Edit
        </Button>
      ) : (
        <Button
          onClick={onFollow}
          loading={typeof isFollowing === "undefined"}
          style={{ textTransform: "uppercase" }}
          active={isFollowing}
          icon={isFollowing ? AiOutlineCheck : undefined}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      )}
    </div>
  );
};

export default memo(ProfileHeader);
