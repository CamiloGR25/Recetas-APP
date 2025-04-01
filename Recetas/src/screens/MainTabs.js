import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoriteRecipes from "./FavoriteRecipes";
import MenuStackScreen from "./MenuStackScreen";
import CreateRecipe from "./CreateRecipe";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Inicio"  // Aquí se define la pestaña por defecto
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "#FF7043",
                tabBarInactiveTintColor: "gray",
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === "Favoritos") {
                        iconName = "heart";
                    } else if (route.name === "Inicio") {
                        iconName = "home";
                    } else if (route.name === "CrearReceta") {
                        iconName = "create";
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Favoritos" component={FavoriteRecipes} options={{ title: "Favoritos" }} />
            <Tab.Screen name="Inicio" component={MenuStackScreen} options={{ title: "Inicio" }} />
            <Tab.Screen name="CrearReceta" component={CreateRecipe} options={{ title: "Crear Receta" }} />
        </Tab.Navigator>
    );
}