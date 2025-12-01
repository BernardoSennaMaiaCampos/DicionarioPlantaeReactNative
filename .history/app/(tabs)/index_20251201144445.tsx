import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Colors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import UserAvatar from '@/components/UserAvatar';

export default function LoginScreen() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    router.push('/categories');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <UserAvatar />
        
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>Dicionário de Plantas</ThemedText>
          <ThemedText type="caption" style={styles.subtitle}>Faça login para continuar</ThemedText>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <ThemedText type="defaultSemiBold" style={styles.label}>Login</ThemedText>
            <TextInput
              style={styles.input}
              value={login}
              onChangeText={setLogin}
              placeholder="Digite seu login"
              placeholderTextColor={Colors.light.textLight}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText type="defaultSemiBold" style={styles.label}>Senha</ThemedText>
            <TextInput
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
              placeholder="Digite sua senha"
              placeholderTextColor={Colors.light.textLight}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <ThemedText type="defaultSemiBold" style={styles.loginButtonText}>Entrar</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  label: {
    marginBottom: Spacing.sm,
    color: Colors.light.textSecondary,
  },
  input: {
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: 16,
    color: Colors.light.text,
    ...Shadows.sm,
  },
  loginButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.md + 2,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.xl,
    alignItems: 'center',
    ...Shadows.md,
    elevation: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
