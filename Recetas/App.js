// App.js
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Start from "./src/screens/Start";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import ForgotPassword from "./src/screens/ForgotPassword";

// Importa el Tab Navigator principal
import MainTabs from "./src/screens/MainTabs";

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Start">
        <RootStack.Screen name="Start" component={Start} options={{ headerShown: false }} />
        <RootStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <RootStack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <RootStack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        {/* Una vez autenticado, el usuario debe ser redirigido a "Main" */}
        <RootStack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
