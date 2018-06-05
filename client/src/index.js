import {render} from "react-dom";
import React from "react";
import ReduxThunk from 'redux-thunk'
import {createStore, applyMiddleware} from "redux";
import {BrowserRouter as Router} from 'react-router-dom';


import rootReducer from "./reducers/rootReducer";
import Root from "./containers/Root"

let store = createStore(rootReducer, applyMiddleware(ReduxThunk));

/*let a = setInterval(() => {
    console.log(store.getState())
}, 3000);*/
/*
let a = setInterval(() => {
    console.log(store.getState().companyTypes.subIndustries)
}, 3000);
*/

render(
    <Router>
        <Root store={store}/>
    </Router>
,
document.getElementById("root"));

if (module.hot) {
    module.hot.accept();
}