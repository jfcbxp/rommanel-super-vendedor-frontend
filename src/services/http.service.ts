import axios from "axios";

export function http(token?: string) {
  // test : "26.214.78.128"
  // production : "192.168.0.239"
  const host = "192.168.0.239";
  const domain = `http://${host}:9191`
  // const domain = "http://a28d-170-82-181-193.ngrok-free.app"
  const _baseURL = `${domain}/super-vendedor`;
  if (token) {
    return axios.create({
      baseURL: _baseURL,
      headers: {
        "Content-Type": "application/json",
        // "ngrok-skip-browser-warning": "24002023",
        Authorization: `Bearer ${token}`,
      },
      timeout: 20000,
    });
  } else {
    return axios.create({
      baseURL: _baseURL,
      headers: {
        "Content-Type": "application/json",
        // "ngrok-skip-browser-warning": "24002023",
      },
      timeout: 20000,
    });
  }
}
