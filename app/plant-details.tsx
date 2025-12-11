import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Colors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import ActionButton from '@/components/ActionButton';
import { api, Plant } from '@/services/api';

export default function PlantDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadPlantDetails(id);
    }
  }, [id]);

  const loadPlantDetails = async (plantId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getPlantDetails(plantId);
      setPlant(data);
    } catch (err) {
      setError('Erro ao carregar detalhes da planta.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <ThemedText style={styles.loadingText}>Carregando detalhes...</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !plant) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ThemedText style={styles.errorText}>{error || 'Planta não encontrada'}</ThemedText>
          <ActionButton label="Voltar" variant="back" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>Detalhes da Planta</ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            {plant.categoria} - {plant.tipo}
          </ThemedText>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: plant.imagem || 'https://via.placeholder.com/500x300' }}
            style={styles.plantImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.infoContainer}>
          <ThemedText type="defaultSemiBold" style={styles.plantName}>{plant.nome}</ThemedText>
          <ThemedText type="default" style={styles.plantDescription}>
            {plant.descricao}
          </ThemedText>
          {plant.comestivel !== undefined && (
            <ThemedText style={styles.edibilityTag}>
              {plant.comestivel ? 'Essível' : 'Não Essível'}
            </ThemedText>
          )}
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
    textTransform: 'capitalize',
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  loadingText: {
    marginTop: Spacing.md,
    color: Colors.light.textSecondary,
  },
  errorText: {
    marginBottom: Spacing.md,
    color: Colors.light.error || '#D32F2F',
    textAlign: 'center',
    fontSize: 16,
  },
  edibilityTag: {
    marginTop: Spacing.md,
    color: Colors.light.primary,
    fontWeight: 'bold',
  },
});
