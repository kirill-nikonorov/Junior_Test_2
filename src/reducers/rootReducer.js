import {combineReducers} from "redux"
import {reducer as formReducer} from "redux-form"

import {SAVE_TOKEN, SAVE_ACCOUNT_CREDENTIALS} from "../constants/constants";
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
const accountsReducer = (state = {}, action) => {
    switch (action.type) {
        case SAVE_ACCOUNT_CREDENTIALS :
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    token: tokenReducer,
    accounts: accountsReducer,
    companyTypes: companyTypesReducer,
    form: formReducer
});

export default rootReducer;
