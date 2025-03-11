import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const Start = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/45/45332.png" }}
                style={styles.image} />
            <Text style={styles.title}>Delicious Recipes</Text>
            <Text style={styles.subtitle}>Explore and cook amazing dishes</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Menu") }>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <Text style={styles.txtIntegrantes}>Members:</Text>
            <Text style={styles.txtIntegrantes}>Sergio Camilo Gomez Rincon</Text>
            <Text style={styles.txtIntegrantes}>Michael Rodriguez Rios</Text>
            <Text style={styles.txtIntegrantes}>Gabriel Felipe Beltran</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF8E1", // Fondo en tono crema
        padding: 20,
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 20,
        resizeMode: "contain",
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#D84315", // Marrón anaranjado
        marginBottom: 10,
        textAlign: "center",
        fontFamily: "serif",
    },
    subtitle: {
        fontSize: 18,
        color: "#6D4C41", // Marrón oscuro
        marginBottom: 20,
        textAlign: "center",
        fontStyle: "italic",
    },
    txtIntegrantes: {
        fontSize: 14,
        color: "#795548", // Marrón medio
        textAlign: "center",
    },
    button: {
        backgroundColor: "#FF7043", // Naranja brillante
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        fontFamily: "serif",
    },
});

export default Start;
