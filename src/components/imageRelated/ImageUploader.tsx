import React, { memo } from "react";
import { FileUploader } from "react-drag-drop-files";

interface ImageUploaderProps {
  handleChange: (file: File) => void;
  types: string[];
  error?: string;
  label?: string;
  file?: File | null;
  maxSize?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  handleChange,
  types,
  error,
  label,
  file,
  maxSize = 10,
}) => {
  return (
    <div>
      {label && <label className="text-black dark:text-white">{label}</label>}
      <div className="transition-colors bg-white bg-opacity-25 hover:bg-opacity-100 dark:bg-opacity-5 dark:hover:bg-opacity-20 fileUploaderContainer">
        <FileUploader
          file={file}
          name="imageUploader"
          handleChange={handleChange}
          types={types}
          maxSize={maxSize}
        />
      </div>
      {error && <span className="block text-red-500">{error}</span>}
    </div>
  );
};

export default memo(ImageUploader);
