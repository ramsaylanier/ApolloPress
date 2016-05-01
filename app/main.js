import 'babel-polyfill';
import '../scripts/scrollToPlugin.js';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-apollo';
import { client } from './apollo';

import {
  Router,
  Route,
  Link,
  browserHistory,
  IndexRedirect,
} from 'react-router';

import routes from './routes';

render(
  <Provider client={client}>
    <Router history={browserHistory} routes={routes}></Router>
  </Provider>,
  document.getElementById('root')
)
