'use client';

/* eslint-disable consistent-return */

import axios from 'axios';
import Cookie from 'js-cookie';
import { useMemo, useEffect, useReducer, useCallback } from 'react';

import { getErrorMessage } from 'src/utils/axios';
import { endpoints } from 'src/utils/endpoints';

import { IUser } from 'src/@types/user';
import { RefreshToken, LoginWithEmail } from 'src/actions/auth';

import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';
import { USER_KEY, ACCESS_TOKEN } from '../../constants';
import { AuthUserType, ActionMapType, AuthStateType } from '../../types';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Readonly<Props>) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const lang: string = Cookie.get('Language') || 'ar';
      Cookie.set('Language', lang);
      const accessToken = Cookie.get(ACCESS_TOKEN);
      const refreshToken = Cookie.get('refreshToken');
      const accessTokenExpireAt = Cookie.get('accessTokenExpireAt');
      const refreshTokenExpireAt = Cookie.get('refreshTokenExpireAt');
      const user: IUser | {} = Cookie.get(USER_KEY) ?? {};

      if (
        accessToken &&
        isValidToken(accessToken, accessTokenExpireAt) &&
        refreshToken &&
        accessTokenExpireAt &&
        refreshTokenExpireAt
      ) {
        setSession({ accessToken, refreshToken, accessTokenExpireAt, refreshTokenExpireAt });
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        const res = await RefreshToken();
        if (res?.accessToken || res?.token) {
          setSession({
            accessToken: res.accessToken || res.token,
            refreshToken: res.refreshToken,
            accessTokenExpireAt: res.accessTokenExpireAt,
            refreshTokenExpireAt: res.refreshTokenExpireAt,
          });
          sessionStorage.setItem(USER_KEY, JSON.stringify(res));
        } else {
          dispatch({
            type: Types.INITIAL,
            payload: {
              user: null,
            },
          });
        }
      }
    } catch (error) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const credentials = {
      email,
      password,
    };
    try {
      const res = await LoginWithEmail(credentials);
      if (!res.error) {
        const {
          accessToken,
          refreshToken,
          accessTokenExpireAt,
          refreshTokenExpireAt,
          name,
          id,
          email: userEmail,
          phoneNumber,
          role,
          completeTeacherProfile,
        } = res;
        setSession({ accessToken, refreshToken, accessTokenExpireAt, refreshTokenExpireAt });
        sessionStorage.setItem(USER_KEY, JSON.stringify(res));
        Cookie.set(USER_KEY, name ?? '');

        dispatch({
          type: Types.LOGIN,
          payload: {
            user: {
              id,
              name,
              email: userEmail,
              phoneNumber,
              role,
              completeTeacherProfile,
              accessToken,
            },
          },
        });
      } else {
        return res;
      }
    } catch (error) {
      return {
        error,
      };
    }
  }, []);

  const logout = useCallback(async () => {
    // Clear all auth cookies
    Cookie.remove(ACCESS_TOKEN);
    Cookie.remove('refreshToken');
    Cookie.remove('accessTokenExpireAt');
    Cookie.remove('refreshTokenExpireAt');
    Cookie.remove(USER_KEY);
    Cookie.remove('companies');

    // Clear sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }

    // Clear session using setSession
    setSession({
      accessToken: null,
      refreshToken: null,
      accessTokenExpireAt: null,
      refreshTokenExpireAt: null,
    });

    // Clear axios default header
    delete axios.defaults.headers.common.Authorization;

    // Dispatch logout action
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      login,
      logout,
    }),
    [login, logout, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
