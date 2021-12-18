const axios = require("axios");
const dotenv = require("dotenv");

const axiosInstance = (config) => {
  const axiosInstance = axios.create({
    baseURL: process.env.SERVER_BASE_URL,
    timeout: 20 * 1000,
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  });
  return axiosInstance;
};

export const userLogin = async (params) => {
  const config = {
    headers: {
      //형식 정해지면 교체
      "Content-Type": `application/x-www-form-urlencoded`,
    },
  };

  const response = await axiosInstance(config).post(
    "/login",
    //형식 정해지면 교체
    `email=${params.email}&password=${params.password}`
  );
  return response.data;
};
