# Configuración de herramientas de IA — NoteFlow

Este documento recoge cómo se han configurado las herramientas de IA usadas
en el desarrollo de NoteFlow y **por qué**. El objetivo es que la IA conozca
el proyecto desde el principio y no genere código que contradiga las
decisiones de diseño y arquitectura.

## Por qué configurar la IA antes de empezar

Las herramientas de IA generan resultados muy distintos según el contexto
que tengan. Sin instrucciones persistentes, un asistente tiende a:

- Elegir librerías al azar (p. ej. `FlatList` en vez de FlashList, Redux
  en vez de Zustand).
- Hardcodear colores en lugar de usar tokens de diseño.
- Ignorar la naturaleza offline-first y añadir llamadas de red.
- Mezclar convenciones de nombres y estructura.

Definir el contexto una sola vez, de forma persistente, evita repetir las
mismas correcciones en cada interacción y mantiene el código coherente.

## Cursor — `.cursorrules`

Se ha creado el archivo [`.cursorrules`](../.cursorrules) en la raíz del
proyecto. Cursor lo lee automáticamente y lo inyecta como contexto del
sistema en cada petición al modelo.

Contenido y motivo de cada bloque:

| Bloque                       | Por qué se incluye                                                                                  |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| **Contexto del proyecto**    | Para que la IA entienda el dominio (3 tipos de contenido, offline-first) y no proponga features fuera de alcance. |
| **Stack cerrado**            | Fija React Native/Expo, TS, Expo Router, Gluestack, FlashList, Zustand, AsyncStorage. Evita que sugiera alternativas equivalentes que romperían la coherencia. |
| **Estructura de carpetas**   | Garantiza que el código nuevo se ubique donde corresponde (`store/` para lógica, `app/` para rutas). |
| **Estilo de código**         | Reglas de naming, componentes funcionales, props tipadas, sin `any`. Reduce ruido en revisión.       |
| **Restricciones de arquitectura** | Refuerza lo crítico: nada de red/auth, persistencia solo vía store, soporte de tema claro/oscuro, TypeScript estricto. |

Se eligieron reglas **específicas y accionables** (no genéricas tipo "escribe
buen código") porque para proyectos React Native + TypeScript las reglas
más efectivas son las que cierran decisiones concretas: qué librería de
listas usar, dónde vive el estado, cómo se tematiza la UI. Las reglas vagas
no cambian el comportamiento del modelo.

## Claude / Claude Code — `CLAUDE.md`

El mecanismo de instrucciones persistentes de Claude Code es el archivo
[`CLAUDE.md`](../CLAUDE.md) en la raíz, que se carga automáticamente como
contexto en cada sesión.

Es una versión condensada de las mismas reglas que `.cursorrules`: stack,
estructura, convenciones y flujo de trabajo. Se mantiene más breve a
propósito porque Claude Code también lee el resto del repositorio
(`docs/`, código) bajo demanda; el `CLAUDE.md` solo necesita fijar las
decisiones que no son evidentes leyendo el código.

Ambos archivos se mantienen sincronizados: si cambia una decisión de
arquitectura, debe actualizarse en `.cursorrules` **y** en `CLAUDE.md`.

## Gemini u otras herramientas

Si se incorpora otra herramienta con contexto de proyecto persistente
(p. ej. un archivo de reglas de Gemini Code Assist o un *system prompt*
guardado), debe configurarse con el **mismo contenido base**: stack
cerrado, estructura de carpetas, convenciones de nombres y restricción
offline-first. La fuente de verdad es este documento más `.cursorrules` /
`CLAUDE.md`.

## Mantenimiento

- Cualquier decisión de arquitectura nueva se documenta primero y luego se
  refleja en los archivos de reglas.
- Si la IA genera código que contradice estas reglas de forma recurrente,
  se revisa y se hace más explícita la regla correspondiente.
