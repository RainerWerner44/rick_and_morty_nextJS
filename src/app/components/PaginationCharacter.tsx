"use client";
import { Info } from "@/types/Info";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { generateHref } from "../utils/generateHref";
import { getPaginationNumbers } from "../utils/getPaginationNumbers";
import React from "react";

export default function PaginationCharacter({ info }: { info: Info }) {
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const species = searchParams.get("species") || "";
  const gender = searchParams.get("gender") || "";

  return (
    <div className="flex justify-center items-center mt-8 mb-10">
      {info.prev && (
        <Link
          href={generateHref(currentPage - 1, search, status, species, gender)}
          className="w-24 px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-600 transition duration-300 text-center"
        >
          Previous
        </Link>
      )}

      {getPaginationNumbers(currentPage, info.pages).map((num, index) => (
        <React.Fragment key={index}>
          {typeof num === "string" ? (
            <span className="px-2 py-2 text-gray-500">{num}</span>
          ) : (
            <Link
              href={`?page=${num}&search=${search}&status=${status}&species=${species}&gender=${gender}`}
              className={`px-4 py-2 border rounded hover:bg-gray-200 transition duration-300 ${
                num === currentPage ? "bg-blue-500 text-white" : "text-blue-500"
              }`}
            >
              {num}
            </Link>
          )}
        </React.Fragment>
      ))}

      {info.next && (
        <Link
          href={generateHref(currentPage + 1, search, status, species, gender)}
          className="w-24 px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-600 transition duration-300 text-center"
        >
          Next
        </Link>
      )}
    </div>
  );
}
