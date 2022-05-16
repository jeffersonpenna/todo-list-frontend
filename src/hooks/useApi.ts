import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API
});

export const useApi = () => ({
  login: async (email: string, password: string) => {
    const response = await api.post('/auth', { email, password });
    return response.data;
  }
});