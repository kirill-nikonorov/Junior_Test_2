import {createSymbiote} from 'redux-symbiote'

export const {actions, reducer} = createSymbiote({}, {
    saveToken: (state, token) => {
        return token;
    }
});


