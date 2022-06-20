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
import { UserPublicProfile } from "../../types/User.type";
import PostCardsRenderer from "../../components/PostCardsRenderer";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import AboutUser from "../../components/AboutUser";
import * as emptySearchAnim from "../../assets/lottie/emptySearch.json";
import EmptyComponent from "../../components/EmptyComponent";
import ProfileHeader from "../../components/ProfileHeader";
import DropDown from "../../components/form/DropDown";
import { deletePost, getPosts, GetPostsResponse } from "../../api/posts";
import { PostSort } from "../../types/PostSort.type";
import DotsLoading from "../../components/DotsLoading";
import { FiEdit, FiTrash } from "react-icons/fi";
import Modal from "../../components/layout/Modal";
import Button from "../../components/form/Button";
import { revalidatePage } from "../../api/global";

interface ProfileProps {
  user: UserPublicProfile;
  userPosts: GetPostsResponse;
}

const Profile: React.FC<ProfileProps> = ({ user, userPosts }) => {
  const router = useRouter();
  const { isUserInitialized, user: authUser, fetchFollowings } = useAuth();

  // Check if current profile belongs to authenticated user
  const isPersonal = user?._id === authUser?._id;

  const [tab, setTab] = useState("Posts");
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
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const fetchUserFollowData = useCallback(async () => {
    if (isUserInitialized && !isPersonal) {
      const [isFollow, followers] = await Promise.all([
        isFollowing(user._id),
        getUserFollowersNumber(user._id),
      ]);

      setFollowData({ isFollowing: isFollow, followers });
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
      setIsDeleteLoading(true);

      await deletePost(confirmDelete.postId);

      // Update profile page
      await revalidatePage(`/profile/${user._id}`);

      //full page reload
      window.location.reload();
    } catch (error) {
      console.log(error);
      setIsDeleteLoading(false);
    }
  };

  let display: JSX.Element;
  switch (tab) {
    case "Posts":
      if (isSortLoading) {
        display = <DotsLoading style={{ maxWidth: 200, maxHeight: "auto" }} />;
      } else {
        display =
          posts.data.length > 0 ? (
            <PostCardsRenderer
              containerStyles={{ paddingTop: "2rem" }}
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

    case "About":
      display = (
        <AboutUser
          description={user.description}
          totalPosts={user.posts}
          registerDate={user.registerDate}
          totalViews={totalViews}
        />
      );
      break;

    case "Series":
      display = (
        <EmptyComponent
          animationData={emptySearchAnim}
          text={
            isPersonal ? "You have no series" : `${user.username} has no series`
          }
        />
      );
      break;

    default:
      display = (
        <PostCardsRenderer
          containerStyles={{ paddingTop: "2rem" }}
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
      <Container>
        <ProfileHeader
          avatar={user.avatar}
          onFollow={followHandler}
          username={user.username}
          followers={followData?.followers}
          isFollowing={followData?.isFollowing}
          isPersonal={isPersonal}
        />
        <div className="flex items-center justify-between">
          <Tabs
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
            items={[{ text: "Posts" }, { text: "Series" }, { text: "About" }]}
            onChange={(i, text) => setTab(text)}
          />
          {(tab === "Posts" || tab === "Series") && (
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
      </Container>
      <Modal
        visible={!!confirmDelete}
        onClose={() => setConfirmDelete(undefined)}
      >
        <h2 className="text-center">Are you sure?</h2>
        <div className="flex justify-center mt-5 space-x-3">
          <Button onClick={() => setConfirmDelete(undefined)}>Cancel</Button>
          <Button
            onClick={deletePostHandler}
            loading={isDeleteLoading}
            color="red"
          >
            Delete
          </Button>
        </div>
      </Modal>
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
