import React from "react";
import Lottie from "react-lottie";

interface EmptyComponentProps {
  animationData: any;
  text?: string;
  containerStyle?: React.CSSProperties;
  lottieStyle?: React.CSSProperties;
}

const EmptyComponent: React.FC<EmptyComponentProps> = ({
  animationData,
  text,
  containerStyle,
  lottieStyle,
}) => {
  return (
    <div style={containerStyle}>
      <Lottie
        style={{ cursor: "default", maxWidth: 270, ...lottieStyle }}
        options={{ animationData, loop: true, autoplay: true }}
        isClickToPauseDisabled
      />
      <h5 className="text-center">{text}</h5>
    </div>
  );
};

export default EmptyComponent;
