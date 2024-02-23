"use client";
import { useState } from "react";
import Image from "next/image";
import profileImage from "../../assets/profileIcon.svg";
import whiteBgProfileIcon from "../../assets/whiteBgProfileIcon.svg";
import { signOut } from "next-auth/react";
import PortalProvider from "../components/portalProvider/portalProvider";
import { useRouter } from "next/navigation";

const ProfileModal = ({
  userName,
  userId,
}: {
  userName: string | null | undefined;
  userId: string;
}) => {
  const [openModal, setOpenModal] = useState(false);
  
  const router = useRouter();

  const handleProfile = (): void => {
    router.push(`/profile/${userId}`);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200"
        onMouseEnter={() => setOpenModal(true)}
      >
        <Image
          src={profileImage}
          width={40}
          height={40}
          className="rounded-full"
          alt="user profile image"
        />
      </button>

      <PortalProvider selector="profileModal" show={openModal}>
        {
          <div
            onMouseLeave={() => setOpenModal(false)}
            className="absolute top-[3.5rem] right-0 me-1 md:me-2 mt-2 w-48 bg-white rounded shadow-md z-10 flex flex-col items-center justify-center"
          >
            <div className="px-4 pt-4 text-center">
              <Image
                src={whiteBgProfileIcon}
                width={80}
                height={80}
                className="rounded-full mx-auto"
                alt="profile Image"
              />

              <p className="font-semibold text-black pt-1">{userName}</p>
            </div>

            <ul className="text-center">
              <li
                className="px-4 pt-2 cursor-pointer pb-2 text-black hover:bg-gray-100"
                onClick={handleProfile}
              >
                Profile
              </li>
            </ul>

            <div className="border-t border-gray-200 pt-2 pb-4">
              <button
                className="text-sm text-gray-700 hover:text-gray-900"
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        }
      </PortalProvider>
    </div>
  );
};

export default ProfileModal;
