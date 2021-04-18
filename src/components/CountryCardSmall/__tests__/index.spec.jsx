import React from  'react'
import {render,screen} from '@testing-library/react'
import {CountryCardSmall} from '../index'


describe('CountryCardSmall',()=>{
  test('renders correctly with alt text',()=>{
    const props = {src: 'https://fake-cdn.com/argentina-flag.svg', alt:'ARG', countryName: 'Argentina'}
    render(<CountryCardSmall {...props} />)
    expect(screen.getByAltText('ARG')).toBeInTheDocument()
  })
})