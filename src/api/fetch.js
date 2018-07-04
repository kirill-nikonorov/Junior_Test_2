import axios from 'axios';

export default config => {
    const axiosConfig = config || {};

    const headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    };

    const reduxItem = JSON.parse(localStorage.getItem('redux'));
    if (reduxItem && reduxItem.token) headers.Authorization = `Token ${reduxItem.token}`;


    axiosConfig.headers = headers;
    axiosConfig.method = axiosConfig.method || 'GET';

    return axios(axiosConfig);
};
//Authorization: `Token ${token}`
