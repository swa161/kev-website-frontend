import axios from "axios";

export const base_url = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
  baseURL: `${base_url}/api`,
});

export default api;