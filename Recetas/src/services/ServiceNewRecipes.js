import { db } from "./firebaseConfig";
import { ref, get } from "firebase/database";

/* Utilidad para normalizar una receta y asegurar consistencia en la estructura.
 recipe - La receta a normalizar
 id - El ID generado por Firebase */
const normalizeRecipe = (recipe, id) => {
    const normalizedId = `new-${recipe.strMeal?.replace(/\s+/g, "-").toLowerCase()}`;
    const normalizedRecipe = {
        idMeal: recipe.idMeal || normalizedId,
        firebaseId: id,
        strMeal: recipe.strMeal || "Unknown Recipe",
        strCategory: recipe.strCategory || "Unknown",
        strArea: recipe.strArea || "Unknown",
        strInstructions: recipe.strInstructions || "No instructions available.",
        strMealThumb: recipe.strMealThumb || "https://via.placeholder.com/150",
        strYoutube: recipe.strYoutube || "",
    };

    // Agregar ingredientes y medidas si existen, si no asignar valores vacíos
    for (let i = 1; i <= 20; i++) {
        normalizedRecipe[`strIngredient${i}`] = recipe[`strIngredient${i}`] || "";
        normalizedRecipe[`strMeasure${i}`] = recipe[`strMeasure${i}`] || "";
    }

    return normalizedRecipe;
};


// Obtiene todas las recetas desde Firebase y las normaliza 
const fetchAllRecipesFromFirebase = async () => {
    try {
        const snapshot = await get(ref(db, "newRecipes"));
        if (!snapshot.exists()) {
            console.log("No se encontraron recetas en la base de datos.");
            return [];
        }

        // Normalizar todas las recetas y devolver un array
        return Object.entries(snapshot.val()).map(([id, recipe]) =>
            normalizeRecipe(recipe, id)
        );
    } catch (error) {
        console.error("Error al obtener recetas desde Firebase:", error);
        return [];
    }
};

//Filtra recetas por categoría desde Firebase
export const fetchNewRecipesByCategory = async (category) => {
    const allRecipes = await fetchAllRecipesFromFirebase();

    // Filtrar recetas por categoría (case insensitive)
    const filteredRecipes = allRecipes.filter(
        (r) => r.strCategory?.toLowerCase() === category.toLowerCase()
    );

    //console.log("Recetas filtradas para "+category+":", filteredRecipes);
    return filteredRecipes;
};

// Obtiene los detalles de una receta específica desde Firebase.

export const fetchNewRecipeDetails = async (mealId) => {
    const allRecipes = await fetchAllRecipesFromFirebase();

    // Buscar la receta por idMeal, normalizedId o firebaseId
    const recipe = allRecipes.find((r) => r.idMeal === mealId || r.firebaseId === mealId);

    if (!recipe) {
        console.log("No se encontró una receta con el ID:" + mealId);
        return null;
    }
    //console.log("Receta encontrada:", recipe);
    return recipe;
};
