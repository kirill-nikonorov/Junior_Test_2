import axios from 'axios';

export default config => {
    const axiosConfig = config || {};

    const token = JSON.parse(localStorage.getItem('redux')).token;

    axiosConfig.headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Token ${token}`
    };

    axiosConfig.method = axiosConfig.method || 'GET';

    return axios(axiosConfig);
};
