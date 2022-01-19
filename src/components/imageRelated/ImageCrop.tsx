import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Area, Point } from "react-easy-crop/types";
import getCroppedImg from "../../utils/getCroppedImg";
import Button from "../form/Button";

interface ImageCropProps {
  onCropComplete: (file: File) => void;
  aspect: number;
  image: string;
  imageType: string;
  imageName: string;
  cropShape?: "rect" | "round";
  showGrid?: boolean;
}

const ImageCrop: React.FC<ImageCropProps> = ({
  onCropComplete,
  aspect,
  image,
  imageType,
  imageName,
  cropShape = "rect",
  showGrid = true,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>();

  const handleCrop = async () => {
    if (!croppedArea) return;

    const file = await getCroppedImg(image, imageType, imageName, croppedArea);

    if (!file) return;

    onCropComplete(file);
  };

  return (
    <div>
      <div className="relative bg-gray-700 h-96">
        <Cropper
          image={image}
          cropShape={cropShape}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={(_, z) => setCroppedArea(z)}
          onZoomChange={setZoom}
          showGrid={showGrid}
        />
      </div>
      <div className="flex justify-center mt-4">
        <Button onClick={handleCrop}>Crop</Button>
      </div>
    </div>
  );
};

export default ImageCrop;
