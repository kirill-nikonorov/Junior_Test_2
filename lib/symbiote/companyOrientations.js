import {createSymbiote} from 'redux-symbiote'


export const {actions, reducer} = createSymbiote({industries: {}, subIndustries: {}}, {
    industries: {
        saveIndustries: (state, data) => ({...state, industries: {...state.industries, ...data}})
    },
    subIndustries: {
        saveSubIndustries: (state, data, industryId) => ({
            ...state,
            subIndustries: {...state.subIndustries, [industryId]: data}
        })
    },
});


