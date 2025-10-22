import { View, StyleSheet } from 'react-native';
import { User } from 'lucide-react-native';

export default function UserAvatar() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarCircle}>
        <User size={64} color="#4A5D23" strokeWidth={2.5} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
