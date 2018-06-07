import React from "react";
import {bindActionCreators, compose} from "redux"
import {connect} from "react-redux";
import {hot} from "react-hot-loader";

import * as ActionsCreators from "../actions/actions"


import {Form, Icon, Input, Button} from 'antd';
import 'antd/dist/antd.css';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form layout="horizontal" onSubmit={this.handleSubmit}>

                <FormItem
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}
                >
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}
                >
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        Log in
                    </Button>
                </FormItem>
            </Form>
        );
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    componentWillReceiveProps({industries, appropriateIndustriesNames, subIndustries}) {
        this.setState({
            industries,
            appropriateIndustriesNames,
            subIndustries
        })
    }
}

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);


const mapStateToProps = (state) => {
    const {industries, subIndustries} = state.companyTypes;
    return (
        {
            industries,
            subIndustries,
            appropriateIndustriesNames: industries.map((industry) => (
                industry.name
            ))
        }
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(ActionsCreators, dispatch)
    }
};


export default compose(
    hot(module),
    connect(mapStateToProps, mapDispatchToProps),
    Form.create()
)
(HorizontalLoginForm)




