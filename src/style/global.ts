import Reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${Reset}
  /* 1rem = 100px */
  html{
    font-size: 100px;
    /* font-size: calc(100vw / (1920 / 100)); */
    height: 100%;
    -webkit-tap-highlight-color:rgba(0,0,0,0); 
  }
  html {
    font-size: 16px;
  }

  @media screen and (min-width: 375px) {
      html {
          /* iPhone6的375px尺寸作为16px基准，414px正好18px大小, 600 20px */
          font-size: calc(100% + 2 * (100vw - 375px) / 39);
          font-size: calc(16px + 2 * (100vw - 375px) / 39);
      }
  }
  @media screen and (min-width: 414px) {
      html {
          /* 414px-1000px每100像素宽字体增加1px(18px-22px) */
          font-size: calc(112.5% + 4 * (100vw - 414px) / 586);
          font-size: calc(18px + 4 * (100vw - 414px) / 586);
      }
  }
  @media screen and (min-width: 600px) {
      html {
          /* 600px-1000px每100像素宽字体增加1px(20px-24px) */
          font-size: calc(125% + 4 * (100vw - 600px) / 400);
          font-size: calc(20px + 4 * (100vw - 600px) / 400);
      }
  }
  @media screen and (min-width: 1000px) {
      html {
          /* 1000px往后是每100像素0.5px增加 */
          font-size: calc(137.5% + 6 * (100vw - 1000px) / 1000);
          font-size: calc(22px + 6 * (100vw - 1000px) / 1000);
      }
  }
  body{
    margin: 0;
    height: 100%;
    user-select: none;
  }
  a{
    text-decoration: none;
    color: #666;
    transition: color .3s;
    &:visited{
      color: #666;
    }
  }
  div{
    word-break: break-word;
  }
  ul,ol,li{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  ::-webkit-scrollbar{width:5px;height:5px}
  ::-webkit-scrollbar-track-piece{border-radius:3px;background:#efefef}
  ::-webkit-scrollbar-thumb{border-radius:3px;background:#aaa;}

`;

export default GlobalStyle;
