import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Switch, Alert, Modal, FlatList, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Colors, BorderRadius, Shadows, Spacing } from '@/constants/theme';
import ActionButton from '@/components/ActionButton';
import { api, CategoriaTaxonomicaDTO, ClassificacaoAngiospermaDTO, OrigemDTO, PlantaRequest } from '@/services/api';
import { ChevronDown, X } from 'lucide-react-native';

export default function PlantEditScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const [nomePopular, setNomePopular] = useState('');
    const [nomeCientifico, setNomeCientifico] = useState('');
    const [comestivel, setComestivel] = useState(false);
    const [status, setStatus] = useState(1);

    const [categories, setCategories] = useState<CategoriaTaxonomicaDTO[]>([]);
    const [classifications, setClassifications] = useState<ClassificacaoAngiospermaDTO[]>([]);
    const [origins, setOrigins] = useState<OrigemDTO[]>([]);

    const [selectedCategory, setSelectedCategory] = useState<CategoriaTaxonomicaDTO | null>(null);
    const [selectedClassification, setSelectedClassification] = useState<ClassificacaoAngiospermaDTO | null>(null);
    const [selectedOrigin, setSelectedOrigin] = useState<OrigemDTO | null>(null);

    const [loadingData, setLoadingData] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Modal States
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [classificationModalVisible, setClassificationModalVisible] = useState(false);
    const [originModalVisible, setOriginModalVisible] = useState(false);

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            setLoadingData(true);
            const [plant, cats, classes, origs] = await Promise.all([
                api.getPlantDetails(Number(id)),
                api.getCategories(),
                api.getClassifications(),
                api.getOrigins()
            ]);

            setCategories(cats);
            setClassifications(classes);
            setOrigins(origs);

            // Pre-fill form
            if (plant) {
                setNomePopular(plant.nome);
                setNomeCientifico(plant.cientifico);
                setComestivel(plant.comestivel);
                // status not exposed in Plant interface, defaulting to 1 or separate fetch if critical

                // Match objects by name/type
                const foundCat = cats.find(c => c.nome === plant.categoria);
                const foundClass = classes.find(c => c.nome === plant.tipo);
                const foundOrig = origs.find(o => o.tipo === plant.origem);

                if (foundCat) setSelectedCategory(foundCat);
                if (foundClass) setSelectedClassification(foundClass);
                if (foundOrig) setSelectedOrigin(foundOrig);
            }

        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Falha ao carregar dados da planta.');
            router.back();
        } finally {
            setLoadingData(false);
        }
    };

    const handleUpdate = async () => {
        if (!nomePopular || !nomeCientifico || !selectedCategory || !selectedClassification || !selectedOrigin) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            setSubmitting(true);
            const updatedPlant: PlantaRequest = {
                popular: nomePopular,
                cientifico: nomeCientifico,
                categoriaTaxonomicaId: selectedCategory.id,
                classificacaoAngiospermaId: selectedClassification.id,
                origemId: Number(selectedOrigin.id),
                comestivel: comestivel ? 1 : 0,
                status: status
            };

            await api.updatePlant(Number(id), updatedPlant);
            Alert.alert('Sucesso', 'Planta atualizada com sucesso!', [
                { text: 'OK', onPress: () => router.back() }
            ]);
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Falha ao atualizar planta.');
        } finally {
            setSubmitting(false);
        }
    };

    const renderSelector = (label: string, value: string | undefined, onPress: () => void) => (
        <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>{label} *</ThemedText>
            <TouchableOpacity style={styles.selector} onPress={onPress}>
                <ThemedText style={value ? styles.selectorText : styles.placeholderText}>
                    {value || 'Selecione...'}
                </ThemedText>
                <ChevronDown size={20} color={Colors.light.textSecondary} />
            </TouchableOpacity>
        </View>
    );

    const renderModal = (
        visible: boolean,
        onClose: () => void,
        data: any[],
        onSelect: (item: any) => void,
        title: string
    ) => (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <ThemedText type="defaultSemiBold">{title}</ThemedText>
                        <TouchableOpacity onPress={onClose}>
                            <X size={24} color={Colors.light.text} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => { onSelect(item); onClose(); }}
                            >
                                <ThemedText>{item.nome || item.tipo}</ThemedText>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </Modal>
    );

    if (loadingData) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={Colors.light.primary} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <ThemedText type="title" style={styles.title}>Editar Planta</ThemedText>

                <View style={styles.formCard}>
                    <View style={styles.inputGroup}>
                        <ThemedText style={styles.label}>Nome Popular *</ThemedText>
                        <TextInput
                            style={styles.input}
                            value={nomePopular}
                            onChangeText={setNomePopular}
                            placeholder="Ex: Roseira"
                            placeholderTextColor={Colors.light.textSecondary}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <ThemedText style={styles.label}>Nome Científico *</ThemedText>
                        <TextInput
                            style={styles.input}
                            value={nomeCientifico}
                            onChangeText={setNomeCientifico}
                            placeholder="Ex: Rosa spp."
                            placeholderTextColor={Colors.light.textSecondary}
                        />
                    </View>

                    {renderSelector('Categoria', selectedCategory?.nome, () => setCategoryModalVisible(true))}
                    {renderSelector('Classificação', selectedClassification?.nome, () => setClassificationModalVisible(true))}
                    {renderSelector('Origem', selectedOrigin?.tipo, () => setOriginModalVisible(true))}

                    <View style={styles.switchContainer}>
                        <ThemedText style={styles.label}>Comestível</ThemedText>
                        <Switch
                            value={comestivel}
                            onValueChange={setComestivel}
                            trackColor={{ false: '#767577', true: Colors.light.primary }}
                            thumbColor={comestivel ? '#fff' : '#f4f3f4'}
                        />
                    </View>
                </View>

                <View style={styles.actionsContainer}>
                    <ActionButton
                        label={submitting ? "Salvando..." : "Salvar Alterações"}
                        onPress={handleUpdate}
                        variant="primary"
                        disabled={submitting}
                    />
                    <ActionButton
                        label="Cancelar"
                        variant="back"
                        onPress={() => router.back()}
                        disabled={submitting}
                    />
                </View>
            </ScrollView>

            {renderModal(categoryModalVisible, () => setCategoryModalVisible(false), categories, setSelectedCategory, 'Selecione a Categoria')}
            {renderModal(classificationModalVisible, () => setClassificationModalVisible(false), classifications, setSelectedClassification, 'Selecione a Classificação')}
            {renderModal(originModalVisible, () => setOriginModalVisible(false), origins, setSelectedOrigin, 'Selecione a Origem')}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    content: {
        padding: Spacing.xl,
    },
    title: {
        textAlign: 'center',
        marginBottom: Spacing.xl,
    },
    formCard: {
        backgroundColor: Colors.light.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        ...Shadows.sm,
        marginBottom: Spacing.xl,
    },
    inputGroup: {
        marginBottom: Spacing.lg,
    },
    label: {
        marginBottom: Spacing.xs,
        color: Colors.light.text,
        fontWeight: '500',
    },
    input: {
        backgroundColor: Colors.light.background,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        color: Colors.light.text,
    },
    selector: {
        backgroundColor: Colors.light.background,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectorText: {
        color: Colors.light.text,
    },
    placeholderText: {
        color: Colors.light.textSecondary,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Spacing.sm,
    },
    actionsContainer: {
        gap: Spacing.md,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.light.surface,
        borderTopLeftRadius: BorderRadius.xl,
        borderTopRightRadius: BorderRadius.xl,
        maxHeight: '70%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    modalItem: {
        padding: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
});
