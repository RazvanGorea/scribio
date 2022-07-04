import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { revalidatePage } from "../../api/global";
import {
  finishEmailUpdate,
  initEmailUpdate,
  updateDescription,
  updateUsername,
} from "../../api/profile";
import { getUserDescription, getUserPostsId } from "../../api/users";
import Authenticated from "../../components/Authenticated";
import DotsLoading from "../../components/DotsLoading";
import IconButton from "../../components/form/IconButton";
import Avatar from "../../components/imageRelated/Avatar";
import Container from "../../components/layout/Container";
import ConfirmationCodeModal from "../../components/modals/ConfirmationCodeModal";
import UploadAvatarModal from "../../components/modals/UploadAvatarModal";
import DescriptionUpdate from "../../components/settingsComponents/DescriptionUpdate";
import EmailUpdate from "../../components/settingsComponents/EmailUpdate";
import UsernameUpdate from "../../components/settingsComponents/UsernameUpdate";
import { useAuth } from "../../context/AuthContext";

const Edit: NextPage = () => {
  const router = useRouter();
  const { user, isUserInitialized } = useAuth();

  const [description, setDescription] = useState<string | undefined>();
  const [isUploadModalVisible, setUploadModalVisibility] = useState(false);
  const [isConfirmationModalVisible, setConfirmationModalVisibility] =
    useState(false);

  useEffect(() => {
    if (isUserInitialized && user)
      getUserDescription(user._id).then((desc) => setDescription(desc));
  }, [isUserInitialized, user]);

  // Reload page
  const reload = () => router.reload();

  const revalidatePages = async () => {
    if (!user) return;

    const ids = await getUserPostsId(user._id);

    const promises = [revalidatePage(`/profile/${user._id}`)];

    ids.forEach((id) => promises.push(revalidatePage(`/post/${id}`)));

    return await Promise.all(promises);
  };

  const updateUsernameHandler = async (newUsername: string) => {
    if (!user) return;

    try {
      await updateUsername(newUsername);

      await revalidatePages();

      reload();
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
    }
  };

  const updateDescriptionHandler = async (newDescription: string) => {
    if (!user) return;

    try {
      await updateDescription(newDescription);

      await revalidatePages();

      reload();
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
    }
  };

  const initEmailUpdateHandler = async (newEmail: string) => {
    try {
      await initEmailUpdate(newEmail);

      setConfirmationModalVisibility(true);
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
    }
  };

  const finishEmailUpdateHandler = async (code: string) => {
    try {
      await finishEmailUpdate(+code);

      reload();
    } catch (error) {
      if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
    }
  };

  return (
    <>
      <Head>
        <title>Edit profile | Scribio</title>
      </Head>
      <Authenticated redirectPath="/logIn">
        <Container sm>
          <h2 className="mb-4">Edit profile</h2>
          <div className="px-5 py-6 space-y-4 bg-white rounded-lg shadow-lg dark:bg-gray-700 h-fit">
            <div className="flex justify-center">
              <div className="relative">
                {user && <Avatar size={110} src={user?.avatar} />}
                <IconButton
                  onClick={() => setUploadModalVisibility(true)}
                  icon={FiEdit}
                  style={{ position: "absolute", bottom: -16, right: -16 }}
                />
              </div>
            </div>
            <UsernameUpdate
              onUpdate={updateUsernameHandler}
              initialValue={user?.username}
            />
            <EmailUpdate
              onUpdate={initEmailUpdateHandler}
              initialValue={user?.email}
            />
            {typeof description === "undefined" ? (
              <DotsLoading />
            ) : (
              <DescriptionUpdate
                onUpdate={updateDescriptionHandler}
                initialValue={description}
              />
            )}
          </div>
        </Container>
        {user && (
          <UploadAvatarModal
            userId={user._id}
            userAvatar={user.avatar}
            visible={isUploadModalVisible}
            onClose={() => setUploadModalVisibility(false)}
          />
        )}
        <ConfirmationCodeModal
          visible={isConfirmationModalVisible}
          onClose={() => setConfirmationModalVisibility(false)}
          onSubmit={finishEmailUpdateHandler}
          heading="Email verification"
          description="We sent you an confirmation code to your new email"
        />
      </Authenticated>
    </>
  );
};

export default Edit;
