import Cookies from 'js-cookie';

type UserPayload = {
  name?: string;
  email?: string;
  avatar?: string;
};

export function getCurrentUser(): UserPayload | null {
  const user = JSON.parse(Cookies.get('user') || '{}');

  if (user && Object.keys(user).length > 0) {
    return user;
  }

  return null;
}
