import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import UserAvatar from '@/components/UserAvatar';
import CategoryButton from '@/components/CategoryButton';
import ActionButton from '@/components/ActionButton';

export default function CategoriesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <UserAvatar />

        <View style={styles.categoriesContainer}>
          <CategoryButton
            title="Briófitas"
            onPress={() => router.push('/plant-types?category=briofitas')}
          />
          <CategoryButton
            title="Pteridófitas"
            onPress={() => router.push('/plant-types?category=pteridofitas')}
          />
          <CategoryButton
            title="Angiospermas"
            onPress={() => router.push('/plant-types?category=angiospermas')}
          />
          <CategoryButton
            title="Gimnospermas"
            onPress={() => router.push('/plant-types?category=gimnospermas')}
          />
        </View>

        <ActionButton
          label="Sair"
          variant="exit"
          onPress={() => router.back()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  categoriesContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginTop: 20,
  },
});
