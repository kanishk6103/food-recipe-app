"use client";
import Header from "@/components/Home/Header";
import SearchBar from "@/components/SearchBar";
import ButtonContainer from "@/components/ButtonContainer";
import HomeCardContainer from "@/components/HomeCardContainer";
import { useState } from "react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  return (
    <main className="flex min-h-screen flex-col gap-7 items-center">
      <Header />
      <SearchBar placeholder="Search recipe" />
      <ButtonContainer
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <HomeCardContainer activeCategory={activeCategory} />
    </main>
  );
}
