import axios from 'axios';
import { API_URL, PUBLIC_API_KEY } from '../constants/urlApi';
const camelize = require('camelize');

const instanceNext = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

instanceNext.interceptors.request.use(
  config => {
    let newUrl = `${config.url}&key=${PUBLIC_API_KEY}`;
    if (!config.url.includes('?')) {
      newUrl = newUrl.replace('&', '?');
    }
    config.url = newUrl;
    return Promise.resolve(config);
  },
  error => Promise.reject(error)
);

instanceNext.interceptors.response.use(
  response => camelize(response.data),
  error => {
    if (error.response) {
      return Promise.reject(error.response);
    }
    if (error.request) {
      return Promise.reject(error.request);
    }
    return Promise.reject(error.message);
  }
);

export async function fetchApi(
  endpoint,
  method = 'GET',
  body,
  params,
  sourceToken
) {
  return instanceNext({
    method: method,
    url: endpoint,
    data: body,
    params: params,
    cancelToken: sourceToken
  });
}

export async function fetchAllApi(requests = []) {
  return axios.all(requests);
}
