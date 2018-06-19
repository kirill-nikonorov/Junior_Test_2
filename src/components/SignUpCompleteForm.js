import React from "react";
import {bindActionCreators, compose} from "redux"
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import {hot} from "react-hot-loader";
import namespace from "../../lib/namespace"
import * as ActionsCreators from "../actions/actions"
import {Field, reduxForm} from "redux-form"
import {Form} from 'antd';
import qs from 'qs';
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
        this.handleSuccessConfirmation = this.handleSuccessConfirmation.bind(this);
        this.extractUsernameFromLocationParams = this.extractUsernameFromLocationParams.bind(this);
    }


    extractUsernameFromLocationParams() {
        const {location: {search}} = this.props;
        console.log(search);
        return "dd";
    }

    handleSubmit({email: username, password}) {

        const {actions} = this.props;
        let data = {
            username,
            new_password: "aqweqweqwe",
            token: password,
            first_name: "kir"
        };

        console.log(data);

        actions.confirmRegistration(data, this.handleSuccessConfirmation)

    }

    handleSuccessConfirmation() {
        const {history} = this.props;
        console.log("SUCCESS CONFIRM");
        history.push("/")
    }


    render() {
        const {handleSubmit} = this.props.reduxForm;

        return (
            <Form layout="horizontal" onSubmit={handleSubmit(this.handleSubmit)}>
                <Field name="email"
                       value="value"
                       value1="aa"
                       placeholder="Email"
                       component={InputField}
                       type="text"
                       validate={[required]}
                />
                <Field name="password"
                       value1="bb"
                       placeholder="Password"
                       component={InputField}
                       type="password"
                       validate={[required]}
                />
                <SubscribeButton
                    text="Confirm"
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
    connect(null, mapDispatchToProps),
    namespace("reduxForm", reduxForm({form: "ConfirmForm"})),
    Form.create()
)(UserForm)



