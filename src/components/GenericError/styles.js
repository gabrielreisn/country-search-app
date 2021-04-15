import {css} from '@emotion/css'

export const ErrorStyle = css`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: hsl(218, 100%, 98%);

    h2 {
      font-family: 'Ruda', Sans-Serif;
      font-size: 2rem;
      text-align: center;
    }

    svg {
      width: 3rem;
      height: 5rem;
      
      path {
        fill: hsl(218, 100%, 45%);
      }
    }
`
