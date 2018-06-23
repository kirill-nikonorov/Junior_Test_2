import {createSymbiote} from 'redux-symbiote'

export const {actions, reducer} = createSymbiote({}, {
    saveToken: (state, token) => {
        console.log(token);
        return {...state, token: token}
    }
});


