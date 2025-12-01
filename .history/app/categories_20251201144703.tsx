import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '@/constants/theme';
import UserAvatar from '@/components/UserAvatar';
import CategoryButton from '@/components/CategoryButton';
import ActionButton from '@/components/ActionButton';

export default function CategoriesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>Categorias</ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>Escolha uma categoria de plantas</ThemedText>
        </View>

        <UserAvatar />

        <View style={styles.categoriesContainer}>
          <CategoryButton
            title="Briófitas"
            onPress={() => router.push({ pathname: '/plant-types', params: { category: 'briofitas' } })}
          />
          <CategoryButton
            title="Pteridófitas"
            onPress={() => router.push({ pathname: '/plant-types', params: { category: 'pteridofitas' } })}
          />
          <CategoryButton
            title="Angiospermas"
            onPress={() => router.push({ pathname: '/plant-types', params: { category: 'angiospermas' } })}
          />
          <CategoryButton
            title="Gimnospermas"
            onPress={() => router.push({ pathname: '/plant-types', params: { category: 'gimnospermas' } })}
          />
        </View>

        <View style={styles.footer}>
          <ActionButton
            label="Sair"
            variant="exit"
            onPress={() => router.back()}
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
  footer: {
    marginTop: 'auto',
  },
});
