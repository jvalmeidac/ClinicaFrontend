import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "https://localhost:44319/api/"
      : process.env.REACT_APP_API_ENDPOINT,
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
