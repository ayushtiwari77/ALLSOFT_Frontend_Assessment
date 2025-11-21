import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://apis.allsoft.co/api/documentManagement",
});
