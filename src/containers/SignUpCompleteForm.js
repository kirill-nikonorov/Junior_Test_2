import React from "react";
import {bindActionCreators, compose} from "redux"
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux";
import {hot} from "react-hot-loader";
import * as ActionsCreators from "../actions/actions"
import {Field, reduxForm} from "redux-form"
import {Form} from 'antd';
import qs from 'qs';
import PropTypes from "prop-types";

import InputField from "../components/InputField"
import SubscribeButton from "../components/SubscribeButton"

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
        return qs.parse(search.substr(1)).username;
    }

    handleSubmit({email: username, password: token}) {

        const {actions, accounts} = this.props;
        let {password, firstName} = {};
        if (accounts[username]) {
            password = accounts[username].password;
            firstName = accounts[username].firstName;
            console.log("found , password =  ", password);
        }

        let data = {
            username,
            new_password: password,
            token: token,
            first_name: firstName
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
        const {handleSubmit} = this.props;
        setTimeout(this.handleSubmit({email: "q@q.q", password: "Fpassword"}), 1000);

        return (
            <Form layout="horizontal" onSubmit={handleSubmit(this.handleSubmit)}>
                <Field
                    name="email"
                    placeholder="Email"
                    component={InputField}
                    type="text"
                    validate={[required]}
                />
                <Field
                    name="password"
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

    componentWillMount() {
        const {initialize} = this.props;
        initialize({email: this.extractUsernameFromLocationParams()})
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(ActionsCreators, dispatch)
    }
};
const mapStateToProps = ({accounts}) => {
    return {accounts};
};
export default compose(
    hot(module),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    reduxForm({
        form: "ConfirmForm"
    }),
)(UserForm)



