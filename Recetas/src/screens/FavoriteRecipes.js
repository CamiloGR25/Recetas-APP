import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import { ref, onValue } from "firebase/database";
import { db, auth } from "../services/firebaseConfig";

const FavoriteRecipes = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return; // Si el usuario no está autenticado, no hacemos nada
        const userId = user.uid;
        const favoritesRef = ref(db, `favorites/${userId}`);

        // Escuchamos cambios en tiempo real en la ruta de favoritos de este usuario
        const unsubscribe = onValue(favoritesRef, (snapshot) => {
            const data = snapshot.val() || {};
            setFavorites(Object.values(data));
        });

        // Limpiar el listener cuando el componente se desmonte
        return () => unsubscribe();
    }, []);

    return (
        <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2" }}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>❤️ Recetas Favoritas</Text>
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate("Inicio", {
                                screen: "RecipeDetail",
                                params: { mealId: item.idMeal }
                            })}
                        >
                            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
                            <Text style={styles.text}>{item.strMeal}</Text>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Aún no has agregado recetas a favoritos.</Text>
                    }
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
        backgroundColor: "rgba(255, 245, 230, 0.85)",
        padding: 20,
        borderWidth: 5,
        borderColor: "#8B4513",
        borderRadius: 20,
        margin: 10,
    },
    card: {
        flex: 1,
        margin: 10,
        alignItems: "center",
        backgroundColor: "#FAE5D3",
        padding: 15,
        borderRadius: 15,
        shadowColor: "#8B4513",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 6,
        borderWidth: 2,
        borderColor: "#D2691E",
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#8B4513",
    },
    text: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#8B4513",
        fontFamily: "serif",
        textShadowColor: "rgba(0, 0, 0, 0.2)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: "#8B4513",
        marginBottom: 20,
        fontFamily: "serif",
        textShadowColor: "rgba(0, 0, 0, 0.3)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
        borderBottomWidth: 3,
        borderBottomColor: "#D2691E",
        paddingBottom: 5,
    },
    emptyText: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 30,
        color: "#8B4513",
        fontStyle: "italic",
    },
});

export default FavoriteRecipes;