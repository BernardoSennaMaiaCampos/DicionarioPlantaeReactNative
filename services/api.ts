import { API_BASE_URL } from '@/constants/api';

// --- DTO Interfaces (matching Swagger) ---

export interface CategoriaTaxonomicaDTO {
    id: number;
    nome: string;
    status: number;
}

export interface ClassificacaoAngiospermaDTO {
    id: number;
    nome: string;
    status: number;
}

export interface OrigemDTO {
    id: string; // Swagger says string in DTO response, integer in entity. Keeping string to match response.
    tipo: string;
    status: number;
}

export interface PlantaDTO {
    id: number;
    cientifico: string;
    popular: string;
    comestivel: number; // 0 or 1
    status: number;
    categoriaTaxonomica?: CategoriaTaxonomicaDTO;
    origem?: OrigemDTO;
    classificacaoAngiosperma?: ClassificacaoAngiospermaDTO;
}

export interface ImagemDTO {
    id: number;
    tipo: string;
    url: string;
    status: number;
    planta?: PlantaDTO;
}

// --- Frontend Interfaces ---

export interface Plant {
    id: number;
    nome: string;
    descricao: string;
    imagem: string;
    categoria: string;
    tipo: string;
    comestivel: boolean;
    cientifico: string; // Added cientifico to frontend model
    origem: string;
}

export interface PlantaRequest {
    cientifico: string;
    popular: string;
    categoriaTaxonomicaId: number;
    classificacaoAngiospermaId: number;
    origemId: number;
    comestivel: number;
    status: number;
}

export const api = {
    getPlants: async (category?: string, type?: string, edibility?: string): Promise<Plant[]> => {
        try {
            console.log('Fetching plants from API...');

            // Fetch Plants
            const responsePlantas = await fetch(`${API_BASE_URL}/planta/listar`);
            if (!responsePlantas.ok) throw new Error(`API Error (Plantas): ${responsePlantas.status}`);
            const plantas: PlantaDTO[] = await responsePlantas.json();

            // Fetch Images (to map to plants)
            const responseImagens = await fetch(`${API_BASE_URL}/imagem/listar`);
            if (!responseImagens.ok) throw new Error(`API Error (Imagens): ${responseImagens.status}`);
            const imagens: ImagemDTO[] = await responseImagens.json();

            // Map DTOs to Frontend Interface
            let mappedPlants: Plant[] = plantas.map(planta => {
                // Find associated image
                const imagemDTO = imagens.find(img => img.planta?.id === planta.id);

                return {
                    id: planta.id,
                    nome: planta.popular,
                    cientifico: planta.cientifico,
                    descricao: 'Descrição indisponível', // Placeholder as API doesn't have description
                    imagem: imagemDTO ? imagemDTO.url : '',
                    categoria: planta.categoriaTaxonomica?.nome || 'Desconhecida',
                    tipo: planta.classificacaoAngiosperma?.nome || 'Desconhecido',
                    comestivel: planta.comestivel === 1,
                    origem: planta.origem?.tipo || 'Desconhecida'
                };
            });

            // Filter Client-Side (because backend is missing filter endpoints)
            if (category) {
                mappedPlants = mappedPlants.filter(p => p.categoria.toLowerCase().includes(category.toLowerCase()));
            }
            if (type) {
                mappedPlants = mappedPlants.filter(p => p.tipo.toLowerCase().includes(type.toLowerCase()));
            }
            if (edibility) {
                const isEdible = edibility === 'comestiveis';
                if (edibility === 'comestiveis' || edibility === 'nao-comestiveis') {
                    mappedPlants = mappedPlants.filter(p => p.comestivel === isEdible);
                }
            }

            return mappedPlants;
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    },

    getPlantDetails: async (id: string | number): Promise<Plant> => {
        try {
            console.log(`Fetching details for plant ID: ${id}`);
            const responsePlanta = await fetch(`${API_BASE_URL}/planta/${id}`);
            if (!responsePlanta.ok) throw new Error('Planta não encontrada');
            const planta: PlantaDTO = await responsePlanta.json();

            // Fetch Images (to map to plants) - Ideally backend should include image in details or separate endpoint
            // For now, fetching list to find image (optimization pending backend change)
            const responseImagens = await fetch(`${API_BASE_URL}/imagem/listar`);
            const imagens: ImagemDTO[] = responseImagens.ok ? await responseImagens.json() : [];
            const imagemDTO = imagens.find(img => img.planta?.id === planta.id);

            return {
                id: planta.id,
                nome: planta.popular,
                cientifico: planta.cientifico,
                descricao: 'Descrição indisponível',
                imagem: imagemDTO ? imagemDTO.url : '',
                categoria: planta.categoriaTaxonomica?.nome || 'Desconhecida',
                tipo: planta.classificacaoAngiosperma?.nome || 'Desconhecido',
                comestivel: planta.comestivel === 1,
                origem: planta.origem?.tipo || 'Desconhecida'
            };
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    },

    searchPlants: async (query: string): Promise<Plant[]> => {
        try {
            // Fetch Plants by name
            const responsePlantas = await fetch(`${API_BASE_URL}/planta/buscar?nome=${encodeURIComponent(query)}`);
            if (!responsePlantas.ok) throw new Error(`API Error (Search): ${responsePlantas.status}`);
            const plantas: PlantaDTO[] = await responsePlantas.json();

            // Fetch Images (to map to plants)
            const responseImagens = await fetch(`${API_BASE_URL}/imagem/listar`);
            const imagens: ImagemDTO[] = responseImagens.ok ? await responseImagens.json() : [];

            // Map DTOs to Frontend Interface
            return plantas.map(planta => {
                const imagemDTO = imagens.find(img => img.planta?.id === planta.id);
                return {
                    id: planta.id,
                    nome: planta.popular,
                    cientifico: planta.cientifico,
                    descricao: 'Descrição indisponível',
                    imagem: imagemDTO ? imagemDTO.url : '',
                    categoria: planta.categoriaTaxonomica?.nome || 'Desconhecida',
                    tipo: planta.classificacaoAngiosperma?.nome || 'Desconhecido',
                    comestivel: planta.comestivel === 1,
                    origem: planta.origem?.tipo || 'Desconhecida'
                };
            });
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    },

    createPlant: async (plant: PlantaRequest): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/planta/criar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(plant),
        });

        if (!response.ok) {
            throw new Error(`Failed to create plant: ${response.statusText}`);
        }
    },

    updatePlant: async (id: number, plant: PlantaRequest): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/planta/atualizar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(plant),
        });

        if (!response.ok) {
            throw new Error(`Failed to update plant: ${response.statusText}`);
        }
    },

    deletePlant: async (id: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/planta/deletar/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Failed to delete plant: ${response.statusText}`);
        }
    },

    getCategories: async (): Promise<CategoriaTaxonomicaDTO[]> => {
        const response = await fetch(`${API_BASE_URL}/categoria_taxonomica/listar`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json();
    },

    getClassifications: async (): Promise<ClassificacaoAngiospermaDTO[]> => {
        const response = await fetch(`${API_BASE_URL}/classificacaoangiosperma/listar`);
        if (!response.ok) throw new Error('Failed to fetch classifications');
        return response.json();
    },

    getOrigins: async (): Promise<OrigemDTO[]> => {
        const response = await fetch(`${API_BASE_URL}/origem/listar`);
        if (!response.ok) throw new Error('Failed to fetch origins');
        return response.json();
    }
};
