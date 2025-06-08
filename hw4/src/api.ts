// src/api.ts
import axios, { AxiosInstance } from "axios";

// Базов URL към твоя Spring Boot бекенд
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Създаваме Axios инстанс, който винаги изпраща JWT (ако е в localStorage)
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
