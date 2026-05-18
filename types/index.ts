/**
 * Modelo de datos de NoteFlow.
 *
 * Los tres tipos de contenido comparten una base común (`BaseNote`) y se
 * unen en `AnyNote`. Para distinguirlos en tiempo de ejecución se usan
 * *type guards* basados en el operador `in` (ver más abajo).
 */

/** Campos comunes a cualquier tipo de nota. */
export interface BaseNote {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Nota de texto: un cuerpo libre. */
export interface Note extends BaseNote {
  content: string;
}

/** Lista de tareas: una colección de ítems marcables. */
export interface ChecklistNote extends BaseNote {
  items: ChecklistItem[];
}

/** Idea rápida: etiquetas para clasificarla y un color de acento. */
export interface IdeaNote extends BaseNote {
  tags: string[];
  color: string;
}

/** Ítem individual de una lista de tareas. */
export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

/**
 * Unión de los tres tipos de nota. Permite escribir funciones (stores,
 * listas, utilidades) que aceptan cualquier nota sin duplicar lógica.
 */
export type AnyNote = Note | ChecklistNote | IdeaNote;

/**
 * Type guards.
 *
 * TypeScript no conserva los tipos en tiempo de ejecución, así que para
 * saber con qué nota concreta trabajamos comprobamos la presencia de su
 * propiedad distintiva con el operador `in`. El predicado `note is X`
 * hace que, dentro del bloque que pasa la comprobación, TypeScript
 * estreche (`narrow`) el tipo automáticamente.
 *
 * @example
 * if (isChecklistNote(note)) {
 *   // aquí `note` es ChecklistNote: note.items está disponible y tipado
 *   note.items.forEach(...);
 * }
 */

/** `true` solo si la nota es una `Note` (tiene `content`). */
export function isNote(note: AnyNote): note is Note {
  return 'content' in note;
}

/** `true` solo si la nota es una `ChecklistNote` (tiene `items`). */
export function isChecklistNote(note: AnyNote): note is ChecklistNote {
  return 'items' in note;
}

/** `true` solo si la nota es una `IdeaNote` (tiene `tags`). */
export function isIdeaNote(note: AnyNote): note is IdeaNote {
  return 'tags' in note;
}
