import axios from "axios";
require("dotenv").config();

const api = axios.create({
  baseURL: "https://clinicafranscicoesteves.azurewebsites.net/api/",
});

api.interceptors.request.use(async (response) => {
  const token = localStorage.getItem("token");
  if (token) {
    response.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  return response;
});

export default api;
