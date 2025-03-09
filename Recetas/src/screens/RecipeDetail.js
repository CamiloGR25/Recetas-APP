import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
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

    if (!meal) return <Text style={styles.loadingText}>Loading...</Text>;

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: meal.strMealThumb }} style={styles.detailImage} />
            <Text style={styles.title}>{meal.strMeal}</Text>
            <Text style={styles.subtitle}>Instructions:</Text>
            <Text style={styles.text}>{meal.strInstructions}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20, // Espaciado en los lados para mejor legibilidad
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
        textAlign: "left", // Alineado a la izquierda
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
        textAlign: "left", // Alineado a la izquierda
        marginBottom: 20,
    },
});

export default RecipeDetail;