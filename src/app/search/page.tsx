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
  const category = searchParams.get("category");
  const area = searchParams.get("area");
  const [searchTerm, setSearchTerm] = useState<string | null>(query);
  const [results, setResults] = useState<SearchMeal[]>([]);
  const [filteredCategories, setFilteredCategory] = useState([]);
  const [filteredArea, setFilteredArea] = useState([]);

  const fetchSpecificCategory = async (term: string) => {
    if (term === "All") {
      setFilteredCategory([]);
      return;
    }
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`,
      {
        cache: "force-cache",
      }
    );
    if (!data.ok) {
      console.error("Error fetching categories");
      return;
    }
    const json_data = await data.json();
    setFilteredCategory(json_data.meals);
  };

  const fetchSpecificArea = async (term: string) => {
    if (term === "All") {
      setFilteredArea([]);
      return;
    }
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`,
      {
        cache: "force-cache",
      }
    );
    if (!data.ok) {
      console.error("Error fetching area");
      return;
    }
    const json_data = await data.json();
    setFilteredArea(json_data.meals);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      let apiUrl = "";
      if (searchTerm) {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
      } else if (category || area) {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?`;
        if (category) {
          fetchSpecificCategory(category);
        }
        if (area) {
          fetchSpecificArea(area);
        }
      }
      if (apiUrl) {
        fetch(apiUrl, {
          cache: "force-cache",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.meals) {
              console.log(data.meals);
              setResults(data.meals);
            } else {
              setResults([]);
            }
          });
        router.replace(
          `/search?${
            searchTerm
              ? `query=${searchTerm}`
              : category && !area
              ? `category=${category}`
              : !category && area
              ? `area=${area}`
              : `category=${category}&area=${area}`
          }`
        );
      }
    }, 300);
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchTerm, category, area, query]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const getCommonRecipes = (categoryRecipes: any[], areaRecipes: any[]) => {
      const categoryIds = new Set(
        categoryRecipes.map((recipe) => recipe.idMeal)
      );
      return areaRecipes.filter((recipe) => categoryIds.has(recipe.idMeal));
    };
    if (filteredArea.length > 0 && filteredCategories.length > 0) {
      const final = getCommonRecipes(filteredCategories, filteredArea);
      setResults(final);
      return;
    }
    if (filteredArea.length > 0) {
      setResults(filteredArea);
      return;
    }
    if (filteredCategories.length > 0) {
      setResults(filteredCategories);
      return;
    }
    setResults([]);
  }, [filteredArea, filteredCategories]);

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-7">
        {searchTerm?.length! > 0 ||
        filteredArea.length > 0 ||
        filteredCategories.length > 0 ? (
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
