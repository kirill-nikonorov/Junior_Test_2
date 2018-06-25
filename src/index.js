import {render} from 'react-dom';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';

let store = configureStore();

/*
setInterval(() => {
    console.log(store.getState())
}, 4000);
*/

render(
    <Router>
        <Root store={store} />
    </Router>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
