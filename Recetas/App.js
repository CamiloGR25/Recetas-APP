import 'react-native-gesture-handler'; // Importación obligatoria, pero sin GestureHandlerRootView
import React from "react";
import { NavigationContainer } from '@react-navigation/native'; // Container de navegación
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Stack Navigator

// Importa pantallas (ajusta la ruta si es necesario)
import Inicio from './src/models/Inicio';
import ListaRecetas from './src/models/ListaRecetas';
import Detalles from './src/models/Detalles';

// Creación del Stack Navigator
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="ListaRecetas" component={ListaRecetas} />
        <Stack.Screen name="Detalles" component={Detalles} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
