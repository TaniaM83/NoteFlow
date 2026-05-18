import { Stack } from 'expo-router';

import { useTheme } from '../../../constants/theme';

/**
 * Pila (Stack) de la pestaña Notas: listado -> detalle.
 *
 * Cada pestaña tiene su propia pila para que la navegación a detalle se
 * mantenga aislada del resto de pestañas.
 */
export default function NotasStackLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.card },
        headerTintColor: theme.colors.text,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Notas' }} />
      <Stack.Screen name="[id]" options={{ title: 'Nota' }} />
    </Stack>
  );
}
