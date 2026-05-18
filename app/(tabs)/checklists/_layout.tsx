import { Stack } from 'expo-router';

import { useTheme } from '../../../constants/theme';

/** Pila (Stack) de la pestaña Tareas: listado -> detalle. */
export default function ChecklistsStackLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.card },
        headerTintColor: theme.colors.text,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Tareas' }} />
      <Stack.Screen name="[id]" options={{ title: 'Lista de tareas' }} />
    </Stack>
  );
}
