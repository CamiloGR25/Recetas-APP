import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const Start = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/45/45332.png" }}
                style={styles.image} />
            <Text style={styles.title}>Delicious recipes</Text>
            <Text style={styles.subtitle}>Explore and cook amazing dishes</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Menu")}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <Text style={styles.txtintegrantes}>Members:</Text>
            <Text style={styles.txtintegrantes}>Sergio Camilo Gomez Rincon</Text>
            <Text style={styles.txtintegrantes}>Michael Rodriguez Rios</Text>
            <Text style={styles.txtintegrantes}>Gabriel Felipe Beltran</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        padding: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
        resizeMode: "contain",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        color: "#555",
        marginBottom: 20,
        textAlign: "center",
    },
    txtintegrantes: {
        fontSize: 13,
        color: "#555",

        textAlign: "center",
    },
    button: {
        backgroundColor: "#FF5733",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default Start;
