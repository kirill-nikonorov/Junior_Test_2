import React from 'react';
import {hot} from 'react-hot-loader';
import {Form, Select} from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

const SelectField = ({input, placeholder, onSelect, arrayOfOptions, meta: {error, touched}}) => {
    const displayingErrorMessage = touched && error ? error : '';
    return (
        <FormItem
            validateStatus={displayingErrorMessage ? 'error' : ''}
            help={displayingErrorMessage}>
            <Select
                mode="combobox"
                optionLabelProp="children"
                {...input}
                placeholder={placeholder}
                defaultActiveFirstOption={false}
                onSelect={onSelect}
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                {arrayOfOptions}
            </Select>
        </FormItem>
    );
};

SelectField.propTypes = {
    input: PropTypes.object,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func,
    meta: PropTypes.object,
    arrayOfOptions: PropTypes.array
};

export default hot(module)(SelectField);
