import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true,
});

export const testAPI = () => API.get("/");
