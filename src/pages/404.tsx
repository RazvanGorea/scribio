import React from "react";
import Lottie from "react-lottie";
import * as notFoundAnim from "../assets/lottie/404.json";

interface Custom404Props {}

const Custom404: React.FC<Custom404Props> = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1>Not Found</h1>
      <div className="w-full max-w-3xl md:w-2/3 lg:w-1/2">
        <Lottie
          style={{ cursor: "default" }}
          options={{ animationData: notFoundAnim, loop: true, autoplay: true }}
          isClickToPauseDisabled
        />
      </div>
    </div>
  );
};

export default Custom404;
