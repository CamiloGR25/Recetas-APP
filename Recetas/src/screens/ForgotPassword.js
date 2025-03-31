import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from "react-native";
import { resetPassword } from "../services/ServiceAuth";

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");

    const handleReset = async () => {
        if (!email) {
            Alert.alert("Campo requerido", "Por favor, ingresa tu correo electrónico.");
            return;
        }

        const result = await resetPassword(email);

        if (result.success) {
            Alert.alert(
                "Correo enviado",
                "Hemos enviado un enlace para restablecer tu contraseña.",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );
        } else {
            Alert.alert("Error", result.error);
        }
    };

    return (
        <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" }}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Reset Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#6D4C41"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={handleReset}>
                    <Text style={styles.buttonText}>Send Reset Link</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.linkText}>Back to login</Text>
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
        fontSize: 26,
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

export default ForgotPassword;
