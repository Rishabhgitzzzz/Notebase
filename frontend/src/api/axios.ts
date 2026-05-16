import axios from "axios";

type authData = {
  username: string;
  password: string;
};

interface ContentData {
  link: string;
  title: string;
  type: string;
}

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

export const contentAPI = {
  postContent: (data: ContentData) => api.post("/content", data),
  getContent: () => api.get("/content"),
  deleteContent: (data: { contentId: string }) =>
    api.delete("/content", { data }),
};
