import React from "react";
import ImageCrop from "../imageRelated/ImageCrop";
import Modal from "../layout/Modal";

interface ImageCropModalProps {
  onClose: () => void;
  visible: boolean;
  imageUrl?: string;
  imageType?: string;
  imageName?: string;
  onCropComplete: (file: File) => void;
  aspect?: number;
  cropShape?: "rect" | "round";
  showGrid?: boolean;
}

const ImageCropModal: React.FC<ImageCropModalProps> = ({
  visible,
  onClose,
  imageUrl,
  imageType,
  imageName,
  onCropComplete,
  aspect = 16 / 9,
  cropShape,
  showGrid,
}) => {
  return (
    <Modal onClose={onClose} visible={visible} withCross>
      <h2 className="mb-3">Crop your image</h2>
      {imageUrl && imageType && imageName && (
        <ImageCrop
          onCropComplete={onCropComplete}
          image={imageUrl}
          imageType={imageType}
          imageName={imageName}
          aspect={aspect}
          cropShape={cropShape}
          showGrid={showGrid}
        />
      )}
    </Modal>
  );
};

export default ImageCropModal;
