import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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

  const updateUsernameHandler = async (newUsername: string) => {
    if (!user) return;

    try {
      await updateUsername(newUsername);

      const ids = await getUserPostsId(user._id);

      // Revalidate posts
      if (ids.length > 0) ids.map((id) => revalidatePage(`/posts/${id}`));

      // Revalidate profile
      revalidatePage(`/profile/${user._id}`);

      reload();
    } catch (error) {
      console.log(error);
    }
  };

  const updateDescriptionHandler = async (newDescription: string) => {
    if (!user) return;

    try {
      await updateDescription(newDescription);

      const ids = await getUserPostsId(user._id);

      // Revalidate posts
      if (ids.length > 0) ids.map((id) => revalidatePage(`/posts/${id}`));

      // Revalidate profile
      revalidatePage(`/profile/${user._id}`);

      reload();
    } catch (error) {
      console.log(error);
    }
  };

  const initEmailUpdateHandler = async (newEmail: string) => {
    try {
      await initEmailUpdate(newEmail);

      setConfirmationModalVisibility(true);
    } catch (error) {
      console.log(error);
    }
  };

  const finishEmailUpdateHandler = async (code: string) => {
    try {
      await finishEmailUpdate(+code);

      reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
  );
};

export default Edit;
