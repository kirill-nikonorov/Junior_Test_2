import fetch from './fetch';

const get = (url, config = {}) => {
    const baseUrl = 'https://qa-api.konnex.us/';

    config.params = {page_size: 100};
    return fetch({url: `${baseUrl}${url}`, ...config});
};

export default {
    getIndustries: () => get('industries/'),
    getSubIndustries: industryId => get(`industries/${industryId}/sub_industries/`),

    postNewCompany: data => get('public/companies/', {data: data, method: 'POST'})
};
