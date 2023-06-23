import axios from "axios";
const baseURL = "http://localhost:8080/";

const server = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    Authorization: "Bearer ",
  },
});

export default server;
