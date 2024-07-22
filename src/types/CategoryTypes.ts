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

export interface Meals {
  strCategory: string;
}

export interface CategoryList {
  meals: Meals[];
}
