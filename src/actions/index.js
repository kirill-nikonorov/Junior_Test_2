import {showErrorNotification, showSuccessNotification} from '../service';
import {actions as companyOrientationsActions} from '../../lib/symbiote/companyOrientations';
import {actions as tokenActions} from '../../lib/symbiote/token';
import api from '../api';

export const fetchIndustries = () => dispath => {
    api
        .getIndustries()
        .then(({data: {results}}) => {
            dispath(companyOrientationsActions.industries.saveIndustries(results));
        })
        .catch(handleError);
};
export const fetchSubIndustries = industryId => dispath => {
    api
        .getSubIndustries(industryId)
        .then(({data: {results}}) => {
            dispath(
                companyOrientationsActions.subIndustries.saveSubIndustries(results, industryId)
            );
        })
        .catch(handleError);
};
export const postNewCompany = (data, onSuccess) => () => {
    api
        .postNewCompany(data)
        .then(({data: {id}}) => {
            onSuccess(id);
        })
        .catch(handleError);
};

export const createNewUser = (data, onSuccess) => () => {
    api
        .postNewUser(data)
        .then(onSuccess)
        .catch(handleError);
};
export const postNewIndividualUser = (data, onSuccess) => () => {
    api
        .postNewIndividualUser(data)
        .then(onSuccess)
        .catch(handleError);
};
export const authUser = (data, onSuccess) => dispath => {
    api
        .authUser(data)
        .then(({data: {token}}) => {
            showSuccessNotification('success authorization');
            dispath(tokenActions.saveToken(token));
            onSuccess();
        })
        .catch(handleError);
};
export const confirmRegistration = (data, onSuccess) => dispath => {
    api
        .confirmRegistration(data)
        .then(({data: {token}}) => {
            showSuccessNotification('success confirmation');
            dispath(tokenActions.saveToken(token));
            onSuccess();
        })
        .catch(handleError);
};
export const resendConfirmationCode = data => () => {
    api
        .resendConfirmationCode(data)
        .then(() => {
            showSuccessNotification('Successfully Sent');
        })
        .catch(handleError);
};

const handleError = ({response, request, message}) => {
    if (response) {
        console.log('Error', response);
        const {data, status} = response;
        if (status === 500 && isAssertionError(data)) handleAssertionError();
        else showErrorNotification(status, data);
    } else if (request) {
        console.log('Error', request);
        showErrorNotification('', request);
    } else {
        showErrorNotification('', message);
        console.log('Error', message);
    }
};

const isAssertionError = string => {
    let errorType = string.split(' ');
    return (errorType[0] = 'AssertionError');
};
const handleAssertionError = () => {
    console.log('AssertionError');
    showErrorNotification(500, {detail: 'not found'});
};
