import jwt from 'jsonwebtoken';

type jwtPayload = {
  sub?: string;
  email?: string;
  name?: string;
  exp?: number;
  [key: string]: any;
};

export function decodeToken(token: string): jwtPayload | null {
  try {
    const decoded = jwt.decode(token || '') as jwtPayload;
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
