import axios from "axios"
import {notification} from "antd/lib/index";
import {actions as companyOrientationsActions} from "../../lib/symbiote/companyOrientations"
import {actions as tokenActions} from "../../lib/symbiote/token"
import api from "../api"


export const fetchIndustries = () => (dispath) => {
    api.getIndustries()
        .then(({data: {results}}) => {
            dispath(companyOrientationsActions.industries.saveIndustries(results))
        })
};
export const fetchSubIndustries = (industryId) => (dispath) => {
    api.getSubIndustries(industryId)
        .then(({data: {results}}) => {
            dispath(companyOrientationsActions.subIndustries.saveSubIndustries(results, industryId))
        })
};
export const postNewCompany = (data, onSuccess) => () => {
    api.postNewCompany(data)
        .then(({data: {id}}) => {
            onSuccess(id)
        })
};

export const createNewUser = (data, onSuccess) => () => {
    api.postNewUser(data)
        .then(onSuccess);
};
export const postNewIndividualUser = (data, onSuccess) => () => {
    api.postNewIndividualUser(data)
        .then(onSuccess);
};
export const authUser = (data, onSuccess) => (dispath) => {
    api.authUser(data)
        .then(({data: {token}}) => {
            showSuccessNotification("success authorization");
            dispath(tokenActions.saveToken(token));
            onSuccess()
        });
};
export const confirmRegistration = (data, onSuccess) => (dispath) => {
    api.confirmRegistration(data)
        .then(({data: {token}}) => {
        showSuccessNotification("success confirmation");
        dispath(tokenActions.saveToken(token));
        onSuccess()
    });
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

