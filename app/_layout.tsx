import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * Layout raíz de la aplicación.
 *
 * En esta fase solo declara un Stack base. La navegación por pestañas
 * (Notas / Tareas / Ideas) y la ruta modal de creación se añaden en la
 * fase de navegación.
 */
export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </>
  );
}
