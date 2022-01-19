import React from "react";
import { TiInfo } from "react-icons/ti";

interface WarningProps {
  title: string;
  message: string;
}

const Warning: React.FC<WarningProps> = ({ title, message }) => {
  return (
    <div className="flex items-center py-1 pr-3 text-white bg-orange-500 rounded-lg not-prose">
      <TiInfo size={25} className="mx-3 text-white" />
      <div>
        <strong>{title}</strong>
        <p className="m-0 ">{message}</p>
      </div>
    </div>
  );
};

export default Warning;
