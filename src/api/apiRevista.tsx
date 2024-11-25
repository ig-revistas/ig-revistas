import axios from 'axios';

const apiRevista = axios.create({
    baseURL: 'http://localhost:8080',
});


apiRevista.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    const urlsAbiertas = [
        '/reserva/usuario/**',
        '/login',
        '/home',
        '/uploads',
        '/revistas/uploads',
        '/registrarse',
    ];
    if (accessToken && config.headers) {
        if (!urlsAbiertas.some(url => config.url?.includes(url)) && 
            !(config.url?.includes('/revistas') && config.method === 'get')) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    
    return config;
}, (error) => {
    console.error("✉️ ", error);
    return Promise.reject(error);
});

export default apiRevista;
