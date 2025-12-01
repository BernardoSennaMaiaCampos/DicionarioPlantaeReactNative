import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { ArrowLeft, X } from 'lucide-react-native';

interface ActionButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'back' | 'exit';
}

export default function ActionButton({ label, onPress, variant = 'back' }: ActionButtonProps) {
  const Icon = variant === 'back' ? ArrowLeft : X;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon size={18} color="#FFFFFF" strokeWidth={2.5} />
      </View>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E5016',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
    minWidth: 140,
  },
  iconContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
