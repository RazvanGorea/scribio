import React from "react";
import dayjs from "dayjs";
import Skeleton from "react-loading-skeleton";

interface AboutUserProps {
  description?: string;
  totalPosts: number;
  totalViews?: number;
  registerDate: number;
}

const AboutUser: React.FC<AboutUserProps> = ({
  description,
  totalPosts,
  totalViews,
  registerDate,
}) => {
  return (
    <div className="max-w-sm">
      <p>{description || "No description"}</p>
      <hr className="my-3 border-gray-500 dark:border-gray-600" />
      <span className="block font-semibold">Posts published: {totalPosts}</span>
      <span className="block font-semibold">
        Total views: {totalViews ?? <Skeleton width={40} />}
      </span>
      <span className="block font-semibold">
        Joined on: {dayjs(registerDate).format("DD MMMM YYYY")}
      </span>
    </div>
  );
};

export default AboutUser;
