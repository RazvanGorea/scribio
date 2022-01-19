import { FormikHelpers } from "formik";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { createPost } from "../../api/posts";
import Authenticated from "../../components/Authenticated";
import { EditorCore } from "../../components/Editor";
import NewPostForm, {
  NewPostFormValues,
} from "../../components/forms/NewPostForm";
import ImageCrop from "../../components/imageRelated/ImageCrop";
import ImageUploader from "../../components/imageRelated/ImageUploader";
const Editor = dynamic(import("../../components/Editor"), { ssr: false });
import Container from "../../components/layout/Container";
import Modal from "../../components/layout/Modal";
import ImageCropModal from "../../components/modals/ImageCropModal";

const NewPost: NextPage = () => {
  const router = useRouter();

  const editorRef = useRef<EditorCore | null>(null);
  const [thumbnailError, setThumbnailError] = useState("");
  const [rawThumbnail, setRawThumbnail] = useState<File | null>(null);
  const [croppedThumbnail, setCroppedThumbnail] = useState<File | null>(null);
  const [isModalVisible, setModalVisibility] = useState(false);

  const submit = async (
    values: NewPostFormValues,
    { setSubmitting }: FormikHelpers<NewPostFormValues>
  ) => {
    try {
      if (!editorRef.current) return;

      if (!croppedThumbnail)
        return setThumbnailError("Please upload thubnail!");

      // Get editor data
      const data = await editorRef.current.save();

      // Create new post
      const res = await createPost({
        title: values.title,
        minutesToRead: values.minutesToRead,
        thumbnail: croppedThumbnail,
        content: data,
      });

      console.log(res);
      setSubmitting(false);
      router.push(`/posts/${res.postId}`);
    } catch (error: any) {
      console.log(error.response.data);
      setSubmitting(false);
    }
  };

  const handleImageUpload = (file: File) => {
    console.log(file);
    setRawThumbnail(file);
    setModalVisibility(true);
  };

  const handleCrop = (file: File) => {
    console.log(file);
    setCroppedThumbnail(file);
    setModalVisibility(false);
  };

  const handleModalClose = () => {
    setModalVisibility(false);
    setRawThumbnail(null);
    setCroppedThumbnail(null);
  };

  return (
    <Authenticated redirectPath="/">
      <Container sm>
        <Editor onInitialize={(instance) => (editorRef.current = instance)} />
        <div className="flex justify-center mt-8 mb-2">
          <div className="w-full max-w-xs">
            <ImageUploader
              error={thumbnailError}
              label="Thumbnail*"
              file={rawThumbnail}
              handleChange={handleImageUpload}
              types={["jpeg", "jpg", "png", "gif", "webp"]}
            />
          </div>
        </div>
        <NewPostForm onSubmit={submit} />
      </Container>
      <ImageCropModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onCropComplete={handleCrop}
        aspect={16 / 9}
        imageUrl={rawThumbnail ? URL.createObjectURL(rawThumbnail) : undefined}
      />
    </Authenticated>
  );
};

export default NewPost;
