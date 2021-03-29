import axios from "axios";

const cepApi = axios.create({
  baseURL: "https://ws.apicep.com/cep/",
});

export default cepApi;
