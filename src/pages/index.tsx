import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllPosts } from "../api/posts";
import Card from "../components/Card";
import Container from "../components/layout/Container";
import { useAuth } from "../context/AuthContext";
import { Post } from "../types/Post.type";
import UploadAvatarModal from "../components/modals/UploadAvatarModal";

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
              thumbnail={{
                src: post.thumbnail.url,
                height: post.thumbnail.height,
                width: post.thumbnail.width,
                blurDataUrl: post.thumbnail.placeholder,
              }}
              authorAvatarUrl="https://pbs.twimg.com/profile_images/1359299696464912384/yF59pRq8_400x400.jpg"
              author={post.author.username}
              title={post.title}
              content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              publishedDate="08.01.2022"
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
