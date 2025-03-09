import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { fetchRecipesByCategory } from "../services/api";

const RecipesList = ({ route, navigation }) => {
    const { category } = route.params;
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const loadRecipes = async () => {
            const data = await fetchRecipesByCategory(category);
            setRecipes(data);
        };
        loadRecipes();
    }, [category]);

    return (
        <FlatList
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("RecipeDetail", { mealId: item.idMeal })}
                >
                    <Image source={{ uri: item.strMealThumb }} style={styles.image} />
                    <Text style={styles.text}>{item.strMeal}</Text>
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 10,
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default RecipesList;
