import {css, keyframes} from  '@emotion/css'

const fadeOut = keyframes`
  0% {
    opacity:1;
  }
  100% {
    opacity:0;
  }
`

export const loaderStyles = css`
  animation: ${fadeOut} ease 1.5s;

  background-color: hsl(218, 100%, 90%);
  height: 100vh;
  width: 100vw;
  display: grid;
  place-content: center;
  
  img {
    height: 20vh;
    width: 20vw;
  }
`
