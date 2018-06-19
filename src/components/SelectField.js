import React from "react";
import {hot} from "react-hot-loader";
import {Form, Select} from 'antd';
import PropTypes from "prop-types";

const FormItem = Form.Item;

const SelectField = ({
                        input,
                        input: {name},
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
                placeholder={name}
                defaultActiveFirstOption={false}
                onSelect={onSelect}>
                {arrayOfOptions}
            </Select>
        </FormItem>
    )
};


export default hot(module)(SelectField)



