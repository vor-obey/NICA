import axios from 'axios';
import config from '../app/config';
import AuthApi from './AuthApi';

const { api: { baseURL } } = config;

const client = axios.create({ baseURL });

export const auth = new AuthApi({ client });

export default client;
