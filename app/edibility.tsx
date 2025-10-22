import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import UserAvatar from '@/components/UserAvatar';
import CategoryButton from '@/components/CategoryButton';
import ActionButton from '@/components/ActionButton';

export default function EdibilityScreen() {
  const router = useRouter();
  const { category, type } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <UserAvatar />

        <View style={styles.categoriesContainer}>
          <CategoryButton
            title="Comestíveis"
            onPress={() => router.push(`/plant-detail?category=${category}&type=${type}&edibility=comestiveis`)}
          />
          <CategoryButton
            title="Não Comestíveis"
            onPress={() => router.push(`/plant-detail?category=${category}&type=${type}&edibility=nao-comestiveis`)}
          />
        </View>

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
