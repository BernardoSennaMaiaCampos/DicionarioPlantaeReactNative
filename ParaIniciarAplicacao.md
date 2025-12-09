# Para rodar

npm install lucide-react-native@latest
npx expo install react-native-svg
npx expo start -c

# Instalar cli para interface smartphone

npm install --save-dev @react-native-community/cli

# Se der conflito

npm install --save-dev @react-native-community/cli-platform-android @react-native-community/cli-platform-ios

# Limpar cache do react

npx react-native start --reset-cache

# Rodando interface smartphone, manter dois terminais abertos, executar os comandos na seguinte ordem

# Terminal 1
npx react-native start

# Terminal 2
npx react-native run-android

# Atualizando o Lucide

npm uninstall lucide-react-native

npm install lucide-react-native@latest --legacy-peer-deps
