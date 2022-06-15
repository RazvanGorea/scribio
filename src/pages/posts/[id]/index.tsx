import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React, { useMemo, useEffect, useCallback, useState } from "react";
import {
  deletePostAppreciation,
  dislikePost,
  getAllPostsIds,
  getPostMetrics,
  getPostById,
  likePost,
  registerPostView,
  deletePost,
} from "../../../api/posts";
import contentParser from "../../../components/editorjsParser/contentParser";
import { Post as PostType, PostMetrics } from "../../../types/Post.type";
import dayjs from "dayjs";
import AuthorDetailsBox from "../../../components/postComponents/AuthorDetailsBox";
import PostDetails from "../../../components/PostDetails";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";
import {
  followUser,
  getUserDescription,
  getUserFollowersNumber,
  isFollowing,
  unfollowUser,
} from "../../../api/users";
import PostControl from "../../../components/postComponents/PostControl";
import { revalidatePage } from "../../../api/global";

interface PostProps {
  post?: PostType;
  authorDescription: string;
}

const Post: NextPage<PostProps> = ({ post, authorDescription }) => {
  const router = useRouter();
  const { isUserInitialized, user, fetchFollowings } = useAuth();
  const [postAppreciation, setPostAppreciation] = useState<PostMetrics | null>(
    null
  );
  const [authorFollowData, setAuthorFollowData] = useState<{
    isFollowing: boolean;
    followers: number;
  } | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const isPersonal = user?._id === post?.author._id;

  const fetchPostDetails = useCallback(async () => {
    if (post) {
      const appreciation = await getPostMetrics(post._id);
      setPostAppreciation(appreciation);
    }
  }, [post]);

  const fetchAuthorFollowData = useCallback(async () => {
    if (!post) return;

    if (isUserInitialized) {
      const [isFollow, followers] = await Promise.all([
        isFollowing(post.author._id),
        getUserFollowersNumber(post.author._id),
      ]);

      setAuthorFollowData({ isFollowing: isFollow, followers });
    } else {
      const followers = await getUserFollowersNumber(post.author._id);
      setAuthorFollowData({ isFollowing: false, followers });
    }
  }, [post, isUserInitialized]);

  useEffect(() => {
    if (post) {
      registerPostView(post._id);
    }
    fetchPostDetails();
    fetchAuthorFollowData();
  }, [post, isUserInitialized, fetchPostDetails, fetchAuthorFollowData]);

  const onLike = () => {
    if (!postAppreciation || !post) return;

    if (!isUserInitialized) return router.push("/logIn");

    if (postAppreciation.userAppreciation === "like") {
      deletePostAppreciation(post._id);
      setPostAppreciation((appr) => {
        if (!appr) return null;
        return { ...appr, likes: appr.likes - 1, userAppreciation: null };
      });
    } else if (postAppreciation.userAppreciation === "dislike") {
      likePost(post._id);
      setPostAppreciation((appr) => {
        if (!appr) return null;
        return {
          ...appr,
          dislikes: appr.dislikes - 1,
          likes: appr.likes + 1,
          userAppreciation: "like",
        };
      });
    } else {
      likePost(post._id);
      setPostAppreciation((appr) => {
        if (!appr) return null;
        return { ...appr, likes: appr.likes + 1, userAppreciation: "like" };
      });
    }
  };

  const onDislike = () => {
    if (!postAppreciation || !post) return;

    if (!isUserInitialized) return router.push("/logIn");

    if (postAppreciation.userAppreciation === "like") {
      dislikePost(post._id);
      setPostAppreciation((appr) => {
        if (!appr) return null;
        return {
          ...appr,
          dislikes: appr.dislikes + 1,
          likes: appr.likes - 1,
          userAppreciation: "dislike",
        };
      });
    } else if (postAppreciation.userAppreciation === "dislike") {
      deletePostAppreciation(post._id);
      setPostAppreciation((appr) => {
        if (!appr) return null;

        return { ...appr, dislikes: appr.dislikes - 1, userAppreciation: null };
      });
    } else {
      dislikePost(post._id);
      setPostAppreciation((appr) => {
        if (!appr) return null;
        return {
          ...appr,
          dislikes: appr.dislikes + 1,
          userAppreciation: "dislike",
        };
      });
    }
  };

  const followHandler = () => {
    if (!authorFollowData || !post) return;
    if (!isUserInitialized) return router.push("/logIn");

    if (authorFollowData.isFollowing) {
      unfollowUser(post.author._id).then(() => fetchFollowings());
      setAuthorFollowData((det) => {
        if (!det) return null;
        return {
          followers: det.followers - 1,
          isFollowing: false,
        };
      });
    } else {
      followUser(post.author._id).then(() => fetchFollowings());
      setAuthorFollowData((det) => {
        if (!det) return null;
        return {
          followers: det.followers + 1,
          isFollowing: true,
        };
      });
    }
  };

  const deletePostHandler = async () => {
    try {
      if (!post || !user) return;
      setIsDeleteLoading(true);

      await deletePost(post._id);

      // Update profile page
      await revalidatePage(`/profile/${user._id}`);

      // Redirect with full page reload
      window.location.replace("/");
    } catch (error) {
      console.log(error);
      setIsDeleteLoading(false);
    }
  };

  const content = useMemo(() => {
    if (post) return contentParser(post.content);
  }, [post]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="flex justify-around px-3">
      <div />
      <article className="px-7 prose bg-white rounded-lg shadow-lg pb-8 pt-3 dark:bg-gray-700 prose-slate w-full lg:prose-lg max-w-[80ch] dark:prose-invert">
        <PostDetails
          onLike={onLike}
          onDislike={onDislike}
          createdAt={dayjs(post.createdAt).format("MMM DD")}
          dislikes={postAppreciation?.dislikes}
          likes={postAppreciation?.likes}
          saves={postAppreciation?.saves}
          views={postAppreciation?.views}
          userAppreciation={postAppreciation?.userAppreciation || null}
          isSaved={false}
          timeToRead={post.timeToRead}
        />
        {content}
      </article>
      {isPersonal ? (
        <PostControl
          isDeleteLoading={isDeleteLoading}
          onDelete={deletePostHandler}
          postId={post._id}
        />
      ) : (
        <AuthorDetailsBox
          onFollow={followHandler}
          uid={post.author._id}
          avatar={post.author.avatar}
          isFollowing={authorFollowData?.isFollowing}
          followers={authorFollowData?.followers}
          username={post.author.username}
          userDescription={authorDescription}
        />
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllPostsIds();

  const paths = ids.map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: false,
  };
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<PostProps, Params> = async (
  context
) => {
  const params = context.params!;

  const post = await getPostById(params.id);

  const description = await getUserDescription(post.author._id);

  // Pass post data to the page via props
  return {
    props: { post, authorDescription: description },
  };
};

export default Post;
