import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from "react-native";
import { registerUser } from "../services/ServiceAuth";

const Register = ({ navigation }) => {
    const [name, setName] = useState(""); // Nuevo: nombre
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        if (!email || !password || !name) {
            Alert.alert("Campos requeridos", "Por favor completa todos los campos");
            return;
        }

        const result = await registerUser({ name, email, password });

        if (result.success) {
            Alert.alert("Registro exitoso", "Tu cuenta ha sido creada", [
                { text: "OK", onPress: () => navigation.replace("Login") },
            ]);
        } else {
            Alert.alert("Error", result.error);
        }
    };

    return (
        <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" }}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#6D4C41"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#6D4C41"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#6D4C41"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.linkText}>Already have an account? Sign in</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        backgroundColor: "rgba(255, 248, 225, 0.95)",
        padding: 30,
        borderRadius: 20,
        borderWidth: 5,
        borderColor: "#D84315",
        width: "85%",
    },
    title: {
        fontSize: 30,
        color: "#D84315",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        fontFamily: "serif",
    },
    input: {
        backgroundColor: "#FFF3E0",
        borderWidth: 1,
        borderColor: "#FF7043",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 15,
        color: "#6D4C41",
    },
    button: {
        backgroundColor: "#FF7043",
        padding: 15,
        borderRadius: 25,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "serif",
    },
    linkText: {
        color: "#BF360C",
        fontSize: 14,
        textAlign: "center",
        marginTop: 10,
        fontStyle: "italic",
    },
});

export default Register;
