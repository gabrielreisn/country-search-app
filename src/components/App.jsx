import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const ROUTES = {
  view_all: '/',
  view_county: '/country/:slug',
};

import { CountryCardList } from './CountryCardList';
import { CountryCardLarge } from './CountryCardLarge';
import rootReducer from '../helpers/store';

class App extends Component {
  render() {
    return (
      <Provider store={rootReducer}>
        <Router>
          <Switch>
            <Route path={ROUTES.view_county}>
              <CountryCardLarge />
            </Route>
            <Route path={ROUTES.view_all}>
              <CountryCardList />
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
