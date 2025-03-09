import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const Detalles = ({ route, navigation }) => {
    const { receta } = route.params;
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>← Volver</Text>
            </TouchableOpacity>

            <Image source={{ uri: receta.imagen }} style={styles.imageLarge} />
            <Text style={styles.title}>{receta.titulo}</Text>
            <Text style={styles.description}>{receta.descripcion}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f5f5f5",
    },
    backButton: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#333",
        borderRadius: 5,
        alignSelf: "flex-start",
    },
    backButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    imageLarge: {
        width: "100%",
        height: 250,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        padding: 10,
    },
    description: {
        fontSize: 16,
        padding: 10,
    },
});

export default Detalles;
