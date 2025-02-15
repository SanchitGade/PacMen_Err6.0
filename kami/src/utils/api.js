// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Base URL for API
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;