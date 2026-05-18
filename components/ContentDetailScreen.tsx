import { Heading, Text, VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams } from 'expo-router';

import { type ContentType, useTheme } from '../constants/theme';
import { ScreenContainer } from './ScreenContainer';

interface ContentDetailScreenProps {
  type: ContentType;
  title: string;
}

/**
 * Pantalla de detalle reutilizable. Lee el parámetro dinámico `id` de la
 * ruta (`[id].tsx`) con `useLocalSearchParams`. El contenido real se
 * cargará desde el store en una fase posterior.
 */
export function ContentDetailScreen({ type, title }: ContentDetailScreenProps) {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ScreenContainer>
      <VStack space="md">
        <Heading size="xl" style={{ color: theme.colors.text }}>
          {title} #{id}
        </Heading>
        <Text style={{ color: theme.colors.textMuted }}>
          Detalle del elemento «{id}» de tipo «{type}». Ruta dinámica
          resuelta por Expo Router.
        </Text>
      </VStack>
    </ScreenContainer>
  );
}
