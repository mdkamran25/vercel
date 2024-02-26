"use client";
import Image from "next/image";
import React, { useState } from "react";
import sortArrow from "../../../assets/sortArrow.svg";
import Pagination from "../pagination/pagination";
import Link from "next/link";

const Table = ({ result }: { result: any }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({ key: "", direction: "" });

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = result?.matchData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const sortBy = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  let sortedData = [...currentItems];
  if (sortConfig.key) {
    sortedData = [...currentItems].sort((a, b) => {
      if (sortConfig.direction === "ascending") {
        return a[sortConfig.key].localeCompare(b[sortConfig.key]);
      } else {
        return b[sortConfig.key].localeCompare(a[sortConfig.key]);
      }
    });
  }

  return (
    <div className="sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full">
        <div className="flex justify-end my-3">
          <Link
            href="/"
            className="p-3 hover:cursor-pointer rounded-xl  bg-purple-700"
          >
            Dashboard
          </Link>
        </div>
        <div className="overflow-x-auto border border-gray-700 w-[90vw] lg:w-[50vw] h-[37rem] md:h-[36.5rem] rounded-xl">
          <table className="min-w-full text-left text-sm font-light text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
              <tr>
                <th scope="col" className="px-6 py-4">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  <div
                    className="flex gap-1 items-center hover:cursor-pointer"
                    onClick={() => sortBy("opponentName")}
                  >
                    Opponent Name
                    <Image
                      src={sortArrow}
                      width={14}
                      height={14}
                      alt="Sorting Arrow"
                      className={`transform ${
                        sortConfig.key === "opponentName"
                          ? sortConfig.direction === "ascending"
                            ? "rotate-180"
                            : ""
                          : ""
                      }`}
                    />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Result
                </th>
                <th scope="col" className="px-6 py-3">
                  <div
                    className="flex gap-1 items-center hover:cursor-pointer"
                    onClick={() => sortBy("time")}
                  >
                    Date
                    <Image
                      src={sortArrow}
                      width={14}
                      height={14}
                      alt="Sorting Arrow"
                      className={`transform ${
                        sortConfig.key === "time"
                          ? sortConfig.direction === "ascending"
                            ? "rotate-180"
                            : ""
                          : ""
                      }`}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map(
                (element: MatchDataWithOpponentName, index: number) => {
                  return (
                    <tr
                      key={index}
                      className="border-b text-white transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {(currentPage - 1) * 10 + index}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {element?.opponentName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {element?.winner}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {new Date(element.time).toLocaleDateString("en-GB")}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(result?.matchData.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Table;
