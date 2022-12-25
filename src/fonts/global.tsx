import { createGlobalStyle } from "styled-components";

import NanumSquareNeoLight from "./._NanumSquareNeoTTF-aLt.woff2";
import NanumSquareNeoRegular from "./._NanumSquareNeoTTF-bRg.woff2";
import NanumSquareNeoBold from "./._NanumSquareNeoTTF-cBd.woff2";
import NanumSquareNeoExtraBold from "./._NanumSquareNeoTTF-dEb.woff2";
import NanumSquareNeoHeavy from "./._NanumSquareNeoTTF-eHv.woff2";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "NanumSquareNeoLight";
    src: local("NanumSquareNeoLight"), local("NanumSquareNeoLight");
    font-style: normal;
    src: url(${NanumSquareNeoLight}) format("truetype");
  }
  @font-face {
    font-family: "NanumSquareNeoRegular";
    src: local("NanumSquareNeoRegular"), local("NanumSquareNeoRegular");
    font-style: normal;
    src: url(${NanumSquareNeoRegular}) format("truetype");
  }
  @font-face {
    font-family: "NanumSquareNeoBold";
    src: local("NanumSquareNeoBold"), local("NanumSquareNeoBold");
    font-style: normal;
    src: url(${NanumSquareNeoBold}) format("truetype");
  }
  @font-face {
    font-family: "NanumSquareNeoExtraBold";
    src: local("NanumSquareNeoExtraBold"), local("NanumSquareNeoExtraBold");
    font-style: normal;
    src: url(${NanumSquareNeoExtraBold}) format("truetype");
  }
  @font-face {
    font-family: "NanumSquareNeoHeavy";
    src: local("NanumSquareNeoHeavy"), local("NanumSquareNeoHeavy");
    font-style: normal;
    src: url(${NanumSquareNeoHeavy}) format("truetype");
  }
`;

export default GlobalStyle;
