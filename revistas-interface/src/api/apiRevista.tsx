import axios from 'axios';

const apiRevista = axios.create({
    baseURL: 'http://localhost:8080',
})
//TODO
apiRevista.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
        if (accessToken && !(config.url?.includes('/generate-token') || 
                        config.url?.includes('/home') || 
                        config.url?.includes('/registrarse') || 
                        config.url?.includes('/registrarse')))
        config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
}, (error) => {
    console.error("✉️ ", error);
    return Promise.reject(error);
});

export default apiRevista;