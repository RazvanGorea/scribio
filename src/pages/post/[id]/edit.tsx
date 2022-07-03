import { FormikHelpers } from "formik";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { revalidatePage } from "../../../api/global";
import { createPost, getPostById, updatePost } from "../../../api/posts";
import Authenticated from "../../../components/Authenticated";
import DotsLoading from "../../../components/DotsLoading";
import { EditorCore } from "../../../components/Editor";
import NewPostForm, {
  NewPostFormValues,
} from "../../../components/forms/NewPostForm";
import ImageUploader from "../../../components/imageRelated/ImageUploader";
const Editor = dynamic(import("../../../components/Editor"), { ssr: false });
// import Container from "../../components/layout/Container";
import ImageCropModal from "../../../components/modals/ImageCropModal";
import { useAuth } from "../../../context/AuthContext";
import { Post } from "../../../types/Post.type";

const EditPost: NextPage = () => {
  const router = useRouter();
  const { user } = useAuth();

  const editorRef = useRef<EditorCore | null>(null);
  const [rawThumbnail, setRawThumbnail] = useState<File | null>(null);
  const [croppedThumbnail, setCroppedThumbnail] = useState<File | null>(null);
  const [isModalVisible, setModalVisibility] = useState(false);
  const [post, setPost] = useState<Post | undefined>();

  const fetchPost = useCallback(async () => {
    const { id } = router.query;
    if (!id) return;

    const post = await getPostById(`${id}`);

    setPost(post);
  }, [router.query]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const submit = async (
    values: NewPostFormValues,
    { setSubmitting }: FormikHelpers<NewPostFormValues>
  ) => {
    try {
      if (!editorRef.current || !post || !user) return;

      // Get editor data
      const data = await editorRef.current.save();

      // Update post
      await updatePost(post._id, {
        title: values.title,
        thumbnail: croppedThumbnail || undefined,
        content: data,
      });

      await Promise.all([
        revalidatePage(`/profile/${user._id}`),
        revalidatePage(`/post/${post._id}`),
      ]);

      setSubmitting(false);

      // Redirect to created post with full reload
      window.location.href = `/post/${post._id}`;
    } catch (error: any) {
      setSubmitting(false);
    }
  };

  const handleImageUpload = (file: File) => {
    setRawThumbnail(file);
    setModalVisibility(true);
  };

  const handleCrop = (file: File) => {
    setCroppedThumbnail(file);
    setModalVisibility(false);
  };

  const handleModalClose = () => {
    setModalVisibility(false);
    setRawThumbnail(null);
    setCroppedThumbnail(null);
  };

  return (
    <>
      <Head>
        <title>Edit post | Scribio</title>
      </Head>
      <Authenticated redirectPath="/">
        {post ? (
          <div className="flex flex-col justify-center lg:flex-row">
            <div className="flex justify-center mx-auto max-w-[90ch] w-full">
              <Editor
                onInitialize={(instance) => (editorRef.current = instance)}
                defaultValue={post.content}
              />
            </div>
            <div className="p-5 bg-white rounded-lg shadow-lg lg:max-w-xs max-w-[90ch] mx-auto w-full lg:mx-0 mt-3 lg:mt-0 dark:bg-gray-700">
              <div className="sticky top-[6rem]">
                <div className="flex justify-center mt-8 mb-2">
                  <ImageUploader
                    label="Thumbnail*"
                    file={rawThumbnail}
                    handleChange={handleImageUpload}
                    types={["jpeg", "jpg", "png", "gif", "webp"]}
                  />
                </div>
                <NewPostForm
                  initialValue={post.title}
                  onSubmit={(values, helpers) =>
                    toast.promise(submit(values, helpers), {
                      loading: "Updating your post...",
                      success: "Successfully updated!",
                      error: (err) =>
                        err.response.data.message || "Something went wrong:(",
                    })
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <DotsLoading
            style={{ maxWidth: "320px", width: "50%", maxHeight: "initial" }}
          />
        )}

        <ImageCropModal
          visible={isModalVisible}
          onClose={handleModalClose}
          onCropComplete={handleCrop}
          aspect={16 / 9}
          imageType={rawThumbnail ? rawThumbnail.type : undefined}
          imageName={rawThumbnail ? rawThumbnail.name : undefined}
          imageUrl={
            rawThumbnail ? URL.createObjectURL(rawThumbnail) : undefined
          }
        />
      </Authenticated>
    </>
  );
};

export default EditPost;
