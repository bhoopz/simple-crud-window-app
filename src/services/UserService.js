import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const register = (data) => {
  return axios.post(url + "register", data);
};

export const login = (data) => {
  return axios.post(url + "login", data);
};
