import {css} from '@emotion/css'

export const largeCardStyle = css`
height: 100vh;
display: grid;
place-content: center;
background-color: hsl(218, 100%, 98%);

section {
  max-height: 90vh;
  width: 32vw;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: -2px 2px 10px 0px rgb(0 0 0 / 40%);
  background-color: white;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  min-height: 28vh;


  img {
    width: 100%;
    max-height: 30vh;
    border-radius: 10px 10px 0 0;
  }
}

.card-body {
  padding: 1rem;

  h1,h2,h3,span {
    font-family: 'Ruda', Sans-Serif;
  }

  h2 {
    font-size: 1.5rem;
  }

  h6 {
    font-family: 'Roboto Mono',monospace;
    font-size: 0.7rem;
    font-weight: bold;
    margin: 0.4rem 0;
    color: #666;
  }
}
`