import Image from "next/image";
import Link from "next/link";
import React from "react";
import sortArrow from "../../../assets/sortArrow.svg";
import { getProfileResult } from "@/constants/apiUrl";
const Table = async ({ userId }: { userId: string }) => {
  const res = await fetch(`${getProfileResult}/${userId}`);
  const resData = await res.json();
  return (
    <div className="sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2">
        <div className="overflow-x-auto border border-gray-700 w-[90vw] lg:w-[50vw]  h-[32rem] rounded-xl">
          <table className="min-w-full text-left text-sm font-light  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
              <tr>
                <th scope="col" className="px-6 py-4">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex gap-1 items-center">
                    Player Name
                    <Link href="#">
                      <Image
                        src={sortArrow}
                        width={14}
                        height={14}
                        alt="Sorting Arrow"
                      />
                    </Link>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Result
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex gap-1 items-center">
                    Date
                    <Link href="#">
                      <Image
                        src={sortArrow}
                        width={14}
                        height={14}
                        alt="Sorting Arrow"
                      />
                    </Link>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
            
              {resData?.matchData?.map(
                (element: MatchDataWithOpponentName, index: string) => {
                  return (
                    <tr
                      key={index}
                      className="border-b text-white transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {element?.opponentName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {element?.winner}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {new Date(element.time).toLocaleDateString('en-GB')}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
