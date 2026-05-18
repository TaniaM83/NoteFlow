# React Native — Teoría aplicada a NoteFlow

Documento técnico que acompaña al desarrollo de NoteFlow. Se irá ampliando
con cada fase del proyecto.

## 1. React Native vs. una app nativa

Cuando en React Native escribes `<View>` o `<Text>`, **no se renderiza HTML
en un WebView**. React Native traduce esos componentes a vistas nativas
reales del sistema operativo: un `<View>` se convierte en un `UIView` en iOS
y en un `android.view.View` en Android; un `<Text>` en `UILabel` /
`TextView`. El resultado tiene el aspecto, los gestos y el rendimiento de una
app nativa.

La diferencia con una **app puramente nativa** está en *quién escribe la
lógica y cómo se ejecuta*:

| Aspecto              | App nativa (Swift/Kotlin)        | React Native                                  |
| -------------------- | -------------------------------- | --------------------------------------------- |
| Lenguaje             | Swift/Obj-C, Kotlin/Java         | JavaScript/TypeScript + React                 |
| UI                   | Vistas nativas                   | Vistas nativas (puenteadas desde JS)          |
| Código compartido    | No (uno por plataforma)          | Sí (una base para iOS y Android)              |
| Ejecución de lógica  | Hilo nativo                      | Hilo de JavaScript separado del hilo de UI    |

### Los dos hilos

La arquitectura de React Native separa el trabajo en dos hilos que se
comunican entre sí:

- **Hilo de JavaScript**: ejecuta tu código React, el estado (Zustand en
  NoteFlow) y la lógica de negocio.
- **Hilo de UI nativo**: dibuja y anima los componentes del sistema
  operativo y procesa los gestos.

Si el hilo de JS se bloquea (por ejemplo, un cálculo pesado o un parseo
grande), la interfaz **se congela** aunque el hilo de UI siga vivo. Por eso
en NoteFlow:

- Las listas usan **FlashList** (virtualización) en lugar de renderizar todos
  los elementos de golpe.
- La persistencia con AsyncStorage es **asíncrona**, para no bloquear el hilo
  de JS mientras se lee o escribe.

> Nota: la *Nueva Arquitectura* (activada con `newArchEnabled: true` en
> `app.json`) sustituye el antiguo "bridge" asíncrono por JSI y permite
> comunicación síncrona JS↔nativo y renderizado más eficiente (Fabric),
> pero el modelo mental de "no bloquees el hilo de JS" sigue siendo válido.

## 2. El Metro bundler

**Metro** es el empaquetador (bundler) de React Native, equivalente
conceptual a Webpack/Vite en web. Su trabajo:

1. Parte de un archivo de entrada (en NoteFlow, `expo-router/entry`).
2. Recorre el grafo de `import`/`require` y junta todo el código
   JavaScript/TypeScript en un único *bundle*.
3. Transforma el código (TypeScript y JSX → JS que el motor entiende) y
   resuelve assets (imágenes, fuentes).
4. Lo sirve al dispositivo y, en desarrollo, habilita **Fast Refresh**:
   al guardar un archivo, recarga solo lo cambiado manteniendo el estado.

Metro **no compila código nativo**: solo se ocupa del lado JavaScript. El
código nativo (módulos de cámara, notificaciones, etc.) se compila aparte
al construir el binario de la app.

## 3. Expo Go vs. Development Build (por qué Expo Go no basta)

**Expo Go** es una app contenedora ya compilada que puedes instalar desde la
store: escaneas un QR y tu bundle JS corre dentro de ella sin compilar nada.
Es ideal para empezar y prototipar rápido.

Su limitación es estructural: Expo Go incluye **solo el conjunto fijo de
módulos nativos** que trae preinstalados. En cuanto un proyecto necesita un
módulo nativo personalizado o que no venga incluido —cámara avanzada,
notificaciones push, biometría, una librería con código nativo propio— Expo
Go **no puede cargarlo**, porque ese código nativo tendría que estar
compilado dentro del binario y Expo Go no se puede recompilar.

La solución es un **Development Build**: un binario propio de tu app,
generado con **EAS Build**, que incluye tus módulos nativos concretos pero
sigue cargando el bundle JS desde Metro con Fast Refresh. Es decir, mantienes
la velocidad de desarrollo de Expo Go pero con tus dependencias nativas
reales.

**Conclusión para proyectos reales (y para NoteFlow):** Expo Go sirve para
las primeras fases, pero en cuanto se incorporan capacidades nativas se pasa
a un Development Build. En este proyecto el desarrollo inicial (navegación,
estado, persistencia, UI) es compatible con Expo Go; el salto a Development
Build se haría al añadir, por ejemplo, notificaciones push para recordatorios
de tareas.

---

> Las secciones de **Sistemas de diseño** y **Navegación** se añaden en sus
> fases correspondientes.
