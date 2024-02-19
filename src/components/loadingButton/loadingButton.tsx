import React from "react";
import loaderIcon from "../../../assets/loaderIcon.svg";
import Image from "next/image";
const LoadingButton = () => {
  return (
    <>
      <Image
        className="inline mt-[2px] w-4 h-4 me-3 text-white animate-spin"
        src={loaderIcon}
        aria-hidden="true"
        alt="Loader Icon"
        width={10}
        height={10}
      />
      Processing...
    </>
  );
};

export default LoadingButton;
