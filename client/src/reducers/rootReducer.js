import {combineReducers} from "redux"
import {reducer as formReducer} from "redux-form"

import {AUTH_USER} from "../constants/constants";
import companyTypesReducer from "./companyTypesReducer"

export const getTokenFromLocalStorage = () => {
    return "токен изначально"
};

const tokenReducer = (state = getTokenFromLocalStorage(), action) => {
    switch (action.type) {
        case AUTH_USER :
            return "токен новый";
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    token: tokenReducer,
    companyTypes: companyTypesReducer ,
    form: formReducer
});

export default rootReducer;
