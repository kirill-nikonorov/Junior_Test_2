import {combineReducers} from "redux"

import {SAVE_INDUSTRIES, SAVE_SUB_INDUSTRIES} from "../constants/constants";

const industriesReduser = (state = {}, action) => {
    switch (action.type) {
        case SAVE_INDUSTRIES :
            return Object.assign({}, state, action.industries);
        default:
            return state;
    }
};
const subIndustriesReducer = (state = {}, action) => {
    switch (action.type) {
        case SAVE_SUB_INDUSTRIES :
            const subIndustries = Object.assign({}, state);
            subIndustries[action.industryId] = action.subIndustries;
            return subIndustries;
        default:
            return state;
    }
};

const companyTypesReducer = combineReducers({
    industries: industriesReduser,
    subIndustries: subIndustriesReducer,
});

export default companyTypesReducer;
