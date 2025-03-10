import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { fetchCategories } from "../services/api";

const Menu = ({ navigation }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };
        loadCategories();
    }, []);

    return (
        <SafeAreaView>
            <Text style={styles.title}>MENÚ</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.idCategory}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate("RecipesList", { category: item.strCategory })}
                    >
                        <Image source={{ uri: item.strCategoryThumb }} style={styles.image} />
                        <Text style={styles.text}>{item.strCategory}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>

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
    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
    },
});

export default Menu;
