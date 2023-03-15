import axios from "axios";

const httpService = axios.create({
  baseURL: process.env?.REACT_APP_REST_API || "",
  timeout: 10000,
  headers: { "Content-Type": "application/json" }
});

httpService.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(process.env?.REACT_APP_JWT_TOKEN || "");
    if (token) config.headers.authorization = `bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpService.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", error);
  }

  return Promise.reject(error);
});

export default httpService;
