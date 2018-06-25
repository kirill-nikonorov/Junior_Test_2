import React from 'react';
import {hot} from 'react-hot-loader';
import {Form, Input} from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

const InputField = ({input, placeholder, meta: {touched, error}, type}) => {
    const displayingErrorMessage = touched && error ? error : '';
    return (
        <FormItem
            validateStatus={displayingErrorMessage ? 'error' : ''}
            help={displayingErrorMessage}>
            <Input {...input} placeholder={placeholder} type={type} style={{appea: 'button'}} />
        </FormItem>
    );
};

InputField.propTypes = {
    input: PropTypes.object,
    placeholder: PropTypes.string,
    meta: PropTypes.object,
    type: PropTypes.string
};

export default hot(module)(InputField);
