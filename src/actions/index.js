import {showSuccessNotification} from '../service';
import {actions as companyOrientationsActions} from '../../lib/symbiote/companyOrientations';
import {actions as tokenActions} from '../../lib/symbiote/token';
import api from '../api';

export const fetchIndustries = () => dispath => {
    api.getIndustries().then(({data: {results}}) => {
        dispath(companyOrientationsActions.industries.saveIndustries(results));
    });
};
export const fetchSubIndustries = industryId => dispath => {
    api.getSubIndustries(industryId).then(({data: {results}}) => {
        dispath(companyOrientationsActions.subIndustries.saveSubIndustries(results, industryId));
    });
};
export const postNewCompany = (data, onSuccess) => () => {
    api.postNewCompany(data).then(({data: {id}}) => {
        onSuccess(id);
    });
};

export const createNewUser = (data, onSuccess) => () => {
    api.postNewUser(data).then(onSuccess);
};
export const postNewIndividualUser = (data, onSuccess) => () => {
    api.postNewIndividualUser(data).then(onSuccess);
};
export const authUser = (data, onSuccess) => dispath => {
    api.authUser(data).then(({data: {token}}) => {
        showSuccessNotification('success authorization');
        dispath(tokenActions.saveToken(token));
        onSuccess();
    });
};
export const confirmRegistration = (data, onSuccess) => dispath => {
    api.confirmRegistration(data).then(({data: {token}}) => {
        showSuccessNotification('success confirmation');
        dispath(tokenActions.saveToken(token));
        onSuccess();
    });
};
