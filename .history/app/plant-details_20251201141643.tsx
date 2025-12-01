import { View, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import ActionButton from '@/components/ActionButton';

export default function PlantDetailScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/2132240/pexels-photo-2132240.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.plantImage}
            resizeMode="cover"
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
    backgroundColor: '#F5F5F5',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: '100%',
    maxWidth: 500,
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
    marginBottom: 20,
  },
  plantImage: {
    width: '100%',
    height: '100%',
  },
  actionsContainer: {
    marginTop: 20,
    gap: 12,
  },
});
