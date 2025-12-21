import { useLocale } from 'next-intl';

export function getNameKeyLang(): 'name_en' | 'name_ar' {
  const local = useLocale();
  return local === 'en' ? 'name_en' : 'name_ar';
}

export function getCustomNameKeyLang(enKey:string,arKey:string){
  const local = useLocale();
  return local === 'en' ? enKey : arKey;
}


// eslint-disable-next-line consistent-return
export const showErrorMessage: (err: any) => string = (err: any) => {
  if (
    (err?.response?.data?.message?.message || err?.response?.data?.message?.Message) &&
    typeof err?.response?.data?.message?.message === 'string'
  ) {
    return err?.response?.data?.message?.message || err?.response?.data?.message?.Message;
  // eslint-disable-next-line no-else-return
  } else if (err?.response?.status === 403) {
    return `${err?.response?.data?.message  }, Not allowed`;
  } else if (err?.response?.status === 400 || err?.response?.status === 422) {
    if (
      (err?.response?.data?.message?.message || err?.response?.data?.message?.Message) &&
      typeof err?.response?.data?.message?.message === 'string'
    ) {
      return err?.response?.data?.message?.message || err?.response?.data?.message?.Message;
    } if (
      err?.response?.data?.message?.message &&
      typeof err?.response?.data?.message?.message === 'object'
    ) {
      return err?.response?.data?.message?.message[0];
    } if (
      (err?.response?.data?.message || err?.response?.data?.Message) &&
      (typeof err?.response?.data?.message === 'string' ||
        typeof err?.response?.data?.Message === 'string')
    ) {
      return err?.response?.data?.message || err?.response?.data?.Message;
    }
  } else if (err?.response?.status === 500) {
    return err?.response?.data?.message;
  } else {
    return 'unknown error occurred';
  }
};
export function parseJwt(token: string): { [key: string]: any } {
    const base64Url = token.split('.')[1]; // Get payload part
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
  export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // eslint-disable-next-line no-bitwise
      const r = (Math.random() * 16) | 0; const  v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
