import axios from "axios";

export function http(token?: string) {
  const _baseURL = "http://192.168.0.239:9191/super-vendedor";
  if (token) {
    return axios.create({
      baseURL: _baseURL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 20000,
    });
  } else {
    return axios.create({
      baseURL: _baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 20000,
    });
  }
}
