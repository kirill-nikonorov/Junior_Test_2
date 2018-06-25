import React from 'react';
import {bindActionCreators, compose} from 'redux';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {hot} from 'react-hot-loader';
import {withRouter} from 'react-router-dom';

import * as ActionsCreators from '../../actions';
import 'react-bootstrap';
import {Form, Row, Col} from 'antd/lib/index';
import PropTypes from 'prop-types';
import qs from 'qs';

const FormItem = Form.Item;

import {InputField, SubscribeButton} from '../../components';

const required = value => (value ? undefined : 'Required');
const minLength = min => value =>
    value && value.length < min ? `At least ${min} characters ` : undefined;
const minLength6 = minLength(6);

const validateForm = ({password, confirmPassword}) => {
    const errorMesseage = 'Two passwords that you enter is inconsistent!';
    return password && confirmPassword && password !== confirmPassword
        ? {
              password: errorMesseage,
              confirmPassword: errorMesseage
          }
        : {};
};

class SingUpForm extends React.Component {
    static propTypes = {
        actions: PropTypes.object,
        history: PropTypes.object,
        location: PropTypes.object,
        match: PropTypes.object,
        reduxForm: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.extractCompanyIdFromLocationParams = this.extractCompanyIdFromLocationParams.bind(
            this
        );
        this.handleSuccessPost = this.handleSuccessPost.bind(this);
    }

    handleSubmit({email: username, password, firstName, lastName, mobile}) {
        const {actions} = this.props,
            companyId = this.extractCompanyIdFromLocationParams();
        console.log(companyId);
        const data = {
                username,
                password,
                first_name: firstName,
                last_name: lastName,
                mobile
            },
            onSuccessPost = () => this.handleSuccessPost(username);

        if (companyId) {
            data.company = companyId;
            actions.postNewUser(data, onSuccessPost);
        } else {
            actions.postNewIndividualUser(data, onSuccessPost);
        }
        console.log(data);
    }

    extractCompanyIdFromLocationParams() {
        const {
            location: {search}
        } = this.props;
        return qs.parse(search.substr(1)).companyID;
    }

    handleSuccessPost(username) {
        const {history} = this.props;
        history.push(`/signupcomplete?username=${username}`);
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <Form layout="horizontal" onSubmit={handleSubmit(this.handleSubmit)}>
                <Row gutter={6}>
                    <Col span={12}>
                        <Field
                            name="firstName"
                            placeholder="First Name"
                            component={InputField}
                            validate={required}
                        />
                    </Col>
                    <Col span={12}>
                        <Field
                            name="lastName"
                            placeholder="Last Name"
                            component={InputField}
                            validate={required}
                        />
                    </Col>
                </Row>
                <Field name="mobile" placeholder="Mobile" component={InputField} type="number" />
                <Field
                    name="email"
                    placeholder="Email"
                    component={InputField}
                    type="email"
                    validate={required}
                />
                <Field
                    name="password"
                    placeholder="Password"
                    component={InputField}
                    type="password"
                    validate={[required, minLength6]}
                />
                <Field
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    component={InputField}
                    type="password"
                    validate={required}
                />
                <SubscribeButton text="Sign up" />
            </Form>
        );
    }

    componentWillMount() {
        /* const {initialize} = this.props;
         initialize({
                 firstName: "qwe",
                 lastName: "qwe",
                 email: "eee@ee.ee",
                 password: "password",
                 confirmPassword: "password"
             }
         )*/
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(ActionsCreators, dispatch)
    };
};

export default compose(
    hot(module),
    connect(
        null,
        mapDispatchToProps
    ),
    withRouter,
    reduxForm({
        form: 'UserSinUpForm',
        validate: validateForm
    })
)(SingUpForm);
