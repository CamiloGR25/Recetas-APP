import { db } from "./firebaseConfig";
import { ref, get } from "firebase/database";

//traer recetas nuevas por categoría
export const fetchNewRecipesByCategory = async (category) => {
    try {
        const snapshot = await get(ref(db, "newRecipes"));
        if (!snapshot.exists()) return [];

        const allRecipes = Object.values(snapshot.val());
        const filtered = allRecipes.filter((r) => r.strCategory === category);

        /*console.log("Firebase recipes:", allRecipes);
        console.log("Filtrando por categoría:", category);*/

        return filtered;
    } catch (error) {
        console.error("Error fetching new recipes:", error);
        return [];
    }
};
