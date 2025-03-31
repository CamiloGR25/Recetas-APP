import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { db, ref, push } from "../services/firebaseConfig";
import { Picker } from "@react-native-picker/picker";
import { fetchCategories } from "../services/api";

const CreateRecipe = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [area, setArea] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [instructions, setInstructions] = useState("");
    const [ingredients, setIngredients] = useState([""]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchCategories();
            const categoryNames = data.map((item) => item.strCategory);
            setCategories(categoryNames);
        };
        loadCategories();
    }, []);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, ""]);
    };

    const handleChangeIngredient = (text, index) => {
        const updated = [...ingredients];
        updated[index] = text;
        setIngredients(updated);
    };

    const handleSubmit = async () => {
        if (!title || !instructions || !category || ingredients.length === 0) {
            Alert.alert("Faltan campos", "Por favor completa todos los campos obligatorios.");
            return;
        }

        const newRecipe = {
            strMeal: title,
            strCategory: category,
            strArea: area,
            strInstructions: instructions,
            strMealThumb: imageUrl || "https://via.placeholder.com/150",
        };

        ingredients.forEach((ing, index) => {
            newRecipe[`strIngredient${index + 1}`] = ing;
            newRecipe[`strMeasure${index + 1}`] = "";
        });

        try {
            await push(ref(db, "newRecipes"), newRecipe);
            Alert.alert("Receta guardada", "Tu receta ha sido creada con éxito.");
            navigation.goBack();
        } catch (error) {
            console.error("Error guardando receta:", error);
            Alert.alert("Error", "No se pudo guardar la receta.");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>➕ Nueva Receta</Text>

            <TextInput
                placeholder="Nombre de la receta"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />

            <Text style={styles.subtitle}>Categoría:</Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecciona una categoría" value="" />
                    {categories.map((cat) => (
                        <Picker.Item key={cat} label={cat} value={cat} />
                    ))}
                </Picker>
            </View>

            <TextInput
                placeholder="Región (ej. Mexican, Italian)"
                value={area}
                onChangeText={setArea}
                style={styles.input}
            />

            <TextInput
                placeholder="URL de imagen"
                value={imageUrl}
                onChangeText={setImageUrl}
                style={styles.input}
            />

            <TextInput
                placeholder="Instrucciones"
                value={instructions}
                onChangeText={setInstructions}
                style={[styles.input, { height: 100 }]}
                multiline
            />

            <Text style={styles.subtitle}>Ingredientes:</Text>
            {ingredients.map((ing, index) => (
                <TextInput
                    key={index}
                    placeholder={`Ingrediente ${index + 1}`}
                    value={ing}
                    onChangeText={(text) => handleChangeIngredient(text, index)}
                    style={styles.input}
                />
            ))}

            <TouchableOpacity onPress={handleAddIngredient} style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Añadir otro ingrediente</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Guardar Receta</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#FFF8E1",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#BF360C",
        textAlign: "center",
        borderBottomWidth: 2,
        borderBottomColor: "#FF7043",
        paddingBottom: 5,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#BF360C",
        marginTop: 20,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#FFAB91",
        borderRadius: 10,
        padding: 10,
        marginVertical: 8,
        backgroundColor: "#FFFFFF",
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: "#FFAB91",
        borderRadius: 10,
        marginVertical: 8,
        backgroundColor: "#FFFFFF",
    },
    picker: {
        height: 50,
        width: "100%",
        color: "#333",
    },
    addButton: {
        backgroundColor: "#FFE0B2",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 10,
    },
    addButtonText: {
        color: "#D84315",
        fontWeight: "bold",
    },
    submitButton: {
        backgroundColor: "#FF7043",
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    submitButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
});

export default CreateRecipe;
