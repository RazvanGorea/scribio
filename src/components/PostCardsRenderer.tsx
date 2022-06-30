import React, { memo } from "react";
import { PostPreview } from "../types/Post.type";
import Card from "./Card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DotsLoading from "./DotsLoading";
import InfiniteScroll from "react-infinite-scroll-component";
import { MenuOption } from "./OptionsMenu";
dayjs.extend(relativeTime);

type Modify<T, R> = Omit<T, keyof R> & R;

type MenuOptionType = Modify<
  MenuOption,
  {
    onClick?: (postId: string) => void;
  }
>;

interface PostCardsRendererProps {
  posts: PostPreview[];
  containerStyles?: React.CSSProperties;
  hasMore?: boolean;
  onFetchMore?: () => void;
  type?: "saves" | "profile" | "default";
  profileCardsMenuOptions?: MenuOptionType[];
  onUnsave?: (postId: string) => void;
}

const PostCardsRenderer: React.FC<PostCardsRendererProps> = ({
  posts,
  containerStyles,
  hasMore,
  onFetchMore,
  type = "default",
  profileCardsMenuOptions,
  onUnsave,
}) => {
  return (
    <InfiniteScroll
      style={{ overflow: "initial" }}
      dataLength={posts.length || 0}
      next={posts && posts.length > 0 && onFetchMore ? onFetchMore : () => {}} // Call only after initial fetch occured
      hasMore={hasMore || false}
      loader={<DotsLoading style={{ marginTop: 15 }} />}
    >
      <div
        style={containerStyles}
        className="grid grid-cols-1 gap-x-1 gap-y-3 sm:px-3 sm:gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 xl:grid-cols-5 post-preview-card"
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
            href={`/post/${post._id}`}
            type={type}
            onUnsave={() => onUnsave && onUnsave(post._id)}
            menuOptions={
              type === "profile"
                ? profileCardsMenuOptions?.map((option) => ({
                    ...option,
                    onClick: () => option.onClick && option.onClick(post._id),
                  }))
                : undefined
            }
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default memo(PostCardsRenderer);
