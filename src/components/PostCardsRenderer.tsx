import React, { memo } from "react";
import { PostPreview } from "../types/Post.type";
import Card from "./Card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface PostCardsRendererProps {
  posts: PostPreview[];
  containerStyles?: React.CSSProperties;
}

const PostCardsRenderer: React.FC<PostCardsRendererProps> = ({
  posts,
  containerStyles,
}) => {
  return (
    <div
      style={containerStyles}
      className="grid grid-cols-1 gap-1 px-3 sm:gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 xl:grid-cols-5 post-preview-card"
    >
      {posts?.map((post) => (
        <Card
          key={post._id}
          thumbnail={post.thumbnail}
          author={post.author}
          title={post.title}
          previewContent={post.previewContent}
          publishedDate={dayjs(post.createdAt).fromNow()}
          timeToRead={post.timeToRead}
          href={`/posts/${post._id}`}
        />
      ))}
    </div>
  );
};

export default memo(PostCardsRenderer);
