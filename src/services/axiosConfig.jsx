const { default: axios } = require("axios");

const axiosRequest = axios.create({
  baseURL: "https://cream-v2.onrender.com/api/v2",
});

export default axiosRequest;
