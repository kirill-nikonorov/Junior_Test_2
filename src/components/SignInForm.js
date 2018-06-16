import React from "react";
import {bindActionCreators, compose} from "redux"
import {connect} from "react-redux";
import {hot} from "react-hot-loader";
import namespace from "../../lib/namespace"
import * as ActionsCreators from "../actions/actions"
import {Field, reduxForm} from "redux-form"
import {Form,  Input, Button} from 'antd';
//import 'antd/dist/antd.css';

const FormItem = Form.Item;


class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderField = this.renderField.bind(this);
        this.authorize = this.authorize.bind(this);
        this.handleSuccessAuthorization = this.handleSuccessAuthorization.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.authorize(values);
            }
        });
    }

    authorize({Email: username, Password: password}) {

        const {actions} = this.props;

        const data = {
            username,
            password,
        };

        console.log(data);

        actions.authUser(data, this.handleSuccessAuthorization)
    }

    handleSuccessAuthorization() {
        const {history} = this.props;
        history.push("/");
        console.log("SUCCESS AUTHORIZATION")
    }

    renderField({
                    input,
                    input: {name},
                    meta,
                    formItemLayout,
                    type
                }) {
        delete input.value;

        const {getFieldDecorator} = this.props.form;
        return (
            <FormItem
                {...meta}
                {...formItemLayout}
            >
                {getFieldDecorator(`${name}`, {
                    rules: [{required: true, message: `Require`}]
                })(
                    <Input
                        {...input}
                        placeholder={name}
                        type={type}
                    />
                )
                }
            </FormItem>
        )
    }

    render() {
        return (
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                <Field name="Email"
                       component={this.renderField}
                       type="text"
                />
                <Field name="Password"
                       component={this.renderField}
                       type="password"
                />

                <FormItem
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{width: "100%"}}
                    >
                        Log In
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(ActionsCreators, dispatch)
    }
};

export default compose(
    hot(module),
    connect(null, mapDispatchToProps),
    namespace("reduxForm", reduxForm({form: "CompanyForm"})),
    Form.create()
)(UserForm)



