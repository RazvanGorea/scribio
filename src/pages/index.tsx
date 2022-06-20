import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { GetPostsResponse, getPosts } from "../api/posts";
import Container from "../components/layout/Container";
import { useAuth } from "../context/AuthContext";
import UploadAvatarModal from "../components/modals/UploadAvatarModal";
import PostCardsRenderer from "../components/PostCardsRenderer";

interface HomeProps {
  posts: GetPostsResponse;
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  const router = useRouter();

  const { user } = useAuth();
  const [isUploadAvatarModalVisible, setUploadAvatarModalVisibility] =
    useState(false);
  const [postsData, setPostsData] = useState<GetPostsResponse>(posts);

  useEffect(() => {
    const showUploadAvatarModal = router.query.showUploadAvatarModal;

    if (showUploadAvatarModal && user && !user.avatar.key)
      setUploadAvatarModalVisibility(true);
  }, [router, user]);

  const fetchPosts = async () => {
    try {
      const res = await getPosts(postsData.page + 1);
      setPostsData((oldData) => ({
        page: res.page,
        hasMore: res.hasMore,
        data: oldData?.data ? [...oldData.data, ...res.data] : res.data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <PostCardsRenderer
          posts={postsData.data}
          hasMore={postsData.hasMore}
          onFetchMore={fetchPosts}
        />
      </Container>
      {user && (
        <UploadAvatarModal
          userId={user._id}
          visible={isUploadAvatarModalVisible}
          onClose={() => {
            setUploadAvatarModalVisibility(false);
            // Remove url query
            router.replace("/");
          }}
          userAvatar={user.avatar}
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const posts = await getPosts();

  // Pass posts data to the page via props
  return {
    props: { posts },
  };
};

export default Home;
