import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { getSaves } from "../api/profile";
import Authenticated from "../components/Authenticated";
import Container from "../components/layout/Container";
import PostCardsRenderer from "../components/PostCardsRenderer";
import { PostPreview } from "../types/Post.type";
import * as emptyAnim from "../assets/lottie/emptyFace.json";
import DotsLoading from "../components/DotsLoading";
import { unsavePost } from "../api/posts";
import Head from "next/head";

const Saves: NextPage = () => {
  const [savedPosts, setSavedPosts] = useState<PostPreview[]>();

  useEffect(() => {
    getSaves()
      .then((saves) => setSavedPosts(saves))
      .catch((err) => console.log(err));
  }, []);

  const handleUnsave = (postId: string) => {
    unsavePost(postId);
    setSavedPosts((posts) => {
      if (!posts) return undefined;
      const newPosts = [...posts];
      const deleteIndex = newPosts.findIndex((post) => post._id === postId);
      newPosts.splice(deleteIndex, 1);
      return newPosts;
    });
  };

  let display = (
    <div className="flex items-center justify-center w-full h-full">
      <DotsLoading style={{ maxWidth: 200, maxHeight: "initial" }} />
    </div>
  );

  if (savedPosts && savedPosts.length === 0)
    display = (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Lottie
          style={{ cursor: "default", maxWidth: 320, maxHeight: 240 }}
          options={{ animationData: emptyAnim, loop: true, autoplay: true }}
          isClickToPauseDisabled
        />
        <h2>You have no saves</h2>
      </div>
    );
  else if (savedPosts && savedPosts.length > 0)
    display = (
      <div>
        <h2 className="mb-4">Your saves</h2>
        {savedPosts && (
          <PostCardsRenderer
            type="saves"
            onUnsave={handleUnsave}
            posts={savedPosts}
            hasMore={false}
          />
        )}
      </div>
    );

  return (
    <>
      <Head>
        <title>Saves | Scribio</title>
      </Head>
      <Authenticated redirectPath="/logIn">
        <Container>{display}</Container>
      </Authenticated>
    </>
  );
};

export default Saves;
