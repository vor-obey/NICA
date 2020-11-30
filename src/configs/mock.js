import { permissions } from './app';

localStorage.setItem('role', permissions.roles.SUPER_ADMIN);

export const USER_ROLE = permissions.roles.SUPER_ADMIN;
export const DELAY = 1500;
