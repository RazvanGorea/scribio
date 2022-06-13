import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getRecentPosts } from "../api/posts";
import Container from "../components/layout/Container";
import { useAuth } from "../context/AuthContext";
import { PostPreview } from "../types/Post.type";
import UploadAvatarModal from "../components/modals/UploadAvatarModal";
import PostCardsRenderer from "../components/PostCardsRenderer";

interface HomeProps {
  posts: PostPreview[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  const router = useRouter();

  const { user } = useAuth();
  const [isUploadAvatarModalVisible, setUploadAvatarModalVisibility] =
    useState(false);

  useEffect(() => {
    const showUploadAvatarModal = router.query.showUploadAvatarModal;

    if (showUploadAvatarModal && user && !user.avatar.key)
      setUploadAvatarModalVisibility(true);
  }, [router, user]);

  console.log(posts);

  return (
    <>
      <Container>
        <PostCardsRenderer posts={posts} />
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
  const posts = await getRecentPosts();

  // Pass posts data to the page via props
  return {
    props: { posts },
  };
};

export default Home;
