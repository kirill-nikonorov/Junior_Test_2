import React from "react";
import {bindActionCreators, compose} from "redux"
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import {hot} from "react-hot-loader";
import namespace from "../../lib/namespace"
import * as ActionsCreators from "../actions/actions"
import {Field, reduxForm} from "redux-form"
import {Form, Input, Button} from 'antd';
import PropTypes from "prop-types";

import InputField from "./InputField"
import SubscribeButton from "./SubscribeButton"

const FormItem = Form.Item;

const required = value => (value ? undefined : 'Required');

class UserForm extends React.Component {
    static propTypes = {
        history: PropTypes.object,
        actions: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSuccessAuthorization = this.handleSuccessAuthorization.bind(this);
    }

    handleSubmit({email: username, password}) {
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

    render() {
        let {handleSubmit} = this.props.reduxForm;
        return (
            <Form layout="horizontal" onSubmit={handleSubmit(this.handleSubmit)}>
                <Field name="email"
                       placeholder="Emali"
                       component={InputField}
                       type="text"
                       validate={[required]}
                />
                <Field name="password"
                       placeholder="Password"
                       component={InputField}
                       type="password"
                       validate={[required]}
                />
                <SubscribeButton
                    text="Log In"
                />
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
    withRouter,
    connect(null, mapDispatchToProps),
    namespace("reduxForm", reduxForm({form: "CompanyForm"})),
    Form.create()
)(UserForm)



