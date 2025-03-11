import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground } from "react-native";
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
        <ImageBackground 
            source={{ uri: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" }} 
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>🍽️ MENÚ</Text>
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
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "rgba(255, 248, 225, 0.85)",
        padding: 20,
    },
    card: {
        flex: 1,
        margin: 10,
        alignItems: "center",
        backgroundColor: "#FFEBE5",
        padding: 15,
        borderRadius: 15,
        shadowColor: "#D84315",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 6,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 15,
    },
    text: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#D84315",
        fontFamily: "serif",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: "#BF360C",
        marginBottom: 20,
        fontFamily: "serif",
    },
});

export default Menu;