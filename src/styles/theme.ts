import { DefaultTheme } from 'styled-components';

export const styledOptions = {
  colors: {},
  fonts: {},
} as const;

const theme: DefaultTheme = { ...styledOptions };

export default theme;
