import CryptoJS from 'crypto-js';
const KEY = process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY;

export const encrypt = (value: string) => {
  return CryptoJS.AES.encrypt(value, KEY).toString();
};

export const decrypt = (value: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(value, KEY);

    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error(error);
    return '';
  }
};
