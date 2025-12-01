import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Plus } from 'lucide-react-native';


interface CategoryButtonProps {
  title: string;
  onPress: () => void;
}

export default function CategoryButton({ title, onPress }: CategoryButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Plus size={20} color="#FFFFFF" strokeWidth={2.5} />
      </View>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E5016',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 8,
    minWidth: 200,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
