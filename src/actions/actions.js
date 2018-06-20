import * as types from "../constants/constants"
import axios from "axios"
import {notification} from "antd/lib/index";

export const fetchIndustries = () => (dispath) => {
    axios.get('http://doc.konnex.us/industries/', {
        params: {
            page_size: 100
        }
    })
        .then((responce) => {
            dispath(saveIndustries(responce.data.results))
        })
        .catch((error) => {
            console.log(error)
        });
};
export const fetchSubIndustries = (industryId) => (dispath) => {
    axios.get(`http://doc.konnex.us/industries/${industryId}/sub_industries/`,
        {
            params: {
                page_size: 100
            }
        })
        .then((responce) => {
            dispath(saveSubIndustries(responce.data.results, industryId))
        })
        .catch((error) => {
            console.log(error)
        });

};

export const postNewUser = (data, onSuccess) => (dispatch) => {
    postData("http://doc.konnex.us/user/register/", data, onSuccess);
};
/*export const postNewIndividualUser = (data, onSuccess) => () => {
    postData("http://doc.konnex.us/user/register-individual/", data, onSuccess);
};*/

export const postNewCompany = (data, onSuccess) => () => {
    axios.post("http://doc.konnex.us/public/companies/", data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
        .then((responce) => {
            console.log(responce);
            onSuccess(responce.data.id)
        })
        .catch(({response, request, message}) => {

            if (response) {
                const {data, status} = response;
                showErrorNotification(status, data);

            } else if (request) {
                console.log(request);
                showErrorNotification('', request);
            } else {
                showErrorNotification('', message);
                console.log('Error', message);

            }
        });
};
export const authUser = (data, onSuccess) => (dispath) => {
    axios.post("http://doc.konnex.us/user/auth/", data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
        .then(({data: {token}}) => {
            dispath(saveToken(token));
            onSuccess()
        })
        .catch(({response, request, message}) => {
            if (response) {
                const {data, status} = response;
                showErrorNotification(status, data);

            } else if (request) {
                console.log(request);
                showErrorNotification('', request);
            } else {
                showErrorNotification('', message);
                console.log('Error', message);

            }
        });
};
export const confirmRegistration = (data, onSuccess) => (dispath) => {
    axios.post("http://doc.konnex.us/user/register-confirm-by-username/", data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
        .then(({data: {token}}) => {
            dispath(saveToken(token));
            onSuccess(token)
        })
        .catch(({response, request, message}) => {
            if (response) {

                const {data, status} = response;
                if (status === 500 && isAssertionError(data))
                    handleAssertionError();
                else
                    showErrorNotification(status, data);

            } else if (request) {
                console.log(request);
                showErrorNotification('', request);
            } else {
                showErrorNotification('', message);
                console.log('Error', message);

            }
        });

};


export const postNewIndividualUser = (data, onSuccess) => () => {
    postData("http://doc.konnex.us/user/register-individual/", data, onSuccess);
};

const postData = (url, data, onSuccess) => {
    axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
        .then((response) => {
            onSuccess(response)
        })
        .catch(({response, request, message}) => {

            if (response) {
                const {data, status} = response;
                console.log(data);
                showErrorNotification(status, data);

            } else if (request) {
                console.log(request);
                showErrorNotification('', request);
            } else {
                showErrorNotification('', message);
                console.log(message);

                console.log('Error', message);
            }
        });
};

const saveIndustries = (industries) => ({
    type: types.SAVE_INDUSTRIES,
    industries
});
const saveSubIndustries = (subIndustries, industryId) => {
    return {
        type: types.SAVE_SUB_INDUSTRIES,
        subIndustries,
        industryId
    };
};
const isAssertionError = (string) => {
    let errorType = string.split(' ');
    return errorType[0] = "AssertionError";
};
const handleAssertionError = () => {
    console.log("AssertionError");
    showErrorNotification(500, {detail: "not found"})
};
const saveToken = (token) => ({
    type: types.SAVE_TOKEN,
    token
});

export const showErrorNotification = (status = "0", data) => {
    /*    console.log("notification , status = ", status);
        console.log("notification , data = ", data);*/

    let problems = [];
    if (!(data instanceof Object) || Array.isArray(data)) problems = data;
    else {
        Object.keys(data).map((prop) => {
            problems.push(`${prop} : ${data[prop]} \n`)
        })
    }

    // console.log(problems);

    notification["error"]({
        duration: 2,
        message: status,
        description: problems
    });
};

