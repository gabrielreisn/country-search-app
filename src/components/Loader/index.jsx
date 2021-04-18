import React from 'react'
import {loaderStyles} from './styles'

const Loader = () => (
  <div className={loaderStyles} data-testid='loader'>
    <img src='http://samherbert.net/svg-loaders/svg-loaders/tail-spin.svg' />
  </div>
)

export default Loader