import { StyleSheet, Text, View } from 'react-native';

/**
 * Pantalla de arranque provisional.
 *
 * Se sustituirá por la navegación por pestañas (Notas / Tareas / Ideas)
 * en la fase de navegación. Sirve para verificar que Expo Router está
 * correctamente configurado.
 */
export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NoteFlow</Text>
      <Text style={styles.subtitle}>Expo Router configurado correctamente.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.6,
  },
});
