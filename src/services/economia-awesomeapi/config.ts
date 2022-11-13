import axios from 'axios';

export const economiaAwesomeApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ECONOMIA_AWESOME_API_URL,
});
