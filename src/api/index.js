import axios from 'axios';
import config from '../app/config';
import AuthApi from './AuthApi';

const client = axios.create(config.api);

export const auth = new AuthApi({ client });

export default client;
