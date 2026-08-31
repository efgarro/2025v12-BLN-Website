import axios from "axios";

export const axiosIdearAppsAPI = axios.create({
  baseURL: "https://idearapps.com",
  fetchOptions: {
    cache: "no-cache", // Disables fetch-level cache so React Query can manage it
  },
});

export const axiosR2storage = axios.create({
  baseURL: "https://r2storage.bijalapa.com",
  fetchOptions: {
    cache: "no-cache", // Disables fetch-level cache so React Query can manage it
  },
});