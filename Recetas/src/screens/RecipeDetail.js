import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { fetchRecipeDetails } from "../services/api";

const RecipeDetail = ({ route }) => {
    const { mealId } = route.params;
    const [meal, setMeal] = useState(null);
    const [translatedText, setTranslatedText] = useState("");
    const [translatedIngredients, setTranslatedIngredients] = useState([]);
    const [isTranslated, setIsTranslated] = useState(false);
    const [currentLang, setCurrentLang] = useState("en");

    useEffect(() => {
        const loadMeal = async () => {
            const data = await fetchRecipeDetails(mealId);
            setMeal(data);
        };
        loadMeal();
    }, [mealId]);

    if (!meal) return <Text style={styles.loadingText}>Cargando...</Text>;

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
            <Image source={{ uri: meal.strMealThumb }} style={styles.detailImage} />
            <View style={styles.section}>
                <Text style={styles.title}>{meal.strMeal}</Text>
                <Text style={styles.category}>Categoría: {meal.strCategory}</Text>
                <Text style={styles.area}>Región: {meal.strArea}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.subtitle}>Ingredientes:</Text>
                {(isTranslated ? translatedIngredients : ingredients).map((item, index) => (
                    <Text key={index} style={styles.ingredient}>{item}</Text>
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.subtitle}>Instrucciones:</Text>
                <Text style={styles.text}>{isTranslated ? translatedText : meal.strInstructions}</Text>
                <TouchableOpacity style={styles.button} onPress={translateInstructionsAndIngredients}>
                    <Text style={styles.buttonText}>
                        {currentLang === "en" ? "Traducir a Español" : "Traducir a Inglés"}
                    </Text>
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
        backgroundColor: "#f8f9fa",
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
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    section: {
        backgroundColor: "#fff",
        padding: 15,
        marginHorizontal: 15,
        marginTop: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
    },
    category: {
        fontSize: 16,
        textAlign: "center",
        color: "#666",
        marginTop: 5,
    },
    area: {
        fontSize: 16,
        textAlign: "center",
        color: "#666",
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#444",
    },
    ingredient: {
        fontSize: 16,
        color: "#555",
        paddingVertical: 2,
    },
    text: {
        fontSize: 16,
        color: "#333",
        lineHeight: 24,
        textAlign: "justify",
    },
    button: {
        marginTop: 10,
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    videoContainer: {
        marginTop: 20,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    video: {
        height: 200,
        borderRadius: 10,
    },
});

export default RecipeDetail;