# NoteFlow — Definición de la idea

## El problema que resuelve

Las personas que toman notas a lo largo del día acaban dispersando la
información en varias apps: una para apuntes de texto, otra para listas de
tareas y notas sueltas en el bloc del teléfono. Esa fragmentación provoca
tres problemas concretos:

1. **Pérdida de contexto**: una idea anotada deprisa pierde sentido si no se
   guarda junto al material relacionado.
2. **Fricción al capturar**: cambiar de app para apuntar algo rápido hace que
   muchas ideas no lleguen a registrarse.
3. **Falta de estructura**: las notas, las tareas y las ideas rápidas tienen
   naturalezas distintas y mezclarlas en un único formato las vuelve difíciles
   de revisar.

**NoteFlow** unifica los tres tipos de contenido en una sola app, cada uno con
la interfaz adecuada a su propósito, manteniendo la captura rápida y la
información organizada y siempre disponible en el dispositivo.

## Usuario objetivo

**Perfil principal:** estudiantes y profesionales que gestionan su trabajo
desde el móvil y necesitan capturar información sin fricción.

**Cómo usaría la app en su día a día:**

- Por la mañana, revisa su lista de **Tareas** y marca lo que va completando.
- Durante una reunión o una clase, escribe una **Nota** de texto estructurada.
- Cuando se le ocurre algo de camino a casa, abre la app y guarda una **Idea**
  rápida con una etiqueta para recuperarla luego.
- Todo se guarda localmente: funciona sin conexión y sin necesidad de cuenta.

## Funcionalidades principales (v1)

- **Notas de texto**: crear, ver, editar y eliminar notas con título y cuerpo.
- **Tareas (checklists)**: listas de ítems marcables como completados, con
  progreso visible.
- **Ideas rápidas**: notas cortas con una o varias **etiquetas** para
  clasificarlas y filtrarlas.
- **Navegación por pestañas** entre los tres tipos de contenido.
- **Pantalla de detalle** para cada elemento (ruta dinámica por `id`).
- **Creación mediante modal** accesible desde cualquier pestaña.
- **Persistencia local** con AsyncStorage: los datos sobreviven al cierre de
  la app.
- **Modo claro y oscuro** según la preferencia del sistema.
- **Listas de alto rendimiento** con FlashList para grandes volúmenes de datos.

## Funcionalidades opcionales (futuro)

- Búsqueda global por texto en notas, tareas e ideas.
- Filtrado y agrupación de ideas por etiqueta.
- Recordatorios y notificaciones push para tareas con fecha.
- Sincronización en la nube y multi-dispositivo.
- Adjuntar imágenes o audio a las notas.
- Exportar/importar datos (Markdown, JSON).
- Organización por carpetas o cuadernos.
- Compartir un elemento concreto con otra persona.
- Widget de captura rápida en la pantalla de inicio.
