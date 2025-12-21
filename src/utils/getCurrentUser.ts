import Cookies from 'js-cookie';

import { decodeToken } from './decodeToken';

type UserPayload = {
  name?: string;
  email?: string;
  avatar?: string;
};

export function getCurrentUser(): UserPayload | null {
  const token = Cookies.get('accessToken');
  const decoded = decodeToken(token || '');
  if (token) {
    const user: UserPayload = {
      name: decoded?.name,
      email: decoded?.email,
      avatar: decoded?.avatar,
    };
    return user;
  }

  return null;
}
