import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API ||
    "http://localhost:4000",
});
api.defaults.headers.post["Content-Type"] = "application/json";

export default api;
