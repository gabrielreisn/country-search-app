import { css } from '@emotion/css';

export const cardStyles = css`
  width: 11rem;
  height: 2rem;
  border: 1px solid hsl(218, 100%, 45%);
  background-color: hsl(218, 100%, 98%);
  border-radius: 10px;
  margin: 0.4rem;

  padding: 1rem 0.8rem;
  display: flex;
  align-items: center;
  color: hsl(218, 100%, 45%);

  font-family: 'Ruda', Sans-Serif;

  img {
    width: 2rem;
    border-radius: 3px;
    margin-right: 0.6rem;
  }
`;