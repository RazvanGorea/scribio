import Image from "../Image";
import Link from "next/link";
import React from "react";
import { ImageData } from "../../types/ImageData.type";

interface AvatarProps {
  href?: string;
  src: ImageData;
  size?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Avatar: React.FC<AvatarProps> = ({ src, href, size = 40, onClick }) => {
  const avatar = (
    <div
      className="overflow-hidden rounded-full shadow "
      style={{ width: size }}
      onClick={onClick}
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
        style={{ borderRadius: "50%" }}
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
