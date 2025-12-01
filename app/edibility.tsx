import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '@/constants/theme';
import UserAvatar from '@/components/UserAvatar';
import CategoryButton from '@/components/CategoryButton';
import ActionButton from '@/components/ActionButton';

export default function EdibilityScreen() {
  const router = useRouter();
  const { category, type } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>Comestibilidade</ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            {type} - {category}
          </ThemedText>
        </View>

        <UserAvatar />

        <View style={styles.categoriesContainer}>
          <CategoryButton
            title="Comestíveis"
            onPress={() => router.push({ pathname: '/plant-details', params: { category: category as string, type: type as string, edibility: 'comestiveis' } })}
          />
          <CategoryButton
            title="Não Comestíveis"
            onPress={() => router.push({ pathname: '/plant-details', params: { category: category as string, type: type as string, edibility: 'nao-comestiveis' } })}
          />
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
  categoriesContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  actionsContainer: {
    gap: Spacing.md,
    marginTop: 'auto',
  },
});
