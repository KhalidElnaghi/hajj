import Cookie from 'js-cookie';

import { USER_KEY } from '../auth/constants';

export type User = {
  id: string;
  name: string;
  avatar: any;
  username: string;
  email: string;
  email_verified_at: any;
  phone: string;
  phone_verified_at: any;
  roles: string[];
  access_token: string;
};

export const useUser = (): User => {
  const userCookie = Cookie.get(USER_KEY);
  if (!userCookie) {
    throw new Error('User not found in cookies');
  }
  return JSON.parse(userCookie) as User;
};
