"use client";
import Header from "@/components/Home/Header";
import SearchBar from "@/components/SearchBar";
import ButtonContainer from "@/components/ButtonContainer";
import HomeCardContainer from "@/components/HomeCardContainer";
import RecipeCardContainer from "@/components/RecipeCardContainer";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  const handleSearch = (term: string) => {
    router.replace(`/search?query=${term}`);
  };
  return (
    <main className="flex min-h-screen flex-col gap-5">
      <Header />
      <SearchBar
        placeholder="Search recipe"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <ButtonContainer
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <HomeCardContainer activeCategory={activeCategory} />
      <RecipeCardContainer />
    </main>
  );
}
