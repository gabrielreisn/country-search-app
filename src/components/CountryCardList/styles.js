import {css} from '@emotion/css'

export const pageStyles = css`

.search-box {
  display: grid;
  place-content: center;
  height: 10vh;

  position: sticky;
  top: 0;

  input {
    font-family: 'Ruda', Sans-Serif;
    width: 40vw;
    height: 5vh;
    padding: 0 1rem;
    border-radius: 10px;
    border: 1px solid hsl(218, 100%, 45%);

    &:focus {
      outline-color: hsl(218, 100%, 40%);
    }
  }
}

section {
  display:flex;
  flex-wrap: wrap;
  justify-content: center;

  a {
    text-decoration-line: none;
  }
}
`