import axios from "axios" ;
import {showErrorNotification} from "../service";

export default (config) => {

    const axiosConfig = config || {};

    axiosConfig.headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    };

    axiosConfig.method = axiosConfig.method || 'GET';

    return axios(axiosConfig)
        .then(response => {
            console.log("responce = ", response)
            return response;
        })
        .catch(({response, request, message}) => {
            if (response) {
                const {data, status} = response;

                if (status === 500 && isAssertionError(data))
                    handleAssertionError();
                else showErrorNotification(status, data);

            } else if (request) {
                console.log(request);
                showErrorNotification('', request);
            } else {
                showErrorNotification('', message);
                console.log('Error', message);
            }
        })
};


const isAssertionError = (string) => {
    let errorType = string.split(' ');
    return errorType[0] = "AssertionError";
};
const handleAssertionError = () => {
    console.log("AssertionError");
    showErrorNotification(500, {detail: "not found"})
};


/*export default (url, options) => {
    const fetchOptions = options || {};
    fetchOptions.credentials = 'same-origin';
    fetchOptions.headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    };

    fetchOptions.method = fetchOptions.method || 'POST';

    if (fetchOptions.body && typeof (fetchOptions.body) !== 'string') {
        fetchOptions.body = JSON.stringify(fetchOptions.body);
    }

    return fetch(`${url}`, fetchOptions)
        .then((response) => {
            if (response.status >= 400) {
                return {};
            }
            return response.json();
        })
        .then(response => response.view)
        .catch((err) => {
            console.log(err);
            return {};
        });
};*/

