# NoteFlow — Contexto para Claude

App móvil de productividad (React Native + Expo) que unifica **notas de
texto**, **tareas (checklists)** e **ideas rápidas con etiquetas**.
Offline-first, sin backend ni cuentas: todo se persiste en el dispositivo.
Definición funcional completa en `docs/idea.md`.

## Stack

React Native · Expo SDK (managed) · TypeScript estricto · Expo Router
(file-based) · Gluestack UI · Shopify FlashList · Zustand · AsyncStorage
(vía middleware `persist` de Zustand).

No introducir red, autenticación ni backend: el producto es offline-first.

## Estructura

```
app/         Rutas Expo Router ((tabs)/, rutas modales, [id].tsx)
components/   Componentes reutilizables
store/        Stores Zustand (notes, checklists, ideas)
types/        Tipos compartidos
constants/    theme.ts (tokens de diseño)
docs/         Documentación
```

La lógica de negocio vive en `store/`. Las pantallas usan `export default`
(requisito de Expo Router); el resto, exports nombrados.

## Convenciones

- Componentes funcionales + hooks. Props con `interface`, sin `React.FC`.
- `PascalCase` componentes/tipos, `useCamelCase` hooks, `camelCase`
  variables, `UPPER_SNAKE_CASE` constantes globales.
- Estilos con Gluestack UI y tokens de `constants/theme.ts`; nunca colores
  hardcodeados. Soportar modo claro/oscuro con `useColorScheme`.
- Listas con FlashList, nunca FlatList ni `.map()` para listas largas.
- Strings de UI en español.
- El código debe compilar con TypeScript estricto.

## Flujo de trabajo

Gestión Kanban en Trello (ver `docs/project-management.md`). Commits
acotados por fase/funcionalidad. Confirmar antes de push salvo indicación
expresa.
