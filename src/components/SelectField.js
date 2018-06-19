import React from "react";
import {hot} from "react-hot-loader";
import {Form, Select} from 'antd';
import PropTypes from "prop-types";

const FormItem = Form.Item;

const SelectField = ({
                         input,
                         placeholder,
                         onSelect,
                         arrayOfOptions,
                         meta: {error, touched},
                     }) => {
    const displayingErrorMessage = touched && error ? error : "";
    return (
        <FormItem
            validateStatus={displayingErrorMessage ? "error" : ""}
            help={displayingErrorMessage}>
            <Select
                {...input}
                placeholder={placeholder}
                defaultActiveFirstOption={false}
                onSelect={onSelect}>
                {arrayOfOptions}
            </Select>
        </FormItem>
    )
};

SelectField.propTypes = {
    input: PropTypes.object,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func,
    meta: PropTypes.object,
    arrayOfOptions: PropTypes.array
};

export default hot(module)(SelectField)



