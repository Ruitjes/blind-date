//process.env.APP_URL
import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7000";

const httpdefault = () => {
  const https = require("https");
  return axios.create({
    baseURL: url,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
};
const httptoken = (token: string = "") => {
  const https = require("https");
  return axios.create({
    baseURL: url,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
};

export default {
  httpdefault,
  httptoken,
};