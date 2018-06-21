import axios from "axios"
import {notification} from "antd/lib/index";
import {actions as companyOrientationsActions} from "../../lib/symbiote/companyOrientations"
import {actions as tokenActions} from "../../lib/symbiote/token"

export const fetchIndustries = () => (dispath) => {
    const data = {params: {page_size: 100}};
    makeRequest("get", `http://doc.konnex.us/industries/`, data
        , ({data: {results}}) => {
            dispath(companyOrientationsActions.industries.saveIndustries(results))
        });
};
export const fetchSubIndustries = (industryId) => (dispath) => {
    const data = {params: {page_size: 100}};
    makeRequest("get", `http://doc.konnex.us/industries/${industryId}/sub_industries/`, data
        , ({data: {results}}) => {
            dispath(companyOrientationsActions.subIndustries.saveSubIndustries(results, industryId))
        });
};

export const postNewUser = (data, onSuccess) => () => {
    makeRequest("post", " http://doc.konnex.us/user/register/", data, onSuccess);
};
export const postNewIndividualUser = (data, onSuccess) => () => {
    makeRequest("post", "http://doc.konnex.us/user/register-individual/", data, onSuccess);
};
export const postNewCompany = (data, onSuccess) => () => {
    makeRequest("post", "http://doc.konnex.us/public/companies/", data, ({data: {id}}) => {
        onSuccess(id)
    });
};
export const authUser = (data, onSuccess) => (dispath) => {
    makeRequest("post", "http://doc.konnex.us/user/auth/", data, ({data: {token}}) => {
        showSuccessNotification("success authorization");
        dispath(tokenActions.saveToken(token));
        onSuccess()
    });
};
export const confirmRegistration = (data, onSuccess) => (dispath) => {
    makeRequest("post", "http://doc.konnex.us/user/register-confirm-by-username/", data, ({data: {token}}) => {
        showSuccessNotification("success confirmation");
        dispath(tokenActions.saveToken(token));
        onSuccess()
    });
};

const makeRequest = (method, url, data, onSuccess) => {
    axios({
        method: method,
        url: url,
        data: data,
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

                if (status === 500 && isAssertionError(data))
                    handleAssertionError();
                else
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

const isAssertionError = (string) => {
    let errorType = string.split(' ');
    return errorType[0] = "AssertionError";
};
const handleAssertionError = () => {
    console.log("AssertionError");
    showErrorNotification(500, {detail: "not found"})
};

export const showErrorNotification = (status = "0", data) => {
    let problems = [];
    if (!(data instanceof Object) || Array.isArray(data)) problems = data;
    else {
        Object.keys(data).map((prop) => {
            problems.push(`${prop} : ${data[prop]} \n`)
        })
    }
    notification["error"]({
        duration: 2,
        message: status,
        description: problems
    });
};
export const showSuccessNotification = (message) => {
    notification["success"]({
        duration: 2,
        message: message
    });
};

