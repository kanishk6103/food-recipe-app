"use client";
import { useState, useEffect } from "react";
import FilterButtons from "../Buttons/FilterButtons";
import Image from "next/image";
import { Settings } from "../../../public/assets";
import { useRouter } from "next/navigation";
import { Meals } from "@/types/CategoryTypes";
import { AreaMeals } from "@/types/Area";

const FilterButton = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "All"
  );
  const [selectedArea, setSelectedArea] = useState<string | null>("All");
  const [categories, setCategories] = useState<Meals[]>([]);
  const [areas, setAreas] = useState<AreaMeals[]>([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      const data = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?c=list",
        {
          cache: "force-cache",
        }
      );
      if (!data.ok) {
        console.error("error occurred while fetching categories");
      }
      const json_cat = await data.json();
      setCategories(json_cat?.meals);
    };

    const fetchAllAreas = async () => {
      const data = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
        {
          cache: "force-cache",
        }
      );
      if (!data.ok) {
        console.error("error occurred while fetching areas");
      }
      const json_area = await data.json();
      setAreas(json_area?.meals);
    };

    fetchAllCategories();
    fetchAllAreas();
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleAreaClick = (area: string) => {
    setSelectedArea(selectedArea === area ? null : area);
  };

  const handleFilter = () => {
    setOpen(false);
    let query = "";
    // console.log(selectedCategory);
    if (selectedCategory) {
      query += `category=${selectedCategory}`;
    }
    // console.log(selectedArea);
    if (selectedArea) {
      query += `${query.length > 0 ? "&" : ""}area=${selectedArea}`;
    }
    // console.log(query);
    router.replace(`/search?${query}`);
  };

  return (
    <>
      <button
        className="bg-primary-green-500 text-white px-3 rounded-lg h-full"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Image src={Settings} height={20} width={20} alt="Settings" />
      </button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-20">
          <div className="bg-white rounded-tl-3xl rounded-tr-3xl p-6 w-full">
            <h2 className="text-center text-lg font-semibold mb-4">
              Filter Search
            </h2>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Category</h3>
              {categories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  <FilterButtons
                    key={"AllCategory"}
                    text={"All"}
                    filled={selectedCategory === "All"}
                    handler={() => setSelectedCategory("All")}
                  />
                  {categories.map((category) => (
                    <FilterButtons
                      key={category.strCategory}
                      text={category.strCategory}
                      filled={selectedCategory === category.strCategory}
                      handler={() => handleCategoryClick(category.strCategory)}
                    />
                  ))}
                </div>
              ) : (
                <h1 className="">Loading Categories</h1>
              )}
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Area</h3>
              {areas.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  <FilterButtons
                    key={"AllArea"}
                    text={"All"}
                    filled={selectedArea === "All"}
                    handler={() => setSelectedArea("All")}
                  />
                  {areas.map((area) => (
                    <FilterButtons
                      key={area.strArea}
                      text={area.strArea}
                      filled={selectedArea === area.strArea}
                      handler={() => handleAreaClick(area.strArea)}
                    />
                  ))}
                </div>
              ) : (
                <h1 className="">Loading Areas</h1>
              )}
            </div>
            <div className="w-full flex items-center justify-center">
              <button
                className="bg-primary-green-500 text-white py-2 px-4 rounded-lg w-1/2 text-xs"
                onClick={handleFilter}
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterButton;
