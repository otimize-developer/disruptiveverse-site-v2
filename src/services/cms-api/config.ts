import axios from 'axios';

import { axiosInterceptor } from '../api-proxy/axios-interceptor';

const cmsApiOriginal = axios.create({
  baseURL: process.env.CMS_RESOURCE_API_URL,
  headers: {
    authorization: `Bearer ${process.env.CMS_RESOURCE_API_TOKEN}`,
  },
});

const cmsApiProxy = axiosInterceptor(
  axios.create({
    baseURL: '/api/cms-api',
  }),
);

export const cmsApi = (props: { proxy?: boolean } | void) =>
  props?.proxy ? cmsApiProxy : cmsApiOriginal;
