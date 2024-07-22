import RecipeCard from "./Cards/RecipeCard";
import { recipeList } from "@/config/recipeConfig";
const RecipeCardContainer = () => {
  return (
    <div className="flex flex-col gap-2 pl-7 mt-2">
      <div className="section-heading">New Recipes of your Area</div>
      <div className="flex gap-4 my-2 overflow-y-scroll">
        {recipeList.map((singleRecipe, index) => {
          return (
            <RecipeCard
              name={singleRecipe.name}
              image={singleRecipe.image}
              time={singleRecipe.time}
              rating={singleRecipe.rating}
              creator={singleRecipe.creator}
              key={index}
            />
          );
        })}

        <RecipeCard
          name={"Steak with Tomato"}
          image="https://www.themealdb.com/images/media/meals/1548772327.jpg"
          time={20}
          rating={5}
          creator={{
            name: "Kanishk Tiwari",
            image: "https://avatars.githubusercontent.com/u/72643990?v=4",
          }}
        />
      </div>
    </div>
  );
};

export default RecipeCardContainer;
