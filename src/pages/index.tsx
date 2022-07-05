import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { GetPostsResponse, getPosts } from "../api/posts";
import Container from "../components/layout/Container";
import PostCardsRenderer from "../components/PostCardsRenderer";
import Head from "next/head";
import axios from "axios";
import toast from "react-hot-toast";

interface HomeProps {
  posts: GetPostsResponse;
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  const [postsData, setPostsData] = useState<GetPostsResponse>(posts);

  const fetchPosts = async () => {
    try {
      const res = await getPosts(postsData.page + 1);
      setPostsData((oldData) => ({
        page: res.page,
        hasMore: res.hasMore,
        data: oldData?.data ? [...oldData.data, ...res.data] : res.data,
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
    }
  };

  return (
    <>
      <Head>
        <title>Home | Scribio</title>
      </Head>
      <Container>
        <PostCardsRenderer
          posts={postsData.data}
          hasMore={postsData.hasMore}
          onFetchMore={fetchPosts}
        />
      </Container>
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
