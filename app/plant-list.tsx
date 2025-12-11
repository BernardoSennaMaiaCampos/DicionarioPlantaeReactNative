import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, Image, TouchableOpacity, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Colors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import ActionButton from '@/components/ActionButton';
import { api, Plant } from '@/services/api';

export default function PlantListScreen() {
    const router = useRouter();
    const { category, type, edibility } = useLocalSearchParams<{ category: string; type: string; edibility: string }>();
    const [plants, setPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadPlants();
    }, [category, type, edibility]);

    const loadPlants = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.getPlants(category, type, edibility);
            if (Array.isArray(data)) {
                setPlants(data);
            } else {
                // Add handling if data isn't an array as expected
                console.warn('API returned non-array data:', data);
                setPlants([]);
            }
        } catch (err) {
            setError('Erro ao carregar plantas. Verifique sua conexão.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const renderPlantItem = ({ item }: { item: Plant }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/plant-details', params: { id: item.id } })}
            activeOpacity={0.7}
        >
            <Image
                source={{ uri: item.imagem || 'https://via.placeholder.com/150' }}
                style={styles.cardImage}
                resizeMode="cover"
            />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text style={styles.cardSubtitle} numberOfLines={2}>
                    {item.descricao}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="title" style={styles.title}>Lista de Plantas</ThemedText>
                <ThemedText type="subtitle" style={styles.subtitle}>
                    {category} - {type}
                </ThemedText>
            </View>

            {loading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={Colors.light.primary} />
                    <Text style={styles.loadingText}>Carregando plantas...</Text>
                </View>
            ) : error ? (
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <ActionButton label="Tentar Novamente" onPress={loadPlants} variant="retry" />
                </View>
            ) : (
                <FlatList
                    data={plants}
                    renderItem={renderPlantItem}
                    keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.centerContainer}>
                            <Text style={styles.emptyText}>Nenhuma planta encontrada.</Text>
                        </View>
                    }
                />
            )}

            <View style={styles.footer}>
                <ActionButton label="Voltar" variant="back" onPress={() => router.back()} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    header: {
        alignItems: 'center',
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.xl,
        backgroundColor: Colors.light.surface,
        ...Shadows.sm,
        zIndex: 1,
    },
    title: {
        textAlign: 'center',
        marginBottom: Spacing.xs,
    },
    subtitle: {
        textAlign: 'center',
        color: Colors.light.textSecondary,
        textTransform: 'capitalize',
    },
    listContent: {
        padding: Spacing.md,
        gap: Spacing.md,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
    },
    loadingText: {
        marginTop: Spacing.md,
        color: Colors.light.textSecondary,
    },
    errorText: {
        marginBottom: Spacing.md,
        color: Colors.light.error || '#D32F2F',
        textAlign: 'center',
    },
    emptyText: {
        color: Colors.light.textSecondary,
        fontSize: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: Colors.light.surface,
        borderRadius: BorderRadius.md,
        overflow: 'hidden',
        height: 100,
        ...Shadows.sm,
    },
    cardImage: {
        width: 100,
        height: '100%',
    },
    cardContent: {
        flex: 1,
        padding: Spacing.md,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 14,
        color: Colors.light.textSecondary,
    },
    footer: {
        padding: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
        backgroundColor: Colors.light.surface,
    },
});
