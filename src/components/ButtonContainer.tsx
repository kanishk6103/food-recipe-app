"use client";
import PrimaryButton from "./Buttons/PrimaryButton";
import { CategoryListResponse } from "@/types/CategoryTypes";
import { MealCategory } from "@/types/CategoryTypes";
import { useEffect, useState } from "react";

const ButtonContainer = ({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}) => {
  const [data, setData] = useState<CategoryListResponse>();

  useEffect(() => {
    const getCategoryList = async (): Promise<
      CategoryListResponse | undefined
    > => {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?c=list",
        { cache: "force-cache" }
      );
      if (!response.ok) {
        console.error("Failed to fetch data!");
        return;
      }
      const json_data = await response.json();
      setData(json_data);
    };
    getCategoryList();
  }, []);

  const items: MealCategory[] = data
    ? [{ strCategory: "All" }, ...data.meals]
    : [];

  return data ? (
    <div className="w-full h-9 flex gap-4 px-7 overflow-y-auto">
      {items.map((singleCategory, index) => (
        <PrimaryButton
          text={singleCategory?.strCategory}
          handler={() => setActiveCategory(singleCategory?.strCategory)}
          key={index}
          filled={singleCategory?.strCategory === activeCategory}
        />
      ))}
    </div>
  ) : (
    <h1 className="w-full h-full px-7">Loading...</h1>
  );
};

export default ButtonContainer;
