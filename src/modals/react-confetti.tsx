import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@/hooks/useWindowSize";
import ResultModal from "./resultModal";

interface ReactConfettiProps {
  status:string;
}

const ReactConfetti: React.FC<ReactConfettiProps> = ({ status }) => {
  const { width, height } = useWindowSize();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
      }}
    >
      {status==="You Won" && <Confetti width={width} height={height} />}
      <ResultModal status={status} />
    </div>
  );
};

export default ReactConfetti;
