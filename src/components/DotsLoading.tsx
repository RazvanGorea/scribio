import React from "react";
import Lottie from "react-lottie";
import * as loadingAnim from "../assets/lottie/loadingDots.json";

interface DotsLoadingProps {
  style?: React.CSSProperties;
}

const DotsLoading: React.FC<DotsLoadingProps> = ({ style }) => {
  return (
    <div
      style={style}
      className="overflow-hidden max-h-[40px] max-w-[100px] flex justify-center items-center mx-auto"
    >
      <Lottie
        style={{ cursor: "default", minWidth: 150 }}
        options={{ animationData: loadingAnim, loop: true, autoplay: true }}
        isClickToPauseDisabled
      />
    </div>
  );
};

export default DotsLoading;
