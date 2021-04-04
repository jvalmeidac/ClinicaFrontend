import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44319/api/",
});

api.interceptors.request.use(async (response) => {
  const token = localStorage.getItem("token");
  if (token) {
    response.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  return response;
});

export default api;
