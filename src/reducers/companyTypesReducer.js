import {combineReducers} from "redux"

import {FETCH_INDUSTRIES, FETCH_SUB_INDUSTRIES} from "../constants/constants";

const industriesReduser = (state = [], action) => {
    switch (action.type) {
        case FETCH_INDUSTRIES :
            return action.industries;
        default:
            return state;
    }
};
const subIndustriesReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_SUB_INDUSTRIES :
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
