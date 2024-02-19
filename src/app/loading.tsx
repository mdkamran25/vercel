import React from "react";
import gameLoader from "../../assets/gameLoader.gif";
import Image from "next/image";
const LoaderDashboardPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Image src={gameLoader} width={150} height={150} alt="Game Loader" />
    </div>
  );
};

export default LoaderDashboardPage;
