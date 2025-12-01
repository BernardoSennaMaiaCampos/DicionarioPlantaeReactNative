import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Plus } from 'lucide-react-native';
import { Colors, BorderRadius, Shadows, Spacing } from '@/constants/theme';

interface CategoryButtonProps {
  title: string;
  onPress: () => void;
}

export default function CategoryButton({ title, onPress }: CategoryButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Plus size={20} color="#FFFFFF" strokeWidth={2} />
      </View>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginVertical: Spacing.sm,
    minWidth: 240,
    ...Shadows.sm,
    elevation: 2,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
