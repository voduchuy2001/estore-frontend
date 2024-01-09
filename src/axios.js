import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  timeout: 5000,
});

export default instance;
