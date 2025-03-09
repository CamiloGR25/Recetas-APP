import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { WebView } from "react-native-webview"; // Importar WebView
import { fetchRecipeDetails } from "../services/api";

const RecipeDetail = ({ route }) => {
    const { mealId } = route.params;
    const [meal, setMeal] = useState(null);

    useEffect(() => {
        const loadMeal = async () => {
            const data = await fetchRecipeDetails(mealId);
            setMeal(data);
        };
        loadMeal();
    }, [mealId]);

    if (!meal) return <Text style={styles.loadingText}>Cargando...</Text>;

    // Convertir la URL de YouTube en formato de embed
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;
        const videoId = url.split("v=")[1]; // Extrae el ID del video
        return `https://www.youtube.com/embed/${videoId}`;
    };

    const youtubeEmbedUrl = getYouTubeEmbedUrl(meal.strYoutube);

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: meal.strMealThumb }} style={styles.detailImage} />
            <Text style={styles.title}>{meal.strMeal}</Text>
            <Text style={styles.subtitle}>Instrucciones:</Text>
            <Text style={styles.text}>{meal.strInstructions}</Text>

            {/* Mostrar el video solo si hay una URL de YouTube */}
            {youtubeEmbedUrl && (
                <View style={styles.videoContainer}>
                    <WebView 
                        source={{ uri: youtubeEmbedUrl }}
                        style={styles.video}
                        allowsFullscreenVideo={true} // Habilitar pantalla completa
                    />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#f9f9f9",
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
        borderRadius: 10,
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "left",
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
        textAlign: "left",
    },
    text: {
        fontSize: 16,
        textAlign: "left",
        marginBottom: 20,
    },
    videoContainer: {
        marginTop: 20,
        height: 200,
        borderRadius: 10,
        overflow: "hidden",
    },
    video: {
        height: "100%",
        width: "100%",
    },
});

export default RecipeDetail;