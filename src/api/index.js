// import { API_URL } from "env";
import axios from 'axios';
import RequestAPI from './requestAPI';

export const API = axios.create({
  //   baseURL: API_URL,
});

export { RequestAPI };
