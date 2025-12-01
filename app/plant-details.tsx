import { View, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Colors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import ActionButton from '@/components/ActionButton';

export default function PlantDetailScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>Detalhes da Planta</ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            Informações sobre a planta selecionada
          </ThemedText>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.plantImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.infoContainer}>
          <ThemedText type="defaultSemiBold" style={styles.plantName}>Nome da Planta</ThemedText>
          <ThemedText type="default" style={styles.plantDescription}>
            Descrição detalhada da planta, suas características, habitat e outras informações relevantes.
          </ThemedText>
        </View>

        <View style={styles.actionsContainer}>
          <ActionButton
            label="Voltar"
            variant="back"
            onPress={() => router.back()}
          />
          <ActionButton
            label="Sair"
            variant="exit"
            onPress={() => router.push('/')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    color: Colors.light.textSecondary,
  },
  imageContainer: {
    width: '100%',
    maxWidth: 500,
    aspectRatio: 16 / 9,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.light.surfaceSecondary,
    marginBottom: Spacing.xl,
    ...Shadows.md,
  },
  plantImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  plantName: {
    marginBottom: Spacing.md,
    color: Colors.light.primary,
    fontSize: 20,
  },
  plantDescription: {
    lineHeight: 24,
    color: Colors.light.textSecondary,
  },
  actionsContainer: {
    gap: Spacing.md,
    marginTop: 'auto',
  },
});
