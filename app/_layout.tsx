import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

/**
 * Layout raíz de la aplicación.
 *
 * Envuelve toda la app en el `GluestackUIProvider` (sistema de diseño) y
 * sincroniza su `colorMode` con la preferencia de modo claro/oscuro del
 * sistema operativo mediante `useColorScheme`.
 */
export default function RootLayout() {
  const scheme = useColorScheme();
  const colorMode = scheme === 'dark' ? 'dark' : 'light';

  return (
    <GluestackUIProvider config={config} colorMode={colorMode}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
    </GluestackUIProvider>
  );
}
