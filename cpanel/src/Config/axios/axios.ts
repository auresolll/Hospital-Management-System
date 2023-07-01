import axios from "axios";

const isTrueSet =
  String(import.meta.env.VITE_PRODUCTION).toLowerCase() === "true";

const baseURL = isTrueSet
  ? import.meta.env.VITE_SERVER_URL
  : "http://localhost:5555/";

const access_token = JSON.parse(localStorage.getItem("access_token") ?? "{}");

const server = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    Authorization: `Bearer ${access_token["token"]}`,
  },
});

export default server;
