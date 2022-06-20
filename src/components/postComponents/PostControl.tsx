import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import Button from "../form/Button";

interface PostControlProps {
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
  postId: string;
  isDeleteLoading?: boolean;
}

const PostControl: React.FC<PostControlProps> = ({
  onDelete,
  postId,
  isDeleteLoading,
}) => {
  return (
    <div className="sticky px-5 py-6 bg-white rounded-lg shadow-lg dark:bg-gray-700 h-fit top-[5rem] flex flex-col items-center space-y-3">
      <Button href={`/post/${postId}/edit`} sm icon={FiEdit}>
        Edit
      </Button>
      <Button
        loading={isDeleteLoading}
        onClick={onDelete}
        color="red"
        sm
        icon={FiTrash}
      >
        Delete
      </Button>
    </div>
  );
};

export default PostControl;
