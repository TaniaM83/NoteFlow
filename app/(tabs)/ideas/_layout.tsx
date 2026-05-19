import { Stack } from 'expo-router';

import { useTheme } from '../../../constants/theme';

export default function IdeasStackLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.card },
        headerTintColor: theme.colors.text,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Ideas' }} />
      <Stack.Screen name="[id]" options={{ title: 'Idea' }} />
    </Stack>
  );
}
