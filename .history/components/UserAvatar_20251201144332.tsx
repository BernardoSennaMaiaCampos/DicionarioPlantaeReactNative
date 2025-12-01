import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User } from 'lucide-react-native';
import { Colors, BorderRadius, Shadows } from '@/constants/theme';

export default function UserAvatar() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.light.primary, Colors.light.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.avatarContainer}
      >
        <View style={styles.avatarCircle}>
          <User size={56} color="#FFFFFF" strokeWidth={2} />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.full,
    ...Shadows.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 104,
    height: 104,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
