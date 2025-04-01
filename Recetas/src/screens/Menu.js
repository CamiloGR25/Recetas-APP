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
                {/*<View style={styles.headerRow}>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.navigate("FavoriteRecipes")}
                    >
                        <Text style={styles.menuButtonText}>❤️ Favoritos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.navigate("CreateRecipe")}
                    >
                        <Text style={styles.menuButtonText}>➕ Crear receta</Text>
                    </TouchableOpacity>
                </View>*/}

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
        borderWidth: 5,
        borderColor: "#D84315",
        borderRadius: 20,
        margin: 10,
    },
    card: {
        flex: 1,
        margin: 10,
        alignItems: "center",
        backgroundColor: "#FFEBE5",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#D84315",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 6,
        borderWidth: 2,
        borderColor: "#FF7043",
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#BF360C",
    },
    text: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#D84315",
        fontFamily: "serif",
        textShadowColor: "rgba(0, 0, 0, 0.2)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: "#BF360C",
        marginBottom: 20,
        fontFamily: "serif",
        textShadowColor: "rgba(0, 0, 0, 0.3)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
        borderBottomWidth: 3,
        borderBottomColor: "#FF7043",
        paddingBottom: 5,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    menuButton: {
        backgroundColor: "#FFE0B2",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#FF7043",
        marginLeft: 10,
    },

    menuButtonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#D84315",
        fontFamily: "serif",
    },

});

export default Menu;