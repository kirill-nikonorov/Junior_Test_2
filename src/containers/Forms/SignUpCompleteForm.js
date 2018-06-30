import React from 'react';
import {bindActionCreators, compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {hot} from 'react-hot-loader';
import * as ActionsCreators from '../../actions/index';
import {Field, reduxForm} from 'redux-form';
import {Form} from 'antd';
import qs from 'qs';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {InputField, SubscribeButton} from '../../components';

const FormItem = Form.Item;

const required = value => (value ? undefined : 'Required');

class UserForm extends React.Component {
    static propTypes = {
        history: PropTypes.object,
        actions: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResendConfirmationCode = this.handleResendConfirmationCode.bind(this);
        this.handleSuccessConfirmation = this.handleSuccessConfirmation.bind(this);
        this.extractUsernameFromLocationParams = this.extractUsernameFromLocationParams.bind(this);
    }

    extractUsernameFromLocationParams() {
        const {
            location: {search}
        } = this.props;
        return qs.parse(search.substr(1)).username;
    }

    handleSubmit({email: username, token}) {
        const {actions} = this.props,
            data = {
                username,
                token
            };
        console.log(data);
        actions.confirmRegistration(data, this.handleSuccessConfirmation);
    }

    handleResendConfirmationCode() {
        const {
            actions: {resendConfirmationCode},
            email: username
        } = this.props;
        resendConfirmationCode({username});
    }

    handleSuccessConfirmation() {
        console.log('SUCCESS CONFIRMATION');
        const {history} = this.props;
        history.push('/');
    }

    render() {
        const {handleSubmit} = this.props;

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
                    name="token"
                    placeholder="Token"
                    component={InputField}
                    type="password"
                    validate={[required]}
                />
                <Link to="#" onClick={this.handleResendConfirmationCode}>
                    If an email does not arrive click here to resend
                </Link>
                <SubscribeButton text="Confirm" />
            </Form>
        );
    }

    componentWillMount() {
        const {initialize} = this.props;
        initialize({email: this.extractUsernameFromLocationParams()});
    }
}

const mapStateToProps = ({form: {ConfirmForm}}) => {
    const props = {};
    ConfirmForm &&
        ConfirmForm.values &&
        ConfirmForm.values.email &&
        (props['email'] = ConfirmForm.values.email);
    return props;
};
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(ActionsCreators, dispatch)
    };
};

export default compose(
    hot(module),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withRouter,
    reduxForm({
        form: 'ConfirmForm'
    })
)(UserForm);
