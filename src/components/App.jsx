import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

import { CountryCardList } from './CountryCardList';
import { CountryCardLarge } from './CountryCardLarge';
import rootReducer from '../redux/store';

const ROUTES = {
  view_all: '*',
  view_county: '/country/:slug',
};

class App extends Component {
  render() {
    return (
      <Provider store={rootReducer}>
        <Router>
          <Routes>
            <Route path={ROUTES.view_county} element={<CountryCardLarge />} />
            <Route path={ROUTES.view_all} element={<CountryCardList />} />
          </Routes>
        </Router>
      </Provider>
    );
  }
}

export default App;
