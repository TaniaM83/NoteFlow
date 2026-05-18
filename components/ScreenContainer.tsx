import { Box } from '@gluestack-ui/themed';
import type { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../constants/theme';

interface ScreenContainerProps {
  children: ReactNode;
  /** Centra el contenido vertical y horizontalmente. */
  centered?: boolean;
}

/**
 * Contenedor base de pantalla: aplica el color de fondo del tema y el
 * área segura. Evita repetir este boilerplate en cada pantalla.
 */
export function ScreenContainer({ children, centered }: ScreenContainerProps) {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={['top', 'bottom']}
    >
      <Box
        flex={1}
        px={theme.spacing.xl}
        py={theme.spacing.lg}
        justifyContent={centered ? 'center' : 'flex-start'}
        alignItems={centered ? 'center' : 'stretch'}
      >
        {children}
      </Box>
    </SafeAreaView>
  );
}
