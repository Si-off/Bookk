import secureLocalStorage from 'react-secure-storage';
import { useUserStore } from 'store/useUserStore';
import { StorageKeys } from 'constant';
import { decrypt, encrypt } from './crypto';

type TokenType = 'refreshToken' | 'accessToken';

export const getToken = (type: TokenType) => {
  const { accessToken } = useUserStore.getState();

  let token;

  switch (type) {
    case 'accessToken':
      return accessToken;

    case 'refreshToken':
      token = secureLocalStorage.getItem(decrypt(StorageKeys.REFRESH_TOKEN));
      return token;

    default:
      break;
  }
};

export const setToken = (type: TokenType, value: string) => {
  const { setAccessToken } = useUserStore.getState();

  switch (type) {
    case 'accessToken':
      setAccessToken(value);
      break;

    case 'refreshToken':
      secureLocalStorage.setItem(encrypt(StorageKeys.REFRESH_TOKEN), value);
      break;

    default:
      break;
  }
};

export const removeToken = (token: TokenType) => {
  const { setAccessToken } = useUserStore.getState();

  switch (token) {
    case 'accessToken':
      setAccessToken('');
      break;

    case 'refreshToken':
      secureLocalStorage.removeItem(StorageKeys.REFRESH_TOKEN);
      break;

    default:
      break;
  }
};
