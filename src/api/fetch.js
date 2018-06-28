import axios from 'axios';

export default config => {
    const axiosConfig = config || {};

    axiosConfig.headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    };

    axiosConfig.method = axiosConfig.method || 'GET';

    return axios(axiosConfig).then(response => {
        console.log('responce = ', response);
        return response;
    });
};
