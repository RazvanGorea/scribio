import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { getPosts, GetPostsResponse } from "../../api/posts";
import Container from "../../components/layout/Container";

const Search: NextPage = () => {
  const router = useRouter();

  const [posts, setPosts] = useState<GetPostsResponse>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await getPosts();
      setPosts(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const { search } = router.query;
  }, [router.query]);

  return <Container></Container>;
};

export default Search;
