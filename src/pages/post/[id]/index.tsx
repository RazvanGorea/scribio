import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React, {
  useMemo,
  useEffect,
  useCallback,
  useState,
  useRef,
} from "react";
import {
  deletePostAppreciation,
  dislikePost,
  getAllPostsIds,
  getPostMetrics,
  getPostById,
  likePost,
  registerPostView,
  deletePost,
  unsavePost,
  savePost,
} from "../../../api/posts";
import contentParser from "../../../components/editorjsParser/contentParser";
import { Post as PostType, PostMetrics } from "../../../types/Post.type";
import dayjs from "dayjs";
import AuthorDetailsBox from "../../../components/postComponents/AuthorDetailsBox";
import PostDetails from "../../../components/postComponents/PostDetails";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";
import {
  followUser,
  getUserDescription,
  getUserFollowersNumber,
  isFollowing,
  unfollowUser,
} from "../../../api/users";
import { revalidatePage } from "../../../api/global";
import PostAppreciations from "../../../components/postComponents/PostAppreciations";
import PostControlMobile from "../../../components/postComponents/PostControlMobile";
import DeleteConfirmModal from "../../../components/modals/DeleteConfirmModal";

interface PostProps {
  post: PostType;
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
  const [confirmDelete, setConfirmDelete] = useState<{ postId: string }>();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audio = useRef<HTMLAudioElement | null>(null);

  const listen = () => {
    if (!audio.current) return;

    if (isPlaying) {
      audio.current.pause();
      setIsPlaying(false);
    } else {
      audio.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    audio.current = new Audio(post.audio.url);
  }, [post.audio.url]);

  useEffect(() => {
    const audioElem = audio.current;

    if (audioElem) {
      audioElem.addEventListener("loadedmetadata", (e: any) => {
        setDuration(e.target.duration);
      });

      audioElem.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }

    const timeInterval = setInterval(() => {
      if (audioElem) setCurrentTime(audioElem.currentTime);
    }, 1000);

    return () => {
      if (audioElem) audioElem.pause();
      clearInterval(timeInterval);
    };
  }, [audio]);

  const changeTime = (progress: number) => {
    if (!audio.current) return;

    const newDuration = (progress * duration) / 100;

    setCurrentTime(newDuration);
    audio.current.currentTime = newDuration;
  };

  const isPersonal = user?._id === post.author._id;

  const fetchPostDetails = useCallback(async () => {
    if (post) {
      const appreciation = await getPostMetrics(post._id);
      setPostAppreciation(appreciation);
    }
  }, [post]);

  const fetchAuthorFollowData = useCallback(async () => {
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
    if (!postAppreciation) return;

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
    if (!postAppreciation) return;

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
    if (!authorFollowData) return;
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
      if (!user || !confirmDelete) return;

      await deletePost(confirmDelete.postId);

      // Update profile page
      await revalidatePage(`/profile/${user._id}`);

      // Redirect with full page reload
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const savePostHandler = () => {
    if (!postAppreciation) return;
    if (!isUserInitialized) return router.push("/logIn");

    if (postAppreciation.isSaved) {
      unsavePost(post._id);
      setPostAppreciation((appr) => {
        if (!appr) return null;
        return {
          ...appr,
          isSaved: false,
          saves: appr.saves - 1,
        };
      });
    } else {
      savePost(post._id);
      setPostAppreciation((appr) => {
        if (!appr) return null;
        return {
          ...appr,
          isSaved: true,
          saves: appr.saves + 1,
        };
      });
    }
  };

  const content = useMemo(() => {
    if (post) return contentParser(post.content);
  }, [post]);

  return (
    <>
      <div className="flex justify-around px-3 lg:space-x-3">
        <PostAppreciations
          onLike={onLike}
          onDislike={onDislike}
          onSave={savePostHandler}
          likes={postAppreciation?.likes}
          dislikes={postAppreciation?.dislikes}
          saves={postAppreciation?.saves}
          isSaved={postAppreciation?.isSaved}
          userAppreciation={postAppreciation?.userAppreciation || null}
        />
        <article className="px-5 sm:px-7 prose bg-white rounded-lg shadow-lg pb-8 pt-3 dark:bg-gray-700 prose-slate w-full md:prose-lg max-w-[80ch] dark:prose-invert">
          <PostDetails
            isListening={isPlaying}
            onListen={listen}
            onLike={onLike}
            onDislike={onDislike}
            onSave={savePostHandler}
            createdAt={dayjs(post.createdAt).format("MMM DD")}
            onFollow={followHandler}
            dislikes={postAppreciation?.dislikes}
            likes={postAppreciation?.likes}
            saves={postAppreciation?.saves}
            views={postAppreciation?.views}
            userAppreciation={postAppreciation?.userAppreciation || null}
            isSaved={postAppreciation?.isSaved}
            timeToRead={post.timeToRead}
            authorAvatar={post.author.avatar}
            authorUsername={post.author.username}
            authorUid={post.author._id}
            followers={authorFollowData?.followers}
            isFollowing={authorFollowData?.isFollowing}
            isPersonal={isPersonal}
            postId={post._id}
            onDelete={() => setConfirmDelete({ postId: post._id })}
          />
          {content}
        </article>
        <AuthorDetailsBox
          isPlaying={isPlaying}
          onPlayerListen={listen}
          onPlayerTimeChange={changeTime}
          playerCurrentTime={currentTime}
          playerDuration={duration}
          onFollow={followHandler}
          uid={post.author._id}
          avatar={post.author.avatar}
          isFollowing={authorFollowData?.isFollowing}
          followers={authorFollowData?.followers}
          username={post.author.username}
          userDescription={authorDescription}
          isPersonal={isPersonal}
          onDelete={deletePostHandler}
          postId={post._id}
        />
      </div>
      <PostControlMobile
        isPlaying={isPlaying}
        onListen={listen}
        onPlayerTimeChange={changeTime}
        playerCurrentTime={currentTime}
        playerDuration={duration}
      />
      <DeleteConfirmModal
        visible={!!confirmDelete}
        onClose={() => setConfirmDelete(undefined)}
        onDelete={deletePostHandler}
      />
    </>
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
