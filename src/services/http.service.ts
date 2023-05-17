import axios from "axios";

export function http(token?: string) {
    const _baseURL = "http://26.214.78.128:9191/super-vendedor"
    if (token) {
        return axios.create({
            baseURL: _baseURL,
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "24022023",
                "Bypass-Tunnel-Reminder": "27022023",
                Authorization: `Bearer ${token}`,
            },
            timeout: 20000,
        });
    } else {
        return axios.create({
            baseURL: _baseURL,
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "24022023",
                "Bypass-Tunnel-Reminder": "27022023",
            },
            timeout: 20000,
        });
    }
}