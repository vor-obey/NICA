import { permissions } from './app';

export const USER_ROLE = localStorage.getItem('role') ?? permissions.roles.SUPER_ADMIN;
export const DELAY = 1500;
