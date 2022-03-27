import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ImageData } from "../types/ImageData.type";
import Avatar from "./imageRelated/Avatar";

interface CardProps {
  thumbnail: ImageData;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
    avatar: ImageData;
  };
  publishedDate: string;
  timeToRead: string;
  href: string;
}

const Card: React.FC<CardProps> = ({
  thumbnail,
  title,
  content,
  author,
  href,
  publishedDate = "20 mars 2029",
  timeToRead,
}) => {
  const router = useRouter();
  const [isFadeTransitionOn, setFadeTransition] = useState(false);
  const initTime = Date.now();

  const navigate = () => {
    router.push(href);
  };

  const handleImageLoadComplete = () => {
    const currentTime = Date.now();

    // Transition image only if image loading time is > 120ms (It is not cached)
    if (currentTime - initTime > 120) setFadeTransition(true);
  };

  return (
    <div className="overflow-hidden rounded-lg shadow-lg mb-7 h-90 w-60 md:w-80">
      <div className="block w-full h-full">
        <div
          onClick={navigate}
          className="overflow-hidden cursor-pointer max-h-44"
        >
          <Image
            className={
              isFadeTransitionOn ? "transition-all" : "transition-none"
            }
            alt="blog thumbnail"
            objectFit="cover"
            placeholder="blur"
            onLoadingComplete={handleImageLoadComplete}
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
              <a className="block mb-2 text-xl font-medium text-gray-800 dark:text-white">
                {title}
              </a>
            </Link>
            <p className="font-light text-gray-400 dark:text-gray-300 text-md">
              {content}
            </p>
          </div>
          <div className="flex items-center mt-4">
            <Avatar src={author.avatar} />
            <div className="flex flex-col justify-between ml-4 text-sm">
              <p className="text-gray-800 dark:text-white">{author.username}</p>
              <p className="text-gray-400 dark:text-gray-300">
                {publishedDate} - {timeToRead}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
