# Gestión del proyecto — NoteFlow

## Herramienta

El trabajo se gestiona en un tablero **Trello** con metodología Kanban.

🔗 **Tablero:** _pendiente de enlace_ — pega aquí la URL pública del tablero
cuando lo crees y reemplaza también el placeholder del `README.md`.

## Flujo de columnas

El tablero usa cinco columnas que representan el ciclo de vida de cada tarea:

| Columna         | Significado                                                        |
| --------------- | ------------------------------------------------------------------ |
| **Backlog**     | Ideas y funcionalidades sin priorizar todavía.                     |
| **Todo**        | Tareas priorizadas y listas para empezar en el sprint actual.      |
| **In Progress** | Tareas en las que se está trabajando ahora mismo (límite WIP: 1-2).|
| **Review**      | Trabajo terminado a la espera de revisión / pruebas.               |
| **Done**        | Tareas verificadas y mergeadas en `main`.                          |

Una tarjeta solo avanza hacia la derecha cuando cumple la *definición de
hecho* de su columna destino. Al finalizar, debe estar en **Done** con su
commit correspondiente en `main`.

## Tarjetas (una por funcionalidad principal)

Cada funcionalidad principal de [`idea.md`](idea.md) es una tarjeta. Cada
tarjeta se descompone en subtareas técnicas concretas (checklist de Trello).

### 1. Notas de texto

- [ ] Modelo de datos `Note` en `types/`
- [ ] Store de notas en Zustand
- [ ] Pantalla de listado `/notas` con FlashList
- [ ] Pantalla de detalle `/notas/[id]`
- [ ] Formulario de creación/edición (modal)
- [ ] Eliminar nota con confirmación
- [ ] Persistencia con AsyncStorage

### 2. Tareas (checklists)

- [ ] Modelo de datos `Checklist` e `ChecklistItem`
- [ ] Store de checklists en Zustand
- [ ] Pantalla de listado `/checklists`
- [ ] Marcar/desmarcar ítems y barra de progreso
- [ ] Añadir y borrar ítems
- [ ] Persistencia con AsyncStorage

### 3. Ideas rápidas con etiquetas

- [ ] Modelo de datos `Idea` con `tags: string[]`
- [ ] Store de ideas en Zustand
- [ ] Pantalla de listado `/ideas`
- [ ] Captura rápida desde modal
- [ ] Asignar etiquetas a una idea
- [ ] Persistencia con AsyncStorage

### 4. Navegación y estructura base

- [ ] Scaffolding Expo + Expo Router
- [ ] Layout de pestañas `(tabs)/_layout.tsx` con iconos
- [ ] Ruta modal `nueva-note.tsx`
- [ ] Rutas dinámicas de detalle

### 5. Sistema de diseño

- [ ] Integrar Gluestack UI + provider
- [ ] `constants/theme.ts` (colores, tipografía, espaciados)
- [ ] Modo claro/oscuro con `useColorScheme`

### 6. Persistencia local

- [ ] Middleware de persistencia de Zustand sobre AsyncStorage
- [ ] Hidratación al arrancar la app
- [ ] Manejo de estado de carga

## Rutina de trabajo

1. Se elige la siguiente tarjeta de **Todo** según prioridad.
2. Se mueve a **In Progress** y se trabaja en una rama o commit acotado.
3. Al terminar, se mueve a **Review** y se valida (pruebas manuales / lint).
4. Tras la revisión, se mueve a **Done** y se hace push a `main`.
5. Los hallazgos o nuevas ideas se registran como tarjetas en **Backlog**.

Cada commit referencia la fase/funcionalidad sobre la que se trabaja para
mantener trazabilidad entre el tablero y el historial de Git.
