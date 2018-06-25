import fetch from './fetch';

const get = (url, config = {}) => {
    const baseUrl = 'https://qa-api.konnex.us/';

    return fetch({url: `${baseUrl}${url}`, ...config});
};

export default {
    postNewUser: data => get('user/register/', {data: data, method: 'POST'}),
    postNewIndividualUser: data => get('user/register-individual/', {data: data, method: 'POST'}),

    authUser: data => get('user/auth/', {data: data, method: 'POST'}),
    confirmRegistration: data =>
        get('user/register-confirm-by-username/', {
            data: data,
            method: 'POST'
        })
};
