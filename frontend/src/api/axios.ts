import axios from "axios";

type authData = {
  username: string;
  password: string;
};

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.token = token;
  }
  return req;
});

export const authAPI = {
  login: (data: authData) => api.post("/signin", data),
  signup: (data: authData) => api.post("/signup", data),
};
