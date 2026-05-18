import { Button, ButtonText, Heading, Pressable, Text, VStack } from '@gluestack-ui/themed';
import { Link, useRouter } from 'expo-router';

import { contentAccents, type ContentType, useTheme } from '../constants/theme';
import { ScreenContainer } from './ScreenContainer';

/** Segmento de ruta de cada tipo de contenido (el de Tareas es /checklists). */
const routeByType: Record<ContentType, string> = {
  notas: 'notas',
  tareas: 'checklists',
  ideas: 'ideas',
};

interface ContentListScreenProps {
  type: ContentType;
  title: string;
}

/**
 * Pantalla de listado reutilizable para los tres tipos de contenido.
 *
 * Demuestra la navegación dentro de la pila de la pestaña (hacia el
 * detalle `[id]`) y la apertura del modal de creación. El listado real
 * con FlashList y datos de Zustand se implementa en una fase posterior.
 */
export function ContentListScreen({ type, title }: ContentListScreenProps) {
  const theme = useTheme();
  const router = useRouter();
  const accent = contentAccents[type];
  const routeBase = routeByType[type];

  // Datos de ejemplo hasta integrar el store.
  const sample = [1, 2, 3];

  return (
    <ScreenContainer>
      <VStack space="lg" flex={1}>
        <Heading size="xl" style={{ color: theme.colors.text }}>
          {title}
        </Heading>

        <VStack space="sm">
          {sample.map((id) => (
            <Link key={id} href={`/${routeBase}/${id}`} asChild>
              <Pressable
                px={theme.spacing.lg}
                py={theme.spacing.md}
                borderRadius={theme.radii.md}
                borderLeftWidth={4}
                style={{
                  backgroundColor: theme.colors.card,
                  borderLeftColor: accent,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                }}
              >
                <Text style={{ color: theme.colors.text }}>
                  {title} de ejemplo #{id}
                </Text>
                <Text style={{ color: theme.colors.textMuted }} size="sm">
                  Toca para ver el detalle
                </Text>
              </Pressable>
            </Link>
          ))}
        </VStack>

        <Button
          mt="auto"
          borderRadius={theme.radii.md}
          style={{ backgroundColor: theme.colors.primary }}
          onPress={() => router.push('/nueva-note')}
        >
          <ButtonText style={{ color: theme.colors.primaryText }}>
            + Crear
          </ButtonText>
        </Button>
      </VStack>
    </ScreenContainer>
  );
}
