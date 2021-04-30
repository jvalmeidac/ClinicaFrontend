import axios from "axios";
require("dotenv").config();

const api = axios.create({
  baseURL: "https://clinicafranscicoesteves.azurewebsites.net/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

api.interceptors.request.use(async (response) => {
  const token = localStorage.getItem("token");
  if (token) {
    response.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  return response;
});

export default api;
