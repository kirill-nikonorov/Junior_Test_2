import axios from 'axios';

export default config => {
    const axiosConfig = config || {};

    const headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    };

    const token = JSON.parse(localStorage.getItem('redux')).token;
    if (token) headers.Authorization = `Token ${token}`;

    axiosConfig.headers = headers;
    axiosConfig.method = axiosConfig.method || 'GET';

    return axios(axiosConfig);
};
//Authorization: `Token ${token}`
