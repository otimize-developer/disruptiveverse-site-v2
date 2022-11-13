import axios from 'axios';

import { axiosInterceptor } from '../api-proxy/axios-interceptor';

const coinResourceApiOriginal = axios.create({
  baseURL: process.env.COIN_RESOURCE_API_URL,
  headers: {
    'x-api-key': String(process.env.COIN_RESOURCE_API_KEY),
  },
});

const coinResourceApiProxy = axiosInterceptor(
  axios.create({
    baseURL: '/api/coin-api',
  }),
);

export const coinResourceApi = (props: { proxy?: boolean } | void) =>
  props?.proxy ? coinResourceApiProxy : coinResourceApiOriginal;
