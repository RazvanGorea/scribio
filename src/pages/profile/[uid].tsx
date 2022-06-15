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
import { getPosts, GetPostsResponse } from "../../api/posts";

interface ProfileProps {
  user?: UserPublicProfile;
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
  const [sort, setSort] = useState<string>("Newer first");

  const fetchUserFollowData = useCallback(async () => {
    if (!user) return;

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
    if (!user) return;

    const views = await getUserTotalViews(user._id);
    setTotalViews(views);
  }, [user]);

  useEffect(() => {
    fetchUserFollowData();
    fetchUserTotalViews();
  }, [fetchUserFollowData, fetchUserTotalViews]);

  const followHandler = () => {
    if (!followData || !user) return;
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

  const fetchPosts = async () => {
    const res = await getPosts(posts.page + 1);
    setPosts((oldData) => ({
      page: res.page,
      hasMore: res.hasMore,
      data: oldData?.data ? [...oldData.data, ...res.data] : res.data,
    }));
  };

  if (!user) return <div>Loading...</div>;

  let display: JSX.Element;
  switch (tab) {
    case "Posts":
      display =
        posts.data.length > 0 ? (
          <PostCardsRenderer
            containerStyles={{ paddingTop: "2rem" }}
            posts={posts.data}
            hasMore={posts.hasMore}
            onFetchMore={fetchPosts}
          />
        ) : (
          <EmptyComponent
            animationData={emptySearchAnim}
            text={
              isPersonal ? "You have no posts" : `${user.username} has no posts`
            }
          />
        );
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
        />
      );
      break;
  }

  return (
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
            defaultSelect="Newer first"
            items={["Newer first", "Older first", "Most popular"]}
            onSelect={(itemText) => setSort(itemText)}
          />
        )}
      </div>
      {display}
    </Container>
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
