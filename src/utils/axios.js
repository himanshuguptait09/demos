import axios from "axios";
import { urls } from "./Webservices";
let url = urls[import.meta.env.VITE_REACT_APP_CURRENT_ENV];

const apiClient = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


// GET request
export const fetchData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response;
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};

export const putData = async (endpoint, data) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response;
  } catch (error) {
    console.error("PUT request error:", error);
    throw error;
  }
};


export default apiClient;
