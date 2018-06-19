import React from "react";
import {hot} from "react-hot-loader";
import {Form, Input} from 'antd';
import PropTypes from "prop-types";

const FormItem = Form.Item;

const InputField = ({
                        input,
                        value1,
                        input: {name, value},
                        placeholder,
                        meta: {touched, error},
                        type
                    }) => {
    const displayingErrorMessage = touched && error ? error : "";
/*    console.log(value);
    console.log(value1);*/
    return (
        <FormItem
            validateStatus={displayingErrorMessage ? "error" : ""}
            help={displayingErrorMessage}>
            <Input
                {...input}
                placeholder={placeholder}
                type={type}/>
        </FormItem>
    )
};

export default hot(module)(InputField)



