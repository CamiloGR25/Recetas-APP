// MenuStackScreen.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "./Menu";
import RecipesList from "./RecipesList";
import RecipeDetail from "./RecipeDetail";

const MenuStack = createNativeStackNavigator();

export default function MenuStackScreen() {
    return (
        <MenuStack.Navigator initialRouteName="Menu">
            <MenuStack.Screen
                name="Menu"
                component={Menu}
                options={{ headerShown: false }} // Ocultamos el header si lo prefieres
            />
            <MenuStack.Screen
                name="RecipesList"
                component={RecipesList}
                options={({ route }) => ({ title: route.params.category })}
            />
            <MenuStack.Screen
                name="RecipeDetail"
                component={RecipeDetail}
                options={{ title: "Recipe Details" }}
            />
        </MenuStack.Navigator>
    );
}