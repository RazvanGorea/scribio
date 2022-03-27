import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ImageData } from "../../types/ImageData.type";

interface AvatarProps {
  href?: string;
  src: ImageData;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, href, size = 40 }) => {
  const avatar = (
    <div
      className="overflow-hidden rounded-full shadow "
      style={{ width: size }}
    >
      <Image
        objectFit="cover"
        layout="responsive"
        src={{
          height: src.height,
          width: src.width,
          src: src.url,
          blurDataURL: src.placeholder,
        }}
        unoptimized
        alt=""
        placeholder="blur"
        className="transition-all rounded-full"
      />
    </div>
  );

  return href ? (
    <Link href={href}>
      <a className="rounded-full">{avatar}</a>
    </Link>
  ) : (
    avatar
  );
};

export default Avatar;
