import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

/**
 * Layout raíz de la aplicación.
 *
 * Envuelve toda la app en el `GluestackUIProvider` y sincroniza su
 * `colorMode` con el modo claro/oscuro del sistema.
 *
 * Declara un Stack con dos zonas:
 * - `(tabs)`: la navegación principal por pestañas (Notas / Tareas / Ideas).
 * - `nueva-note`: ruta de creación presentada como **modal** por encima de
 *   las pestañas.
 */
export default function RootLayout() {
  const scheme = useColorScheme();
  const colorMode = scheme === 'dark' ? 'dark' : 'light';

  return (
    <GluestackUIProvider config={config} colorMode={colorMode}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="nueva-note"
          options={{ presentation: 'modal' }}
        />
      </Stack>
      <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
    </GluestackUIProvider>
  );
}
