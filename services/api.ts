import { API_BASE_URL } from '@/constants/api';

export interface Plant {
    id: number;
    nome: string;
    descricao: string;
    imagem: string;
    categoria: string;
    tipo: string;
    comestivel: boolean;
}

export const api = {
    getPlants: async (category?: string, type?: string, edibility?: string) => {
        try {
            // Construct query parameters
            const params = new URLSearchParams();
            if (category) params.append('categoria', category);
            if (type) params.append('tipo', type);
            // Map edibility to boolean or string as expected by backend (assuming 'comestivel' param)
            if (edibility === 'comestiveis') params.append('comestivel', 'true');
            if (edibility === 'nao-comestiveis') params.append('comestivel', 'false');

            const queryString = params.toString();
            const url = `${API_BASE_URL}/Plantas${queryString ? `?${queryString}` : ''}`;

            console.log('Fetching plants from:', url);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    },

    getPlantDetails: async (id: string | number) => {
        try {
            const url = `${API_BASE_URL}/Plantas/${id}`;
            console.log('Fetching details from:', url);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    }
};
