import React, { ChangeEventHandler, useRef, useState, memo } from "react";
import Button from "../form/Button";
import IconButton from "../form/IconButton";
import Avatar from "../imageRelated/Avatar";
import Modal from "../layout/Modal";
import { FiEdit } from "react-icons/fi";
import ImageCropModal from "./ImageCropModal";
import { updateAvatar } from "../../api/profile";
import { ImageData } from "../../types/ImageData.type";
import { revalidatePage } from "../../api/global";
import { getUserPostsId } from "../../api/users";
import { useRouter } from "next/router";

interface UploadAvatarModalProps {
  visible: boolean;
  onClose: () => void;
  userAvatar: ImageData;
  userId: string;
}

const UploadAvatarModal: React.FC<UploadAvatarModalProps> = ({
  visible,
  onClose,
  userAvatar,
  userId,
}) => {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const [rawAvatar, setRawAvatar] = useState<File | null>(null);
  const [finalAvatar, setFinalAvatar] = useState<File | null>(null);
  const [isCropModalVisible, setCropModalVisibility] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const resetInput = () => {
    const input = inputRef.current;
    if (input) {
      input.value = "";
      input.files = null;
    }
  };

  const revalidatePages = async () => {
    const ids = await getUserPostsId(userId);

    const promises = [revalidatePage(`/profile/${userId}`)];

    ids.forEach((id) => promises.push(revalidatePage(`/post/${id}`)));

    return await Promise.all(promises);
  };

  const handleRawAvatarChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    const file = files ? files[0] : null;

    if (!file) return;

    setRawAvatar(file);
    setCropModalVisibility(true);

    // Clear input value
    resetInput();
  };

  const handleCropComplete = (file: File) => {
    setCropModalVisibility(false);
    setFinalAvatar(file);
  };

  const handleCropModalClose = () => {
    setCropModalVisibility(false);
    setFinalAvatar(null);

    // Clear input value
    resetInput();
  };

  const handleUpload = async () => {
    try {
      if (!finalAvatar) return;
      setLoading(true);

      await updateAvatar(finalAvatar);

      await revalidatePages();

      // Reload page
      router.reload();

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        visible={visible && !isCropModalVisible}
        onClose={onClose}
        withCross
      >
        <div className="flex flex-col items-center w-full pb-2 space-y-4">
          <div className="text-center">
            <h2>Upload profile image</h2>
            <p className="text-black dark:text-white">
              Upload new profile image to highlight your identity
            </p>
          </div>
          <div className="relative">
            <Avatar
              size={150}
              src={{
                width: userAvatar.width,
                height: userAvatar.height,
                placeholder: userAvatar.placeholder,
                key: userAvatar.key,
                url: finalAvatar
                  ? URL.createObjectURL(finalAvatar)
                  : userAvatar.url,
              }}
            />
            <IconButton
              onClick={() => inputRef.current?.click()}
              icon={FiEdit}
              style={{ position: "absolute", bottom: -10, right: -10 }}
            />
            <input
              onChange={handleRawAvatarChange}
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>
          <Button
            loading={isLoading}
            disabled={!finalAvatar}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </div>
      </Modal>
      <ImageCropModal
        visible={isCropModalVisible}
        onClose={handleCropModalClose}
        imageUrl={rawAvatar ? URL.createObjectURL(rawAvatar) : undefined}
        imageType={rawAvatar ? rawAvatar.type : undefined}
        imageName={rawAvatar ? rawAvatar.name : undefined}
        aspect={1 / 1}
        onCropComplete={handleCropComplete}
        cropShape="round"
        showGrid={false}
      />
    </>
  );
};

export default memo(UploadAvatarModal);
