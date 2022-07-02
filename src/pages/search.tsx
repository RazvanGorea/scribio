import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getPosts, GetPostsResponse } from "../api/posts";
import DotsLoading from "../components/DotsLoading";
import EmptyComponent from "../components/EmptyComponent";
import Container from "../components/layout/Container";
import PostCardsRenderer from "../components/PostCardsRenderer";
import * as emptySearchAnim from "../assets/lottie/emptySearch.json";
import Head from "next/head";

const Search: NextPage = () => {
  const router = useRouter();

  const [postsData, setPostsData] = useState<GetPostsResponse>();
  const [isLoading, setIsLoading] = useState(true);

  const searchQuery = useRef("");

  const nextPage = postsData ? postsData.page + 1 : 0;

  const fetchPosts = useCallback(
    async (searchQuery: string, cleanFetch = false) => {
      try {
        const res = await getPosts(cleanFetch ? 0 : nextPage, searchQuery);
        if (cleanFetch) {
          setPostsData(res);
        } else {
          setPostsData((oldData) => ({
            page: res.page,
            hasMore: res.hasMore,
            data: oldData?.data ? [...oldData.data, ...res.data] : res.data,
          }));
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    },
    [nextPage]
  );

  useEffect(() => {
    const { query } = router.query;

    if (typeof query === "string" && query !== searchQuery.current) {
      fetchPosts(query, true);
      searchQuery.current = query;
    }
  }, [router.query, fetchPosts]);

  return (
    <>
      <Head>
        <title>Search | Scribio</title>
      </Head>
      <Container>
        {postsData && postsData.data.length > 0 && !isLoading && (
          <h2 className="mb-4 text-3xl sm:text-4xl">
            Search results for:{" "}
            <span className="italic font-normal">{searchQuery.current}</span>
          </h2>
        )}
        {postsData && (
          <PostCardsRenderer
            posts={postsData.data}
            hasMore={postsData.hasMore}
            onFetchMore={() => fetchPosts(searchQuery.current)}
          />
        )}
        {isLoading && (
          <div className="flex items-center justify-center w-full h-full">
            <DotsLoading style={{ maxWidth: 200, maxHeight: "initial" }} />
          </div>
        )}
        {!isLoading && postsData?.data.length === 0 && (
          <EmptyComponent
            containerStyle={{ marginTop: "5rem" }}
            animationData={emptySearchAnim}
            text="Nothing found"
          />
        )}
      </Container>
    </>
  );
};

export default Search;
