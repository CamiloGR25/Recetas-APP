import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
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

    if (!meal) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            <Image source={{ uri: meal.strMealThumb }} style={styles.detailImage} />
            <Text style={styles.title}>{meal.strMeal}</Text>
            <Text style={styles.subtitle}>Instructions:</Text>
            <Text style={styles.text}>{meal.strInstructions}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center",
    },
    detailImage: {
        width: 300,
        height: 300,
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        textAlign: "center",
    },
});

export default RecipeDetail;
