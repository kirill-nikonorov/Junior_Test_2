import {combineReducers} from "redux"
import {reducer as formReducer} from "redux-form"

import {SAVE_TOKEN, AUTH_USER} from "../constants/constants";
import companyTypesReducer from "./companyTypesReducer"

export const getTokenFromLocalStorage = () => {
    return "токен изначально"
};

const tokenReducer = (state = getTokenFromLocalStorage(), action) => {
    switch (action.type) {
        case SAVE_TOKEN :
            return action.token;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    token: tokenReducer,
    companyTypes: companyTypesReducer,
    form: formReducer
});

export default rootReducer;
