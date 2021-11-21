import {
    css,
    FlattenInterpolation,
    FlattenSimpleInterpolation,
    ThemeProps,
} from "styled-components";

export const ellipsis = css`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `;

export const absView = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `;

export const absCenter = css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  `;

export const ContentInCenter = css`
    display: flex;
    align-items: center;
    justify-content: center;
  `;

export const MediaHover = (
    cssStyles: FlattenInterpolation<ThemeProps<any>>
) => {
    return css`
      @media (hover: hover) {
        ${cssStyles}
      }
    `;
};

export const mediaMobile = (cssStyles: FlattenSimpleInterpolation) => {
    return css`
      @media (max-width: 768px) {
        ${cssStyles}
      }
    `;
};

export const mediaMobileV = (cssStyles: FlattenSimpleInterpolation) => {
    return css`
      @media (max-width: 768px) and (orientation: portrait) {
        ${cssStyles}
      }
    `;
};

export const mediaMobileH = (cssStyles: FlattenSimpleInterpolation) => {
    return css`
      @media (max-height: 768px) and (max-width: 812px) and (orientation: landscape) {
        ${cssStyles}
      }
    `;
};

export const mediaMobileVerticalHide = mediaMobileV(
    css`
      display: none;
    `
);

export default mediaMobile;
