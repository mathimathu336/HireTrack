import axios from "axios";
import supabase from "./supabase";

const API = axios.create({
  baseURL: "https://hiretrack-zgq2.onrender.com/api",
});

API.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
});

export default API;