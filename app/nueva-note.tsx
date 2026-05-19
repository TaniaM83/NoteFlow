import {
  Button,
  ButtonText,
  Heading,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

import { ScreenContainer } from '../components/ScreenContainer';
import { useTheme } from '../constants/theme';

export default function NuevaNoteModal() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <ScreenContainer>
      <VStack space="lg" flex={1}>
        <Heading size="xl" style={{ color: theme.colors.text }}>
          Crear contenido
        </Heading>
        <Text style={{ color: theme.colors.textMuted }}>
          Aquí irá el formulario para crear una nota, una lista de tareas o
          una idea. Esta pantalla se abre como modal sobre las pestañas.
        </Text>

        <Button
          mt="auto"
          variant="outline"
          borderRadius={theme.radii.md}
          style={{ borderColor: theme.colors.border }}
          onPress={() => router.back()}
        >
          <ButtonText style={{ color: theme.colors.text }}>Cerrar</ButtonText>
        </Button>
      </VStack>
    </ScreenContainer>
  );
}
