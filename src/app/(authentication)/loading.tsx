import Image from "next/image";
import loaderIcon from '../../../assets/loaderIcon.svg'
export default function Loading() {
  return (
    <div className="flex justify-center items-center">
      <Image
        className="inline mt-[2px] w-4 h-4 me-3 text-white animate-spin"
        src={loaderIcon}
        aria-hidden="true"
        alt="Loader Icon"
        width={10}
        height={10}
      />
      <p className="text-xl font-mono font-bold text-black">Loading...</p>
    </div>
  );
}
