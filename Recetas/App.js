import 'react-native-gesture-handler'; // Importación obligatoria, pero sin GestureHandlerRootView
import React from "react";
import { NavigationContainer } from '@react-navigation/native'; // Container de navegación
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Stack Navigator

import Start from './src/screens/Start';
import Menu from "./src/screens/Menu";
import RecipesList from "./src/screens/RecipesList";
import RecipeDetail from "./src/screens/RecipeDetail";

// Creación del Stack Navigator
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} options={{ title: "Start" }} />
        <Stack.Screen name="Menu" component={Menu} options={{ title: "Recipe Categories" }} />
        <Stack.Screen name="RecipesList" component={RecipesList} options={({ route }) => ({ title: route.params.category })} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetail} options={{ title: "Recipe Details" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
