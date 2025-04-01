import { db, auth } from './firebaseConfig';
import { ref, set, remove, get } from "firebase/database";

// Agregar receta a favoritos
export const addToFavorites = async (meal) => {
  const user = auth.currentUser;
  if (!user) throw new Error("El usuario no está autenticado");
  const userId = user.uid;
  const mealRef = ref(db, `favorites/${userId}/${meal.idMeal}`);
  await set(mealRef, meal);
};

// Eliminar receta de favoritos
export const removeFromFavorites = async (mealId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("El usuario no está autenticado");
  const userId = user.uid;
  const mealRef = ref(db, `favorites/${userId}/${mealId}`);
  await remove(mealRef);
};

// Verificar si está en favoritos
export const isFavorite = async (mealId) => {
  const user = auth.currentUser;
  if (!user) return false;
  const userId = user.uid;
  const mealRef = ref(db, `favorites/${userId}/${mealId}`);
  const snapshot = await get(mealRef);
  return snapshot.exists();
};

//traer la lista de favoritos
export const getFavorites = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("El usuario no está autenticado");
  const userId = user.uid;
  const snapshot = await get(ref(db, `favorites/${userId}`));
  return snapshot.exists() ? Object.values(snapshot.val()) : [];
};