import { DefaultTheme, css } from 'styled-components';
import { styledOptions } from './../styles/theme';

type Key = keyof typeof styledOptions;

const getStyleColor = <T extends Key, P extends keyof DefaultTheme[T]>(key: T, subKey: P) => {
  return css`
    ${({ theme }) => theme[key][subKey] ?? ''}
  `;
};

export default getStyleColor;
