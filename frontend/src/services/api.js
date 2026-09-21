import axios from "axios";

const API = axios.create({
  baseURL: "https://hiretrack-zgq2.onrender.com/api",
});

export default API;