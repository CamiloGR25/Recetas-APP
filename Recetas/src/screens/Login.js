import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from "react-native";
import { loginUser } from "../services/ServiceAuth";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Campos requeridos", "Ingresa correo y contraseña");
            return;
        }

        const result = await loginUser({ email, password });

        if (result.success) {
            // Navegamos al Tab Navigator principal, que se llama "Main"
            navigation.replace("Main");
        } else {
            Alert.alert("Error al iniciar sesión", result.error);
        }
    };

    return (
        <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" }}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
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
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.linkText}>Don't have an account? Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                    <Text style={styles.linkText}>Forgot your password? Reset it</Text>
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

export default Login;