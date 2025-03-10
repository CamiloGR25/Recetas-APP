# Recetas-App

RecetasApp es una aplicación móvil desarrollada con **React Native** y **Expo** que permite explorar recetas de cocina. La aplicación utiliza la API de [TheMealDB](https://www.themealdb.com/api.php) para mostrar información actualizada de recetas.

## 📱 Funcionalidades

- **Explorar categorías**: Visualiza distintas categorías de recetas, cada una representada por una imagen.
- **Listar recetas por categoría**: Al seleccionar una categoría, se muestra una lista de recetas con nombre e imagen.
- **Ver detalles de recetas**: Accede a información completa de cada receta, incluyendo ingredientes, preparación e instrucciones.

## 🛠️ Tecnologías utilizadas

- **React Native / Expo** para el desarrollo multiplataforma.
- **React Navigation** para gestionar la navegación entre pantallas.
- **Fetch API** para consumir los endpoints de [TheMealDB](https://www.themealdb.com/api.php).

## 📂 Estructura del proyecto

```
Recetas-App/ 
├── src/                    # Código fuente principal
│   ├── data/               # Datos y modelos
│   │   └── Recetas.js      # Datos de recetas
│   ├── screens/            # Pantallas de la aplicación 
│   │   ├── Menu.js         # Pantalla principal/menú
│   │   ├── RecipeDetail.js # Pantalla de detalle de receta
│   │   ├── RecipesList.js  # Pantalla de lista de recetas
│   │   └── Start.js        # Pantalla de inicio
│   ├── services/           # Servicios y APIs
│   │   └── api.js          # Cliente API para TheMealDB
├── App.js                  # Componente principal de la aplicación
└── index.js                # Punto de entrada de la aplicación
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
