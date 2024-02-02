import CryptoJS from 'crypto-js';
const KEY = process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY;

export const encrypt = (value: string) => {
  if (!KEY) return '';

  return CryptoJS.AES.encrypt(value, KEY).toString();
};

export const decrypt = (value: string) => {
  if (!KEY) return '';
  const bytes = CryptoJS.AES.decrypt(value, KEY);

  return bytes.toString(CryptoJS.enc.Utf8);
};
