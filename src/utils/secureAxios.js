import axios from "axios";

const secureAxios = axios.create({
  baseURL: "http://localhost:5000",
});

secureAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default secureAxios;
