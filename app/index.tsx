import { Redirect } from 'expo-router';

/**
 * Entrada de la app: redirige a la pestaña de Notas, que es la sección
 * principal de NoteFlow.
 */
export default function Index() {
  return <Redirect href="/notas" />;
}
