import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const getWindows = async (query) => {
  return axios.get(url + `?q=${query}`);
};

export const deleteWindow = (id) => {
  return axios.delete(url + `windows/${id}`);
};

export const updateWindow = (id, data) => {
  return axios.put(url + `windows/${id}`, data);
};

export const addWindow = (data) => {
  return axios.post(url + "windows/add", data);
};
