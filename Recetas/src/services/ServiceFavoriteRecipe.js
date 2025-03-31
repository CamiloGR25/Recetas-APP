import { db } from './firebaseConfig';
import { ref, set, remove, get } from "firebase/database";

// Agregar receta a favoritos
export const addToFavorites = async (meal) => {
  const mealRef = ref(db, `favorites/${meal.idMeal}`);
  await set(mealRef, meal);
};

// Eliminar receta de favoritos
export const removeFromFavorites = async (mealId) => {
  const mealRef = ref(db, `favorites/${mealId}`);
  await remove(mealRef);
};

// Verificar si está en favoritos
export const isFavorite = async (mealId) => {
  const mealRef = ref(db, `favorites/${mealId}`);
  const snapshot = await get(mealRef);
  return snapshot.exists();
};

export const getFavorites = async () => {
  const snapshot = await get(ref(db, "favorites"));
  return snapshot.exists() ? Object.values(snapshot.val()) : [];
};