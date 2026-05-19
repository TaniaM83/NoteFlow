import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const scheme = useColorScheme();
  const colorMode = scheme === 'dark' ? 'dark' : 'light';

  return (
    <GluestackUIProvider config={config} colorMode={colorMode}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="nueva-note" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
    </GluestackUIProvider>
  );
}
