const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${BASE_URL}/categories.php`);
        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const fetchRecipesByCategory = async (category) => {
    try {
        const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
        const data = await response.json();
        return data.meals;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
};

export const fetchRecipeDetails = async (mealId) => {
    try {
        const response = await fetch(`${BASE_URL}/lookup.php?i=${mealId}`);
        const data = await response.json();
        return data.meals[0];
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        return null;
    }
};
