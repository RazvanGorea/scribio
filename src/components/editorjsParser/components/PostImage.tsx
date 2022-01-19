import React from "react";
import Image from "next/image";
import { ImageData } from "../../../types/ImageData.type";

interface ImageProps {
  data: ImageData;
  caption: string;
  withBorder: boolean;
  withBackground: boolean;
}

const PostImage: React.FC<ImageProps> = ({
  data,
  caption,
  withBorder = true,
  withBackground = false,
}) => {
  const image = (
    <Image
      src={{
        src: data.url,
        height: data.height,
        width: data.width,
        blurDataURL: data.placeholder,
      }}
      alt=""
      placeholder="blur"
      className="transition-all duration-75"
      layout="responsive"
    />
  );

  return (
    <figure
      className={
        withBackground
          ? "p-5 bg-slate-200 dark:bg-slate-600 rounded"
          : undefined
      }
    >
      {withBorder ? (
        <div
          className={"border-8 border-slate-200 dark:border-slate-600 rounded"}
        >
          {image}
        </div>
      ) : (
        image
      )}
      {caption && <figcaption style={{ marginTop: 0 }}>{caption}</figcaption>}
    </figure>
  );
};

export default PostImage;
