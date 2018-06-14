import React from "react";
import {bindActionCreators, compose} from "redux"
import {connect} from "react-redux";
import {hot} from "react-hot-loader";
import namespace from "../containers/namespace"
import * as ActionsCreators from "../actions/actions"
import {Field, reduxForm} from "redux-form"
import axios from "axios";
import {Form, Icon, Input, Button, Select} from 'antd';
import 'antd/dist/antd.css';
import qs from 'qs';

const FormItem = Form.Item;


class UserForm extends React.Component {
    constructor(props) {
        super(props);

        const {actions} = this.props;

        this.state = {
            actions
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderField = this.renderField.bind(this);
        this.confirmRegistration = this.confirmRegistration.bind(this);
        this.handleSuccessAuthorization = this.handleSuccessAuthorization.bind(this);
        this.extractCompanyIdFromLocationParams = this.extractCompanyIdFromLocationParams.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.confirmRegistration(values);
            }
        });
    };

    confirmRegistration({Email: username, Password: password}) {

        const {actions} = this.props;
        let data = {
            username,
            new_password: "aqweqweqwe",
            token: password,
            first_name: "kir"
        };

        console.log(data);

        actions.confirmRegistration(data, this.handleSuccessAuthorization)
    }

    handleSuccessAuthorization() {
        const {history} = this.props;
        console.log("SUCCESS CONFIRM")
        history.push("/")
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
                        autoComplete="off"
                        type={type}
                    />
                )
                }
            </FormItem>
        )
    }
    extractCompanyIdFromLocationParams() {
        let {location: {search}} = this.props;
        return qs.parse(search.substr(1)).username;
    };

    render() {
        const formItemLayout = {
            style: {width: 150}
        };

        return (
            <div>
                <Form layout="vertical" onSubmit={this.handleSubmit}>

                    <Field name="Email"
                           component={this.renderField}
                           formItemLayout={formItemLayout}
                           type="text"
                           value="dsd"
                    />
                    <Field name="Password"
                           component={this.renderField}
                           formItemLayout={formItemLayout}
                           type="password"
                    />

                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Create
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
    componentDidMount(){
        console.log("componentDidMount");
        const {setFieldsValue} = this.props.form;
        setFieldsValue({Email : "метод Заглушки"})
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
    Form.create(),
)
(UserForm)



