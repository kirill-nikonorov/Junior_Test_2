import fetch from './fetch';

const get = (url, config = {}) => {
    const baseUrl = 'https://qa-api.konnex.us/user/';

    return fetch({url: `${baseUrl}${url}`, ...config});
};

export default {
    postNewUser: data => get('register/', {data: data, method: 'POST'}),
    postNewIndividualUser: data => get('register-individual/', {data: data, method: 'POST'}),

    authUser: data => get('auth/', {data: data, method: 'POST'}),
    confirmRegistration: data =>
        get('register-confirm-by-username/', {
            data: data,
            method: 'POST'
        }),
    resendConfirmationCode: data => get('resend-registration-code/', {data: data, method: 'POST'})
};
