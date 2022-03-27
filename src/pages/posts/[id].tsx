import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React, { useMemo } from "react";
import { getAllPostsIds, getPostById } from "../../api/posts";
import contentParser from "../../components/editorjsParser/contentParser";
import { Post as PostType } from "../../types/Post.type";

interface PostProps {
  post?: PostType;
}

const Post: NextPage<PostProps> = ({ post }) => {
  console.log(post);

  const content = useMemo(() => {
    if (post) return contentParser(post.content);
  }, [post]);

  if (!post) return <div>Loading...</div>;

  return (
    <article className="px-7 mx-auto prose bg-white rounded-lg shadow-lg py-8 dark:bg-gray-700 prose-slate w-full lg:prose-lg max-w-[80ch] dark:prose-invert">
      {content}
    </article>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getAllPostsIds();

  const paths = ids.map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: true,
  };
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<PostProps, Params> = async (
  context
) => {
  const params = context.params!;

  const post = await getPostById(params.id);

  // Pass post data to the page via props
  return {
    props: { post },
  };
};

export default Post;
