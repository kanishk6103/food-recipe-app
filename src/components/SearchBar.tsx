"use client";
import Image from "next/image";
import { Search, Settings } from "../../public/assets";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
const SearchBar = ({
  placeholder,
  searchTerm,
  setSearchTerm,
  handleSearch,
}: {
  placeholder: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (term: string) => void;
}) => {
  const router = useRouter();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };
  return (
    <div className="w-full px-7 flex justify-between items-center h-10">
      <div className="flex w-3/4 p-1 h-full border border-gray-300 rounded-xl flex-1 mr-4">
        <Image
          src={Search}
          height={18}
          width={18}
          alt="Search"
          className="mx-1"
        />
        <form className="h-full w-full" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            className="h-full w-full py-2 px-1 placeholder:text-placeholder-colour text-xs focus:outline-none focus:border-gray-500"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </form>
      </div>
      <button className="bg-primary-green-500 text-white px-3 rounded-lg h-full">
        <Image src={Settings} height={20} width={20} alt="Settings" />
      </button>
    </div>
  );
};

export default SearchBar;
