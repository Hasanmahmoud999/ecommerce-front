import { css } from "styled-components";
// Breakpoints (max-width for desktop-first approach)
const breakpoints = {
  xs: "380px",
  mobile: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};
// Media query helper - generates CSS for smaller screens (max-width)
export const mobile = (props) => {
  return css`
    @media only screen and (max-width: ${breakpoints.mobile}) {
      ${props}
    }
  `;
};
export const sm = (props) => {
  return css`
    @media only screen and (max-width: ${breakpoints.sm}) {
      ${props}
    }
  `;
};
export const md = (props) => {
  return css`
    @media only screen and (max-width: ${breakpoints.md}) {
      ${props}
    }
  `;
};
export const lg = (props) => {
  return css`
    @media only screen and (max-width: ${breakpoints.lg}) {
      ${props}
    }
  `;
};
export const minmd = (props) => {
  return css`
    @media only screen and (min-width: 853px) {
      ${props}
    }
  `;
};
export const maxMd = (props) => {
  return css`
    @media only screen and (max-width: 853px) {
      ${props}
    }
  `;
};
export const minLg = (props) => {
  return css`
    @media only screen and (min-width: 1024px) {
      ${props}
    }
  `;
};
export const maxLg = (props) => {
  return css`
    @media only screen and (max-width: 1023px) {
      ${props}
    }
  `;
};
export const xs = (props) => {
  return css`
    @media only screen and (max-width: ${breakpoints.xs}) {
      ${props}
    }
  `;
};
export const xl = (props) => {
  return css`
    @media only screen and (max-width: ${breakpoints.xl}) {
      ${props}
    }
  `;
};
// Min-width helpers for larger screens
export const minMd = (props) => {
  return css`
    @media only screen and (min-width: ${breakpoints.md}) {
      ${props}
    }
  `;
};
export default { mobile, sm, md, lg, xs, xl };
