import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { ArrowLeft, X, RefreshCw, Check } from 'lucide-react-native';
import { Colors, BorderRadius, Shadows, Spacing } from '@/constants/theme';

interface ActionButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'back' | 'exit' | 'retry' | 'primary';
  disabled?: boolean;
}

export default function ActionButton({ label, onPress, variant = 'back', disabled = false }: ActionButtonProps) {
  const Icon = variant === 'back' ? ArrowLeft :
    variant === 'exit' ? X :
      variant === 'retry' ? RefreshCw : Check;

  const backgroundColor = variant === 'exit' ? Colors.light.error || '#D32F2F' : Colors.light.primary;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        disabled && styles.disabledButton
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={styles.iconContainer}>
        <Icon size={18} color="#FFFFFF" strokeWidth={2} />
      </View>
      <Text style={styles.buttonText}>{label}</Text>
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
    marginTop: Spacing.lg,
    alignSelf: 'center',
    minWidth: 140,
    ...Shadows.sm,
    elevation: 2,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
