// src/style/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

import HakgyoB from '../assets/fonts/Hakgyoansim-Allimjang-TTF-B_1.woff';
import HakgyoR from '../assets/fonts/Hakgyoansim-Allimjang-TTF-R_1.woff';
import PayboocBold from '../assets/fonts/paybooc-Bold.woff';
import PayboocExtraBold from '../assets/fonts/paybooc-ExtraBold.woff';
import PayboocLight from '../assets/fonts/paybooc-Light.woff';
import PayboocMedium from '../assets/fonts/paybooc-Medium.woff';

const GlobalStyle = createGlobalStyle`
  /* 폰트 등록 */
  @font-face {
    font-family: 'Hakgyoansim-Allimjang-B';
    src: url(${HakgyoB}) format('woff');
  }
  @font-face {
    font-family: 'Hakgyoansim-Allimjang-R';
    src: url(${HakgyoR}) format('woff');
  }
  @font-face {
    font-family: 'paybooc-Bold';
    src: url(${PayboocBold}) format('woff');
  }
  @font-face {
    font-family: 'paybooc-ExtraBold';
    src: url(${PayboocExtraBold}) format('woff');
  }
  @font-face {
    font-family: 'paybooc-Light';
    src: url(${PayboocLight}) format('woff');
  }
  @font-face {
    font-family: 'paybooc-Medium';
    src: url(${PayboocMedium}) format('woff');
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.background};
    font-family: 'paybooc-Light', sans-serif;
    color: ${({ theme }) => theme.colors.text};
  }

  button {
    font-family: 'paybooc-Light', sans-serif;
  }
`;

export default GlobalStyle;
