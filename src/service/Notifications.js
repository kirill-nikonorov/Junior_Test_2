import {notification} from 'antd';

export const showErrorNotification = (status = '', data) => {
    let problems = [];
    if (!(data instanceof Object) || Array.isArray(data)) problems = data;
    else {
        Object.keys(data).map(prop => {
            problems.push(`${prop} : ${data[prop]} \n`);
        });
    }
    notification['error']({
        duration: 2,
        message: status,
        description: problems
    });
};
export const showSuccessNotification = message => {
    notification['success']({
        duration: 2,
        message: message
    });
};
