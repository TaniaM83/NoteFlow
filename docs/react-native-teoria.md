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

## 4. Sistemas de diseño

Un **sistema de diseño** es el conjunto de decisiones visuales reutilizables
(color, tipografía, espaciado, radios, componentes) expresadas como *tokens*
y componentes, en lugar de valores sueltos repartidos por el código. Sus
ventajas: coherencia visual, cambios globales en un único sitio y soporte
sistemático de variantes como el modo claro/oscuro.

### Comparativa: Gluestack UI vs. React Native Paper

| Criterio              | Gluestack UI                                  | React Native Paper                              |
| --------------------- | --------------------------------------------- | ----------------------------------------------- |
| Filosofía             | Utilidades/tokens (estilo Tailwind), headless | Material Design de Google, opinado               |
| Personalización       | Alta: identidad visual propia                 | Media: se sale del look Material con esfuerzo    |
| Aspecto por defecto   | Neutro, se adapta a la marca                  | Material (muy reconocible como "Android")        |
| Modo claro/oscuro     | `colorMode` en el provider + tokens propios   | Temas `MD3LightTheme` / `MD3DarkTheme`           |
| Ideal para            | Productos con identidad visual única          | Apps que quieren Material listo para usar        |

### Elección para NoteFlow: **Gluestack UI**

Se elige **Gluestack UI** por estas razones:

1. **Identidad propia, no Material.** NoteFlow tiene tres tipos de contenido
   (notas, tareas, ideas) con acentos de color diferenciados. Un sistema de
   tokens flexible expresa esa identidad mejor que imponer Material Design.
2. **Tokens como fuente de verdad.** Encaja con la decisión de arquitectura
   de centralizar el diseño en `constants/theme.ts` y prohibir colores
   hardcodeados (ver `.cursorrules`).
3. **Modo claro/oscuro de primera clase.** El `colorMode` del
   `GluestackUIProvider` se sincroniza con `useColorScheme`, y nuestras
   paletas `light`/`dark` comparten las mismas claves, por lo que cambiar de
   modo no requiere lógica adicional en los componentes.
4. **Personalización sin pelear contra el framework.** Al ser headless/
   utilitario, ampliar o ajustar componentes no implica sobrescribir un tema
   Material rígido.

React Native Paper sería preferible si el objetivo fuera entregar rápido una
app con aspecto Android estándar; no es el caso de NoteFlow.

### Implementación en el proyecto

- `constants/theme.ts`: tokens de NoteFlow — paletas `light`/`dark` (con
  acentos por tipo de contenido), escala tipográfica, espaciado (rejilla de
  4 px) y radios. Expone el hook `useTheme()`, que devuelve el tema activo
  según `useColorScheme`.
- `app/_layout.tsx`: envuelve la app en `GluestackUIProvider` y enlaza su
  `colorMode` con la preferencia del sistema.
- Los componentes consumen siempre los tokens (vía `useTheme` o los
  componentes de Gluestack), nunca valores literales.

## 5. Navegación: Tabs, Stack y modales

Expo Router define las rutas a partir del **sistema de archivos**: cada
archivo dentro de `app/` es una ruta. Carpetas entre paréntesis como
`(tabs)` son *grupos*: organizan archivos sin añadir segmento a la URL.

### Los tres patrones

| Patrón     | Qué resuelve                                                   | En NoteFlow                                              |
| ---------- | -------------------------------------------------------------- | -------------------------------------------------------- |
| **Tabs**   | Secciones de **igual jerarquía** entre las que se salta libremente, manteniendo el estado de cada una. | Notas / Tareas / Ideas: tres áreas paralelas del producto. |
| **Stack**  | Navegación **jerárquica**: avanzar a un detalle y volver atrás, apilando pantallas. | Dentro de cada pestaña: listado → detalle `[id]`.        |
| **Modal**  | Tarea **puntual y autocontenida** superpuesta al flujo actual; se completa o se cancela y se vuelve donde se estaba. | Creación de contenido (`nueva-note`).                     |

### Por qué cada uno en este proyecto

- **Tabs para las tres secciones:** notas, tareas e ideas son funciones
  independientes y de igual importancia; el usuario alterna entre ellas con
  frecuencia. Las pestañas dan acceso constante de un toque y conservan el
  estado de cada sección. Implementado en `app/(tabs)/_layout.tsx` con
  iconos de `@expo/vector-icons`.

- **Stack dentro de cada pestaña:** ver el detalle de un elemento es una
  relación padre→hijo (lista → elemento). Cada pestaña tiene su propia pila
  (`app/(tabs)/notas/_layout.tsx`, etc.) para que entrar al detalle en una
  pestaña no afecte al estado de las otras, y el gesto/botón "atrás"
  funcione de forma natural. Las rutas dinámicas `[id].tsx` reciben el
  identificador con `useLocalSearchParams`.

- **Modal para crear:** crear contenido no es un destino dentro de la
  jerarquía, sino una acción transversal que puede lanzarse desde cualquier
  pestaña. Un modal comunica visualmente "esto es temporal: termínalo o
  ciérralo". Se declara en el Stack raíz (`app/_layout.tsx`) con
  `presentation: 'modal'` y vive en `app/nueva-note.tsx`.

### Estructura de rutas resultante

```
app/
  _layout.tsx            Stack raíz: (tabs) + modal nueva-note
  index.tsx              Redirige a /notas
  nueva-note.tsx         Modal de creación
  (tabs)/
    _layout.tsx          Tabs (Notas / Tareas / Ideas)
    notas/
      _layout.tsx        Stack de la pestaña
      index.tsx          Listado            -> /notas
      [id].tsx           Detalle dinámico   -> /notas/123
    checklists/          (misma estructura) -> /checklists
    ideas/               (misma estructura) -> /ideas
```

## 6. Modelado de datos y type guards

Los tres tipos de contenido comparten unos campos comunes, así que el
modelo (en `types/index.ts`) parte de una interfaz base y la extiende:

- `BaseNote`: `id`, `title`, `createdAt`, `updatedAt`.
- `Note extends BaseNote`: añade `content` (texto libre).
- `ChecklistNote extends BaseNote`: añade `items: ChecklistItem[]`.
- `IdeaNote extends BaseNote`: añade `tags: string[]` y `color`.

### El tipo unión `AnyNote`

```ts
type AnyNote = Note | ChecklistNote | IdeaNote;
```

`AnyNote` permite escribir una sola vez funciones que valgan para
cualquier nota (stores de Zustand, listas con FlashList, utilidades de
ordenación/búsqueda) sin duplicar lógica por tipo.

### Por qué hacen falta type guards

TypeScript solo existe en tiempo de **compilación**: los tipos se borran
al transpilar, así que en **ejecución** una variable `AnyNote` no "sabe"
cuál de los tres tipos es. Si intentamos acceder a `note.items`,
TypeScript lo impide porque no todas las variantes lo tienen.

La solución es un **type guard**: una función cuyo tipo de retorno es un
*predicado de tipo* (`note is ChecklistNote`). Internamente comprueba la
propiedad distintiva con el operador `in`:

```ts
function isChecklistNote(note: AnyNote): note is ChecklistNote {
  return 'items' in note;
}
```

`'items' in note` devuelve `true` solo si esa propiedad existe en el
objeto, es decir, solo para `ChecklistNote`. Cuando el predicado se
cumple, TypeScript **estrecha** (`narrowing`) el tipo dentro del bloque:

```ts
if (isChecklistNote(note)) {
  // Aquí `note` es ChecklistNote: `note.items` está disponible y tipado.
  const total = note.items.length;
}
```

En `types/index.ts` hay un guard por tipo: `isNote` (`'content' in note`),
`isChecklistNote` (`'items' in note`) e `isIdeaNote` (`'tags' in note`).
Así el código que recorre listas mixtas puede decidir, de forma segura y
con autocompletado, cómo renderizar o procesar cada nota.
