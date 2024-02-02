/// <reference types="react-scripts" />
declare module 'react/jsx-runtime' {
  export default any;
}

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY: String;
  }
}
