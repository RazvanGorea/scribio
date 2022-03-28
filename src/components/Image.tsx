import React, { useState } from "react";
import NextImage, { StaticImageData } from "next/image";

interface ImageProps {
  style?: React.CSSProperties;
  alt?: string;
  src: StaticImageData;
  placeholder?: "blur" | "empty";
  layout?: "fixed" | "fill" | "intrinsic" | "responsive" | "raw";
  blurDataURL?: string;
  objectFit?: "cover" | "contain" | "fill" | "initial";
  unoptimized?: boolean;
}

const Image: React.FC<ImageProps> = ({
  style,
  alt = "",
  src,
  placeholder,
  layout = "responsive",
  objectFit,
  unoptimized = false,
}) => {
  const [isFadeTransitionOn, setFadeTransition] = useState(false);
  const initTime = Date.now();

  const handleImageLoadComplete = () => {
    const currentTime = Date.now();

    // Transition image only if image loading time is > 150ms (Image is not cached)
    if (currentTime - initTime > 150) setFadeTransition(true);
  };

  return (
    <NextImage
      className={isFadeTransitionOn ? "transition-all" : "transition-none"}
      style={style}
      alt={alt}
      src={src}
      placeholder={placeholder}
      layout={layout}
      objectFit={objectFit}
      onLoadingComplete={handleImageLoadComplete}
      unoptimized={unoptimized}
    />
  );
};

export default Image;
