import axios from 'axios';

const apiRevista = axios.create({
    baseURL: 'http://localhost:8080',
});

apiRevista.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        const urlsAbiertas = [
            '/reserva/usuario/**',
            '/login',
            '/home',
            '/uploads',
            '/revistas/uploads',
            '/registrarse',
            '/restablecer-contrasenia',  
            '/solicitar-restablecimiento',
        ];

        if (accessToken && config.headers) {
            const esUrlAbierta = urlsAbiertas.some((url) => config.url?.includes(url));
            const esRevistaGet = config.url =='/revistas' && config.method === 'get';
            const esRevistaPut = config.url == '/revistas' && config.method === 'put';
            const esRevistaPutSuspender = config.url == '/revistas/suspender' && config.method === 'put';

            if (!esUrlAbierta && !esRevistaGet && !esRevistaPut && !esRevistaPutSuspender) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }

        return config;
    },
    (error) => {
        console.error('✉️ Error en la solicitud: ', error);
        return Promise.reject(error);
    }
);

apiRevista.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn('⚠️ Token inválido o expirado. Redirigiendo al login...');
            window.location.href = '/login';
        } else {
            console.error('❌ Error en la respuesta: ', error);
        }
        return Promise.reject(error);
    }
);

export default apiRevista;