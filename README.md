# NoteFlow

App de productividad en **React Native + Expo** que unifica tres tipos de
contenido en una sola herramienta: **notas de texto**, **tareas (checklists)**
e **ideas rápidas con etiquetas**. Funciona offline y guarda todo en el
dispositivo.

> 🚧 Proyecto en construcción. La definición completa está en
> [`docs/idea.md`](docs/idea.md).

## Stack

| Capa            | Tecnología                |
| --------------- | ------------------------- |
| Framework       | React Native + Expo SDK   |
| Lenguaje        | TypeScript                |
| Navegación      | Expo Router               |
| UI              | Gluestack UI              |
| Listas          | Shopify FlashList         |
| Estado global   | Zustand                   |
| Persistencia    | AsyncStorage              |

## Gestión del proyecto

El trabajo se organiza en un tablero Trello con metodología Kanban
(Backlog → Todo → In Progress → Review → Done).

🔗 **Tablero de Trello:** _<!-- TODO: pega aquí la URL pública de tu tablero de Trello -->_

Detalle del flujo y de las tarjetas en
[`docs/project-management.md`](docs/project-management.md).

## Documentación

- [Definición de la idea](docs/idea.md)
- [Gestión del proyecto](docs/project-management.md)
- [Configuración de herramientas de IA](docs/ai-setup.md)

## Estructura prevista

```
app/         Rutas (Expo Router)
components/   Componentes reutilizables
store/        Estado global (Zustand)
types/        Tipos TypeScript
constants/    Tokens de diseño (theme)
docs/         Documentación del proyecto
```
