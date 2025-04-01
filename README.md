# Recetas-App

RecetasApp es una aplicación móvil desarrollada con **React Native** y **Expo** que permite explorar recetas de cocina. La aplicación utiliza la API de [TheMealDB](https://www.themealdb.com/api.php) para mostrar información actualizada de recetas, e integra **Firebase** para la autenticación de usuarios mediante correo electrónico y la gestión en tiempo real de datos.

## 📱 Funcionalidades

- **Explorar categorías**: Visualiza distintas categorías de recetas, cada una representada por una imagen.
- **Listar recetas por categoría**: Al seleccionar una categoría, se muestra una lista de recetas con nombre e imagen.
- **Ver detalles de recetas**: Accede a información completa de cada receta, incluyendo ingredientes, preparación e instrucciones.
- **Autenticación con correo electrónico**: Permite a los usuarios registrarse e iniciar sesión utilizando su correo, gestionado a través de Firebase Authentication.
- **Gestión de datos en tiempo real**: Utiliza Firebase para almacenar y sincronizar datos, mejorando la experiencia del usuario.

## 🛠️ Tecnologías utilizadas

- **React Native / Expo**: Desarrollo multiplataforma para dispositivos móviles.
- **React Navigation**: Manejo de la navegación entre pantallas.
- **Fetch API**: Consumo de endpoints de [TheMealDB](https://www.themealdb.com/api.php).
- **Firebase**: 
  - **Firebase Authentication**: Autenticación de usuarios mediante correo electrónico.
  - **Realtime Database / Firestore** (según se requiera): Gestión y sincronización de datos.

## 📂 Estructura del proyecto

```
Recetas/
├── assets/                          # Recursos estáticos (imágenes, fuentes, etc.)
├── src/                             # Código fuente principal
│   ├── screens/                     # Pantallas de la aplicación
│   │   ├── CreateRecipe.js          # Pantalla para crear recetas
│   │   ├── FavoriteRecipes.js       # Pantalla de recetas favoritas
│   │   ├── ForgotPassword.js        # Pantalla de recuperación de contraseña
│   │   ├── Login.js                 # Pantalla de inicio de sesión
│   │   ├── Menu.js                  # Pantalla principal/menú
│   │   ├── RecipeDetail.js          # Pantalla de detalle de receta
│   │   ├── RecipesList.js           # Pantalla de lista de recetas
│   │   ├── Register.js              # Pantalla de registro de usuario
│   │   └── Start.js                 # Pantalla de inicio
│   └── services/                    # Servicios y lógica de negocio
│       ├── api.js                   # Cliente API (por ejemplo, TheMealDB u otras)
│       ├── firebaseConfig.js        # Configuración de Firebase
│       ├── metro.config.js          # Configuración adicional de Metro (si aplica)
│       ├── ServiceAuth.js           # Servicio para autenticación
│       ├── ServiceFavoriteRecipe.js # Servicio para manejar recetas favoritas
│       └── ServiceNewRecipes.js     # Servicio para manejar nuevas recetas
├── App.js                           # Componente principal de la aplicación (punto de entrada en Expo)
└── index.js                         # Punto de entrada de la aplicación (usado en algunas configuraciones)
```

## 🚀 Instalación y ejecución

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/CamiloGR25/Recetas-APP
   cd Recetas
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Inicia la aplicación:**

   ```bash
   npx expo start
   ```

4. **Ejecuta la aplicación en:**
   - Dispositivo físico mediante [Expo Go](https://expo.dev/go)
   - [Emulador de Android](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [Simulador de iOS](https://docs.expo.dev/workflow/ios-simulator/)
   - [Development build](https://docs.expo.dev/develop/development-builds/introduction/)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para sugerir cambios o mejoras.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
