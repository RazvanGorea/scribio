import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ImageData } from "../../types/ImageData.type";

interface AvatarProps {
  href?: string;
  src: ImageData;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, href, size = 40 }) => {
  const [isFadeTransitionOn, setFadeTransition] = useState(false);
  const initTime = Date.now();

  const handleImageLoadComplete = () => {
    const currentTime = Date.now();

    // Transition image only if image loading time is > 120ms (It is not cached)
    if (currentTime - initTime > 120) setFadeTransition(true);
  };

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
        onLoadingComplete={handleImageLoadComplete}
        unoptimized
        alt=""
        placeholder="blur"
        className={`rounded-full `}
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
