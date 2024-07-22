export interface MealCategory {
  strCategory: string;
}
export interface MealCategoryDish {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface CategoryListResponse {
  meals: MealCategory[];
}

export interface Dishes {
  meals: MealCategoryDish[];
}
