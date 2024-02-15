import axios from 'axios';

export function http(token?: string) {
    const host = '192.168.0.239';
    const domain = `http://${host}:9191`;
    //const domain = 'https://37e4-2804-1b2-d000-d3be-39b1-d16-be77-9ae7.ngrok-free.app';
    const _baseURL = `${domain}/super-vendedor`;
    if (token) {
        return axios.create({
            baseURL: _baseURL,
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': '24002023',
                'Authorization': `Bearer ${token}`,
            },
            timeout: 20000,
        });
    } else {
        return axios.create({
            baseURL: _baseURL,
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': '24002023',
            },
            timeout: 20000,
        });
    }
}
