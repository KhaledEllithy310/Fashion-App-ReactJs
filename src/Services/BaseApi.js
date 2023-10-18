import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const myAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
