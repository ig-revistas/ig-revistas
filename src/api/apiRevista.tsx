import axios from 'axios';

const apiRevista = axios.create({
    baseURL: window.location.protocol + "//" + window.location.host + '/api'
});

apiRevista.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');


    if (accessToken && config.headers && !(config.url?.includes('/login') ||
                                           !config.url?.includes('/home') ||
                                           !config.url?.includes('/uploads') ||
                                           !config.url?.includes('/revistas/uplods') ||
                                           !config.url?.includes('/registrarse'))) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
}, (error) => {
    console.error("✉️ ", error);
    return Promise.reject(error);
});

export default apiRevista;
