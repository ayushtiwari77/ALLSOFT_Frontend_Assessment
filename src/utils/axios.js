import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://apis.allsoft.co/api/documentManagement",
});

export default axiosInstance;
