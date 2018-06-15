import React from "react";
import {bindActionCreators, compose} from "redux"
import {Field, reduxForm} from "redux-form"
import {connect} from "react-redux";
import {hot} from "react-hot-loader";

import * as ActionsCreators from "../actions/actions"
import "react-bootstrap";
import {Form, Input, Row, Col, Button} from "antd/lib/index";
import namespace from "../containers/namespace";
import qs from "qs";

const FormItem = Form.Item;


class SingUpForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {confirmDirty: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderField = this.renderField.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
        this.validateToNextPassword = this.validateToNextPassword.bind(this);
        this.postNewUser = this.postNewUser.bind(this);
        this.extractCompanyIdFromLocationParams = this.extractCompanyIdFromLocationParams.bind(this);
        this.handleSuccessPost = this.handleSuccessPost.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.postNewUser(values)
            }
        });
        //  console.log("Subscribed")
    }

    postNewUser(values) {

        const {actions} = this.props,
            {
                Email: username,
                Password: password,
                ['First name']: firstName,
                ['Last name']: lastName,
                Mobile: mobile
            } = values,
            companyId = this.extractCompanyIdFromLocationParams();

        console.log(companyId);

        const data = {
            username,
            password,
            first_name: firstName,
            last_name: lastName,
            mobile
        };
        if (companyId) {
            data.company = companyId;
            actions.postNewUser(data, this.handleSuccessPost)
        }
        else {
            actions.postNewIndividualUser(data, () => this.handleSuccessPost(username))
        }
        console.log(data);
    }

    extractCompanyIdFromLocationParams() {
        let {location: {search}} = this.props;
        return qs.parse(search.substr(1)).companyID;
    };

    handleSuccessPost(username) {
        const {history} = this.props;
        history.push(`/signupcomplete?username=${username}`);
    };

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('Password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['Confirm Password'], {force: true});
        }
        callback();
    };

    renderField({
                    input,
                    input: {name},
                    meta,
                    formItemLayout,
                    type,
                    validatorFunction
                }) {
        delete input.value;

        const {getFieldDecorator} = this.props.form;
        return (
            <FormItem
                {...meta}
                {...formItemLayout}
            >
                {getFieldDecorator(`${name}`, {
                    rules: [{required: true, message: 'field required'},
                        validatorFunction ? {validator: validatorFunction, message: 'passowrd validation'} : {}]
                })(<Input
                    {...input}
                    placeholder={name}
                    autoComplete="off"
                    type={type}
                />)
                }
            </FormItem>
        )
    }


    render() {
        const {actions} = this.props;
        /* console.log(this.props);*/
        const {getFieldDecorator} = this.props.form;


        const formItemLayout = {
            style: {width: 200}
        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <Row gutter={8}>
                    <Col span={12}>
                        <Field
                            name="First name"
                            component={this.renderField}
                        />
                    </Col>
                    <Col span={12}>
                        <Field
                            name="Last name"
                            component={this.renderField}
                        />
                    </Col>
                </Row>
                <Field
                    name="Mobile"
                    component={this.renderField}
                    formItemLayout={formItemLayout}
                    type="number"
                />
                <Field
                    name="Email"
                    component={this.renderField}
                    formItemLayout={formItemLayout}
                    type="email"
                />
                <Field
                    name="Password"
                    component={this.renderField}
                    formItemLayout={formItemLayout}
                    type="password"
                    validatorFunction={this.validateToNextPassword}

                />
                <Field
                    name="Confirm Password"
                    component={this.renderField}
                    formItemLayout={formItemLayout}
                    type="password"
                    onBlur={this.handleConfirmBlur}
                    validatorFunction={this.compareToFirstPassword}
                />
                <FormItem
                    {...formItemLayout}>
                    <Button type="primary"
                            htmlType="submit">Sign up</Button>
                </FormItem>
            </Form>

        );
    }

}

/*
class Test extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {value: ""}

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(...ChangeProps) {
        console.log(ChangeProps);

        const {onChange} = this.props;

       onChange()

    }

    render() {
        const value = this.state.value
        return (
            <input {...this.props}
                   name="test"
                   type="text"
            />)
    }
}*/

const mapStateToProps = ({form: {UserSinUpForm}}) => {

    // UserSinUpForm && UserSinUpForm.values && console.log(UserSinUpForm.values);

    return (
        {}
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
    namespace("reduxForm", reduxForm({form: "UserSinUpForm"})),
    Form.create(),
)
(SingUpForm)

