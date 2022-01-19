import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AvatarProps {
  href?: string;
  src: {
    src: string;
    width: number;
    height: number;
    blurDataURL: string;
  };
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
        src={src}
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
