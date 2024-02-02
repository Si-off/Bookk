import CryptoJS from 'crypto-js';

const SALT = process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY;

const parseUTF8 = (str: string) => {
  return CryptoJS.enc.Utf8.parse(str);
};

export const encrypt = (value: string) => {
  if (!SALT) return '';

  return CryptoJS.AES.encrypt(value, SALT).toString();
};

export const decrypt = (value: string) => {
  if (!SALT) return '';
  const bytes = CryptoJS.AES.decrypt(value, SALT).toString(CryptoJS.enc.Utf8);

  return bytes;
};
