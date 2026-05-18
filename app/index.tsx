import { Box, Heading, HStack, Text, VStack } from '@gluestack-ui/themed';

import { contentAccents, useTheme } from '../constants/theme';

/**
 * Pantalla de arranque provisional.
 *
 * Verifica que Gluestack UI y los tokens de `constants/theme.ts` están
 * correctamente configurados y que el modo claro/oscuro reacciona a la
 * preferencia del sistema. Se sustituye por la navegación por pestañas en
 * la fase de navegación.
 */
export default function Home() {
  const theme = useTheme();

  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      px={theme.spacing.xl}
      style={{ backgroundColor: theme.colors.background }}
    >
      <VStack space="md" alignItems="center">
        <Heading size="2xl" style={{ color: theme.colors.text }}>
          NoteFlow
        </Heading>
        <Text style={{ color: theme.colors.textMuted }}>
          Sistema de diseño activo · modo {theme.mode}
        </Text>
        <HStack space="md" mt={theme.spacing.md}>
          {(Object.keys(contentAccents) as Array<keyof typeof contentAccents>).map(
            (key) => (
              <Box
                key={key}
                px={theme.spacing.md}
                py={theme.spacing.sm}
                borderRadius={theme.radii.md}
                style={{ backgroundColor: contentAccents[key] }}
              >
                <Text style={{ color: '#FFFFFF' }}>{key}</Text>
              </Box>
            )
          )}
        </HStack>
      </VStack>
    </Box>
  );
}
