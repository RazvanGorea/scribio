import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import React, { useCallback, useEffect, useState } from "react";
import {
  followUser,
  getAllUserIds,
  getPublicUserProfile,
  getUserFollowersNumber,
  getUserPosts,
  getUserTotalViews,
  isFollowing,
  unfollowUser,
} from "../../api/users";

import Container from "../../components/layout/Container";
import Tabs from "../../components/Tabs";
import { PostPreview } from "../../types/Post.type";
import { BasicUser, UserPublicProfile } from "../../types/User.type";
import PostCardsRenderer from "../../components/PostCardsRenderer";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import AboutUser from "../../components/AboutUser";
import * as emptySearchAnim from "../../assets/lottie/emptySearch.json";
import EmptyComponent from "../../components/EmptyComponent";
import ProfileHeader from "../../components/profileComponents/ProfileHeader";
import DropDown from "../../components/form/DropDown";
import { deletePost, GetPostsResponse } from "../../api/posts";
import DotsLoading from "../../components/DotsLoading";
import { FiEdit, FiTrash } from "react-icons/fi";

import { revalidatePage } from "../../api/global";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";
import Head from "next/head";
import { getFollowers } from "../../api/profile";
import FollowerCard from "../../components/profileComponents/FollowerCard";

interface ProfileProps {
  user: UserPublicProfile;
  userPosts: GetPostsResponse;
}

const Profile: React.FC<ProfileProps> = ({ user, userPosts }) => {
  const router = useRouter();
  const { isUserInitialized, user: authUser, fetchFollowings } = useAuth();
  const [tab, setTab] = useState("posts");
  const [followData, setFollowData] = useState<
    | {
        isFollowing: boolean;
        followers: number;
      }
    | undefined
  >();
  const [posts, setPosts] = useState<GetPostsResponse>(userPosts);
  const [totalViews, setTotalViews] = useState<number | undefined>();
  const [sort, setSort] = useState<{ text: string; value: string }>({
    text: "Newer first",
    value: "newer",
  });
  const [isSortLoading, setSortLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ postId: string }>();
  const [followers, setFollowers] = useState<BasicUser[]>();

  // Check if current profile belongs to authenticated user
  const isPersonal = user?._id === authUser?._id;

  const tabs = isPersonal
    ? [
        { text: "Posts", value: "posts" },
        { text: "Followers", value: "followers" },
        { text: "About", value: "about" },
      ]
    : [
        { text: "Posts", value: "posts" },
        { text: "About", value: "about" },
      ];

  const fetchUserFollowData = useCallback(async () => {
    if (isUserInitialized && !isPersonal) {
      const [isFollow, followers] = await Promise.all([
        isFollowing(user._id),
        getUserFollowersNumber(user._id),
      ]);

      setFollowData({ isFollowing: isFollow, followers });
    } else if (isUserInitialized && isPersonal) {
      const res = await getFollowers();
      setFollowData({ isFollowing: false, followers: res.length });
      setFollowers(res);
    } else {
      const followers = await getUserFollowersNumber(user._id);
      setFollowData({ isFollowing: false, followers });
    }
  }, [isUserInitialized, user, isPersonal]);

  const fetchUserTotalViews = useCallback(async () => {
    const views = await getUserTotalViews(user._id);
    setTotalViews(views);
  }, [user]);

  useEffect(() => {
    fetchUserFollowData();
    fetchUserTotalViews();

    return () => {
      setFollowers(undefined);
    };
  }, [fetchUserFollowData, fetchUserTotalViews]);

  const followHandler = () => {
    if (!followData) return;
    if (!isUserInitialized) return router.push("/logIn");

    if (followData.isFollowing) {
      unfollowUser(user._id).then(() => fetchFollowings());
      setFollowData((det) => {
        if (!det) return;
        return {
          followers: det.followers - 1,
          isFollowing: false,
        };
      });
    } else {
      followUser(user._id).then(() => fetchFollowings());
      setFollowData((det) => {
        if (!det) return;
        return {
          followers: det.followers + 1,
          isFollowing: true,
        };
      });
    }
  };

  const fetchPosts = useCallback(
    async (cleanFetch = false) => {
      if (!user) return;

      const res = await getUserPosts(
        user._id,
        cleanFetch ? 0 : posts.page + 1,
        sort.value
      );
      if (cleanFetch) {
        setSortLoading(false);
        setPosts(res);
      } else {
        setPosts((oldData) => ({
          page: res.page,
          hasMore: res.hasMore,
          data: oldData?.data ? [...oldData.data, ...res.data] : res.data,
        }));
      }
    },
    [posts.page, sort, user]
  );

  useEffect(() => {
    setPosts(userPosts);
    setSort({ text: "Newer first", value: "newer" });
  }, [userPosts]);

  useEffect(() => {
    if (isSortLoading && sort) fetchPosts(true);
  }, [sort, isSortLoading, fetchPosts]);

  const deletePostHandler = async () => {
    try {
      if (!confirmDelete) return;

      await deletePost(confirmDelete.postId);

      // Update profile page
      await revalidatePage(`/profile/${user._id}`);

      //full page reload
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  let display: JSX.Element | JSX.Element[];
  switch (tab) {
    case "posts":
      if (isSortLoading) {
        display = <DotsLoading style={{ maxWidth: 200, maxHeight: "auto" }} />;
      } else {
        display =
          posts.data.length > 0 ? (
            <PostCardsRenderer
              posts={posts.data}
              hasMore={posts.hasMore}
              onFetchMore={fetchPosts}
              type={user._id === authUser?._id ? "profile" : "default"}
              profileCardsMenuOptions={[
                {
                  text: "Edit",
                  icon: FiEdit,
                  onClick: (postId) => router.push(`/post/${postId}/edit`),
                },
                {
                  text: "Delete",
                  icon: FiTrash,
                  color: "red",
                  onClick: (postId) => setConfirmDelete({ postId }),
                },
              ]}
            />
          ) : (
            <EmptyComponent
              animationData={emptySearchAnim}
              text={
                isPersonal
                  ? "You have no posts"
                  : `${user.username} has no posts`
              }
            />
          );
      }
      break;

    case "about":
      display = (
        <AboutUser
          description={user.description}
          totalPosts={user.posts}
          registerDate={user.registerDate}
          totalViews={totalViews}
        />
      );
      break;

    case "followers":
      display =
        followers && followers.length > 0 ? (
          followers.map((follower) => (
            <FollowerCard
              onClick={() => setTab("posts")}
              key={follower._id}
              username={follower.username}
              avatar={follower.avatar}
              userId={follower._id}
            />
          ))
        ) : (
          <EmptyComponent
            animationData={emptySearchAnim}
            text={
              isPersonal
                ? "You have no followers"
                : `${user.username} has no followers`
            }
          />
        );
      break;

    default:
      display = (
        <PostCardsRenderer
          posts={posts.data}
          hasMore={posts.hasMore}
          onFetchMore={fetchPosts}
          type={user._id === authUser?._id ? "profile" : "default"}
          profileCardsMenuOptions={[
            {
              text: "Edit",
              icon: FiEdit,
              onClick: (postId) => router.push(`/post/${postId}/edit`),
            },
            {
              text: "Delete",
              icon: FiTrash,
              color: "red",
              onClick: (postId) => setConfirmDelete({ postId }),
            },
          ]}
        />
      );
      break;
  }

  return (
    <>
      <Head>
        <title>{user.username} | Scribio</title>
      </Head>
      <Container>
        <div className="pb-11 sm:pb-0">
          <ProfileHeader
            avatar={user.avatar}
            onFollow={followHandler}
            username={user.username}
            followers={followData?.followers}
            isFollowing={followData?.isFollowing}
            isPersonal={isPersonal}
          />
          <div className="flex items-center justify-between my-4">
            <div className="hidden sm:block">
              <Tabs value={tab} items={tabs} onChange={(val) => setTab(val)} />
            </div>
            {(tab === "posts" || tab === "series") && (
              <DropDown
                value={sort}
                items={[
                  { text: "Newer first", value: "newer" },
                  { text: "Older first", value: "older" },
                  { text: "Most popular", value: "popularity" },
                ]}
                onSelect={(item) => {
                  setSortLoading(true);
                  setSort(item);
                }}
              />
            )}
          </div>
          {display}
        </div>
      </Container>

      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg dark:bg-gray-800 sm:hidden shadow-black">
        <Tabs
          value={tab}
          items={tabs}
          fullWidth
          onChange={(val) => setTab(val)}
        />
      </div>

      <DeleteConfirmModal
        visible={!!confirmDelete}
        onClose={() => setConfirmDelete(undefined)}
        onDelete={deletePostHandler}
      />
    </>
  );
};

// _____________
export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllUserIds();

  const paths = ids.map((uid) => ({ params: { uid } }));

  return {
    paths,
    fallback: false,
  };
};

interface Params extends ParsedUrlQuery {
  uid: string;
}

export const getStaticProps: GetStaticProps<ProfileProps, Params> = async (
  context
) => {
  const params = context.params!;

  const [userData, userPosts] = await Promise.all([
    getPublicUserProfile(params.uid),
    getUserPosts(params.uid),
  ]);

  return {
    props: { user: userData, userPosts },
  };
};

export default Profile;
