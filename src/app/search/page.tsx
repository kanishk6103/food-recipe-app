"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Left_Arrow } from "../../../public/assets";
import SearchBar from "@/components/SearchBar";
import { SearchMeal } from "@/types/SearchTypes";
import ResultCard from "@/components/Cards/ResultCard";
const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [searchTerm, setSearchTerm] = useState<string | null>(query);
  const [results, setResults] = useState<SearchMeal[]>([]);
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchTerm) {
        fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`,
          {
            cache: "force-cache",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.meals) {
              setResults(data.meals);
            } else {
              setResults([]);
            }
          });
      }
      router.replace(`/search?query=${searchTerm}`);
    }, 300);
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex px-7 items-center relative">
        <Image
          src={Left_Arrow}
          height={20}
          width={20}
          alt="left-arrow"
          className="absolte left-0"
          onClick={() => {
            router.back();
          }}
        />
        <div className="flex items-center justify-center w-full text-lg font-semibold">
          Search Recipes
        </div>
      </div>
      <div className="my-2">
        <SearchBar
          placeholder="Search recipes"
          searchTerm={searchTerm as string}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
      </div>
      <div className="flex items-center justify-between px-7">
        <div className="font-semibold text-base">Search Result</div>
        <div className="text-xs text-sub-heading">
          {results?.length ?? 0} Results
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 px-7">
        {searchTerm?.length! > 0 ? (
          results.length > 0 ? (
            results.map((singleSearch) => {
              return (
                <ResultCard
                  name={singleSearch.strMeal}
                  image={singleSearch.strMealThumb}
                  key={singleSearch.idMeal}
                />
              );
            })
          ) : (
            <div className="flex w-max items-center text-sm">
              No results found
            </div>
          )
        ) : (
          <div className="flex w-max items-center text-sm">
            Your search results will appear here
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
