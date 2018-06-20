import {render} from "react-dom";
import React from "react";
import ReduxThunk from 'redux-thunk'
import {createStore, applyMiddleware} from "redux";
import {BrowserRouter as Router,} from 'react-router-dom';

import rootReducer from "./reducers/rootReducer";
import Root from "./containers/Root"

let store = createStore(rootReducer, applyMiddleware(ReduxThunk));

/* setInterval(() => {
    console.log(store.getState())
}, 4000);*/


render(
    <Router>
        <Root store={store}/>
    </Router>
    ,
    document.getElementById("root"));

if (module.hot) {
    module.hot.accept();
}