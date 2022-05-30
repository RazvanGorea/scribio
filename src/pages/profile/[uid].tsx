import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { getAllUserIds, getUserData, getUserPosts } from "../../api/users";
import Button from "../../components/form/Button";
import Avatar from "../../components/imageRelated/Avatar";
import Container from "../../components/layout/Container";
import Tabs from "../../components/Tabs";
import { PostPreview } from "../../types/Post.type";
import { User } from "../../types/User.type";

import PostCardsRenderer from "../../components/PostCardsRenderer";

interface ProfileProps {
  user: User;
  userPosts: PostPreview[];
}

const Profile: React.FC<ProfileProps> = ({ user, userPosts }) => {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          <Avatar size={55} src={user.avatar} />
          <div>
            <h5>{user.username}</h5>
            <span className="font-light">100 subscribers</span>
          </div>
        </div>
        <Button style={{ textTransform: "uppercase" }}>Subscribe</Button>
      </div>
      <Tabs
        items={[{ text: "Posts" }, { text: "Series" }, { text: "About" }]}
        onChange={(i) => console.log("Active Tab: ", i)}
      />
      <PostCardsRenderer
        containerStyles={{ paddingTop: "2rem" }}
        posts={userPosts}
      />
    </Container>
  );
};

// _____________
export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllUserIds();

  const paths = ids.map((uid) => ({ params: { uid } }));

  return {
    paths,
    fallback: true,
  };
};

interface Params extends ParsedUrlQuery {
  uid: string;
}

export const getStaticProps: GetStaticProps<ProfileProps, Params> = async (
  context
) => {
  const params = context.params!;

  const userData = await getUserData(params.uid);
  const userPosts = await getUserPosts(params.uid);

  return {
    props: { user: userData, userPosts },
  };
};

export default Profile;
