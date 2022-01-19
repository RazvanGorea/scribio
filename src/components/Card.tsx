import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface CardProps {
  thumbnail: {
    blurDataUrl?: string;
    width: number;
    height: number;
    src: string;
  };
  title: string;
  content: string;
  author: string;
  // author: {
  //   username: string;
  //   avatar?: {
  //     width: number;
  //     height: number;
  //     src: string;
  //   };
  // };
  authorAvatarUrl: string;
  publishedDate: string;
  timeToRead: string;
  href: string;
}

const Card: React.FC<CardProps> = ({
  thumbnail,
  title,
  content,
  author,
  authorAvatarUrl,
  href,
  publishedDate = "20 mars 2029",
  timeToRead,
}) => {
  const router = useRouter();

  const navigate = () => {
    router.push(href);
  };

  return (
    <div className="overflow-hidden rounded-lg shadow-lg mb-7 h-90 w-60 md:w-80">
      <div className="block w-full h-full">
        <div
          onClick={navigate}
          className="overflow-hidden cursor-pointer max-h-44"
        >
          <Image
            className="transition-all"
            alt="blog photo"
            objectFit="cover"
            placeholder="blur"
            src={thumbnail}
            layout="responsive"
            blurDataURL={thumbnail.blurDataUrl}
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
            <a href="#" className="relative block">
              <img
                alt="profil"
                src={authorAvatarUrl}
                className="object-cover w-10 h-10 mx-auto rounded-full "
              />
            </a>
            <div className="flex flex-col justify-between ml-4 text-sm">
              <p className="text-gray-800 dark:text-white">{author}</p>
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
