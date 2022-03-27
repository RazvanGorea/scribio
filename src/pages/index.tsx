import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllPosts } from "../api/posts";
import Card from "../components/Card";
import Container from "../components/layout/Container";
import { useAuth } from "../context/AuthContext";
import { Post } from "../types/Post.type";
import UploadAvatarModal from "../components/modals/UploadAvatarModal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Home: NextPage<{ posts?: Post[] }> = ({ posts }) => {
  const router = useRouter();

  const { user } = useAuth();
  const [isUploadAvatarModalVisible, setUploadAvatarModalVisibility] =
    useState(false);

  useEffect(() => {
    const showUploadAvatarModal = router.query.showUploadAvatarModal;

    if (showUploadAvatarModal && user && !user.avatar.key)
      setUploadAvatarModalVisibility(true);
  }, [router, user]);

  return (
    <>
      <Container>
        <div className="flex flex-wrap justify-around">
          {posts?.map((post) => (
            <Card
              key={post._id}
              thumbnail={post.thumbnail}
              author={post.author}
              title={post.title}
              content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              publishedDate={dayjs(post.createdAt).fromNow()}
              timeToRead={post.timeToRead}
              href={`/posts/${post._id}`}
            />
          ))}
        </div>
      </Container>
      {user && (
        <UploadAvatarModal
          visible={isUploadAvatarModalVisible}
          onClose={() => {
            setUploadAvatarModalVisibility(false);
            // Delete url query
            router.replace("/");
          }}
          user={user}
        />
      )}
    </>
  );
};

Home.getInitialProps = async () => {
  try {
    const posts = await getAllPosts();
    return { posts: posts };
  } catch (error) {
    return {};
  }
};

export default Home;
