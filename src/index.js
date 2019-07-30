import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { render } from 'react-dom';
import './index.css';
// import App from './App';
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import  routes  from './_routes'
import { store } from './_store'
import { history } from './_helpers'


render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
