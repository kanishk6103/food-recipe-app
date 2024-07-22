"use client";
import { MealCategoryDish } from "@/types/CategoryTypes";
import HomeCard from "./Cards/HomeCard";
import { Dishes } from "@/types/CategoryTypes";
import { useState, useEffect } from "react";

const HomeCardContainer = ({ activeCategory }: { activeCategory: string }) => {
  const [data, setData] = useState<MealCategoryDish[]>();

  useEffect(() => {
    const getDishes = async (name: string): Promise<Dishes | undefined> => {
      if (name === "All") {
        setData([]);
        return;
      }
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`,
        { cache: "force-cache" }
      );
      if (!response.ok) {
        console.error("Failed to fetch data!");
        return;
      }
      const json_data = await response.json();
      setData(json_data.meals);
    };
    getDishes(activeCategory);
  }, [activeCategory]);

  return data ? (
    <div className="flex gap-5 w-full overflow-x-auto pt-16 pb-5 pl-7">
      {data.map((singleDish, index) => (
        <HomeCard
          image={singleDish.strMealThumb}
          name={singleDish.strMeal}
          key={singleDish.idMeal}
        />
      ))}
    </div>
  ) : (
    <h1 className="w-full h-full px-7">Loading...</h1>
  );
};

export default HomeCardContainer;
