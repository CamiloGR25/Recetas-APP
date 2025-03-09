import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import recetas from "../data/Recetas";

const PantallaListaRecetas = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>← Volver</Text>
            </TouchableOpacity>

            <FlatList
                data={recetas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Detalles",
                        { receta: item })}>
                        <Image source={{ uri: item.imagen }} style={styles.image} />
                        <Text style={styles.title}>{item.titulo}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingBottom: 50 }}
                showsVerticalScrollIndicator={true}
            />
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
    card: {
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 8,
        overflow: "hidden",
        elevation: 3,
        paddingBottom: 10,
    },
    image: {
        width: "100%",
        height: 150,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        padding: 10,
    },
});

export default PantallaListaRecetas;