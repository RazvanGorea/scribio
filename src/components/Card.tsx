import Image from "../components/Image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo, useState } from "react";
import { ImageData } from "../types/ImageData.type";
import Avatar from "./imageRelated/Avatar";
import IconButton from "./form/IconButton";
import { MdTurnedIn } from "react-icons/md";
import OptionsMenu, { MenuOption } from "./OptionsMenu";

interface CardProps {
  thumbnail: ImageData;
  title: string;
  previewContent: string;
  author: {
    _id: string;
    username: string;
    avatar: ImageData;
  };
  publishedDate: string;
  timeToRead: string;
  href: string;
  type?: "saves" | "profile" | "default";
  menuOptions?: MenuOption[];
  onUnsave?: React.MouseEventHandler<HTMLButtonElement>;
}

const Card: React.FC<CardProps> = ({
  thumbnail,
  title,
  previewContent,
  author,
  href,
  publishedDate = "20 mars 2029",
  timeToRead,
  type = "default",
  menuOptions,
  onUnsave,
}) => {
  const router = useRouter();

  const navigate = () => {
    router.push(href);
  };

  return (
    <div className="overflow-hidden rounded-lg shadow-lg h-90">
      <div className="block w-full h-full bg-white dark:bg-gray-700">
        <div
          onClick={navigate}
          className="overflow-hidden cursor-pointer max-h-44"
        >
          <Image
            alt="blog thumbnail"
            objectFit="cover"
            placeholder="blur"
            src={{
              height: thumbnail.height,
              width: thumbnail.width,
              src: thumbnail.url,
              blurDataURL: thumbnail.placeholder,
            }}
            layout="responsive"
            blurDataURL={thumbnail.placeholder}
          />
        </div>
        <div className="w-full p-4 bg-white dark:bg-gray-700">
          {/* <p className="font-medium text-indigo-500 text-md">Article</p> */}
          <div onClick={navigate} className="cursor-pointer">
            <Link href={href}>
              <a className="block mb-2 text-xl font-medium text-gray-800 dark:text-white line-clamp-1">
                {title}
              </a>
            </Link>
            <p className="font-light leading-6 min-h-[6rem] text-gray-400 dark:text-gray-300 text-md line-clamp-4">
              {previewContent}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <Avatar href={`/profile/${author._id}`} src={author.avatar} />
              <div className="flex flex-col justify-between ml-4 text-sm">
                <Link href={`/profile/${author._id}`}>
                  <a className="text-gray-800 dark:text-white">
                    {author.username}
                  </a>
                </Link>
                <p className="text-gray-400 dark:text-gray-300">
                  {publishedDate} - {timeToRead}
                </p>
              </div>
            </div>
            {type === "saves" && (
              <IconButton onClick={onUnsave} icon={MdTurnedIn} />
            )}
            {type === "profile" && menuOptions && (
              <OptionsMenu items={menuOptions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Card);
