import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

export const musicApi = {
    generate: (data) => api.post('/generate', data),
    train: () => api.post('/train'),
    getStatus: () => api.get('/status'),
    getDownloadUrl: (filename) => `/download/${filename}`,
};

export default api;
