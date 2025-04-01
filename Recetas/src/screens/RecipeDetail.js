import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { fetchRecipeDetails } from "../services/api";
import Icon from "react-native-vector-icons/Ionicons";
import { addToFavorites, removeFromFavorites, isFavorite } from "../services/ServiceFavoriteRecipe";
import { fetchNewRecipeDetails } from "../services/ServiceNewRecipes";


const RecipeDetail = ({ route }) => {
    const { mealId } = route.params;
    const [meal, setMeal] = useState(null);
    const [translatedText, setTranslatedText] = useState("");
    const [translatedIngredients, setTranslatedIngredients] = useState([]);
    const [isTranslated, setIsTranslated] = useState(false);
    const [currentLang, setCurrentLang] = useState("en");
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        const loadMeal = async () => {
            const dataAPI = await fetchRecipeDetails(mealId);
            //console.log(Object.keys(dataAPI).length)
            // Si no encuentra la receta en la API, buscar en Firebase
            if (!dataAPI || Object.keys(dataAPI).length === 1) {
                const newRecipe = await fetchNewRecipeDetails(mealId);
                //console.log("------ receta nueva:" + newRecipe)
                if (newRecipe) {
                    setMeal(newRecipe);
                } else {
                    console.log("No se encontraron datos para esta receta.");
                    setMeal(null);
                }
            } else {
                setMeal(dataAPI);
            }
        };
        loadMeal();
    }, [mealId]);

    useEffect(() => {
        const checkFavorite = async () => {
            const fav = await isFavorite(mealId);
            setFavorite(fav);
        };
        checkFavorite();
    }, [mealId]);

    if (!meal) return <Text style={styles.loadingText}>Cargando...</Text>;

    const toggleFavorite = async () => {
        if (!meal) return;
        if (favorite) {
            await removeFromFavorites(meal.idMeal);
        } else {
            await addToFavorites(meal);
        }
        setFavorite(!favorite);
    };

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;
        const videoId = url.split("v=")[1];
        return `https://www.youtube.com/embed/${videoId}`;
    };

    const youtubeEmbedUrl = getYouTubeEmbedUrl(meal.strYoutube);

    const getIngredients = () => {
        let ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient) {
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        return ingredients;
    };

    const ingredients = getIngredients();

    const translateText = async (text, targetLang) => {
        const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
        );
        const data = await response.json();
        return data[0] ? data[0].map(item => item[0]).join(" ") : text;
    };

    const translateInstructionsAndIngredients = async () => {
        if (!meal) return;
        const newLang = currentLang === "es" ? "en" : "es";
        try {
            const translatedInstructions = await translateText(meal.strInstructions, newLang);
            setTranslatedText(translatedInstructions);

            const translatedIngredientsArray = await Promise.all(
                ingredients.map(async (ingredient) => await translateText(ingredient, newLang))
            );
            setTranslatedIngredients(translatedIngredientsArray);
            setIsTranslated(true);
            setCurrentLang(newLang);
        } catch (error) {
            console.error("Error translating text:", error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: meal.strMealThumb }} style={styles.detailImage} />
                <TouchableOpacity style={styles.heartIcon} onPress={toggleFavorite}>
                    <Icon name={favorite ? "heart" : "heart-outline"} size={30} color="#E74C3C" />
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>{meal.strMeal}</Text>
                <Text style={styles.category}>Categoría: {meal.strCategory}</Text>
                <Text style={styles.area}>Región: {meal.strArea}</Text>
            </View>
            <View style={styles.sectionIngredients}>
                <Text style={styles.subtitle}>{currentLang === "en" ? "Ingredients:" : "Ingredientes:"}</Text>
                {(isTranslated ? translatedIngredients : ingredients).map((item, index) => (
                    <Text key={index} style={styles.ingredient}>{item}</Text>
                ))}
            </View>
            <View style={styles.sectionInstructions}>
                <Text style={styles.subtitle}>{currentLang === "en" ? "Instructions:" : "Instrucciones:"}</Text>
                <Text style={styles.text}>{isTranslated ? translatedText : meal.strInstructions}</Text>
                <TouchableOpacity style={styles.button} onPress={translateInstructionsAndIngredients}>
                    <Text style={styles.buttonText}>{currentLang === "en" ? "Traducir a Español" : "Translate into English"}</Text>
                </TouchableOpacity>
            </View>
            {youtubeEmbedUrl && (
                <View style={styles.videoContainer}>
                    <Text style={styles.subtitle}>Video Tutorial:</Text>
                    <WebView source={{ uri: youtubeEmbedUrl }} style={styles.video} allowsFullscreenVideo={true} />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAF3DD", // Beige claro
        paddingBottom: 20,
    },
    loadingText: {
        flex: 1,
        textAlign: "center",
        fontSize: 18,
        marginTop: 20,
    },
    detailImage: {
        width: "100%",
        height: 300,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    section: {
        backgroundColor: "#F5CBA7", // Naranja claro
        padding: 15,
        marginHorizontal: 15,
        marginTop: 15,
        borderRadius: 20,
    },
    sectionIngredients: {
        backgroundColor: "#A8D5BA", // Verde suave
        padding: 15,
        marginHorizontal: 15,
        marginTop: 15,
        borderRadius: 20,
    },
    sectionInstructions: {
        backgroundColor: "#F7DC6F", // Amarillo pastel
        padding: 15,
        marginHorizontal: 15,
        marginTop: 15,
        borderRadius: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        color: "#5C3D2E", // Marrón
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#5C3D2E",
    },
    ingredient: {
        fontSize: 16,
        color: "#4A4A4A",
        paddingVertical: 2,
    },
    text: {
        fontSize: 16,
        color: "#4A4A4A",
        textAlign: "justify",
    },
    button: {
        marginTop: 10,
        backgroundColor: "#E59866",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    videoContainer: {
        marginTop: 20,
        backgroundColor: "#F5B7B1", // Rosa pastel
        padding: 15,
        borderRadius: 20,
        marginHorizontal: 15,
    },
    video: {
        height: 200,
        borderRadius: 10,
    },
    imageContainer: {
        position: "relative",
    },
    heartIcon: {
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 5,
        elevation: 5,
    }
});

export default RecipeDetail;