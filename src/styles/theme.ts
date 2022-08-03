import { css, DefaultTheme, keyframes } from "styled-components";

const animation = keyframes`
  from {
    opacity: 0;
    transform: translateY(0);
  }
  to {
    opacity: 1;
    transform: translateY(-12px);
  }
`;

export const skeleton = keyframes`
  0% {
        background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
        background-color: rgba(165, 165, 165, 0.3);
    }

    100% {
        background-color: rgba(165, 165, 165, 0.1);
    }

`;

const defaultAnimation = css`
  animation-duration: 0.7s;
  animation-name: ${animation};
  animation-fill-mode: forwards;
`;

export const theme: DefaultTheme = { defaultAnimation };
