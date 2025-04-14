import { createGlobalStyle } from 'styled-components';
import payboocBold from '@/assets/fonts/paybooc-Bold.woff';
import payboocExtraBold from '@/assets/fonts/paybooc-ExtraBold.woff';
import payboocLight from '@/assets/fonts/paybooc-Light.woff';
import payboocMedium from '@/assets/fonts/paybooc-Medium.woff';
import HakgyoansimBold from '@/assets/fonts/Hakgyoansim-Allimjang-TTF-B_1.woff';
import HakgyoansimRegular from '@/assets/fonts/Hakgyoansim-Allimjang-TTF-R_1.woff';

const GlobalStyle = createGlobalStyle`
    // height: 100dvh;

    @font-face {
        font-family: "hakgyo";
        src: local('Hakgyoansim Allimjang'), url(${HakgyoansimBold}) format('woff');
        font-weight: bold; // 700
    }
    @font-face {
        font-family: "hakgyo";
        src: local("Hakgyoansim Allimjang"), url(${HakgyoansimRegular}) format('woff');
        font-weight: normal; // 400
    }
    @font-face {
        font-family: "paybooc";
        src: local('paybooc'), url(${payboocLight}) format('woff');
        font-weight: 100; // Thin
    }
    @font-face {
        font-family: "paybooc";
        src: local('paybooc'), url(${payboocMedium}) format('woff');
        font-weight: normal; // 400
    }
    @font-face {
        font-family: "paybooc";
        src: local("paybooc"), url(${payboocBold}) format('woff');
        font-weight: 700; // Bold
    }
    @font-face {
        font-family: "paybooc";
        src: local('paybooc'), url(${payboocExtraBold}) format('woff');
        font-weight: 800; // ExtraBold
    }
`;

export default GlobalStyle;
