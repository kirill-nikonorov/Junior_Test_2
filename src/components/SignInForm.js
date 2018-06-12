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
        this.postNewCompany = this.postNewCompany.bind(this);

        /* setInterval(() => {
             console.log(this.state)
         }, 5000)*/
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                //this.postNewCompany();
            }
        });
    };

    postNewCompany() {

        const {history, form: {getFieldValue}} = this.props;

        const {industryId, subIndustryId} = this.state;
        const name = getFieldValue("Company");

        let data = {
            "name": name,
            "industry": industryId,
            "sub_industry": subIndustryId
        };

        axios.post("http://doc.konnex.us/public/companies/", data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then((responce) => {
                console.log(responce);
                history.push("/")
                console.log(qs);
            })

            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
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

    render() {


        const {history} = this.props;

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
                    <FormItem>
                        <Button
                            type="primary"
                            onClick={() => {
                                history.push("/");
                            }}
                        >
                            Next form
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }

    componentDidMount() {
        const {actions} = this.props;
        actions.fetchIndustries();
    }

    componentWillReceiveProps({industries, subIndustries}) {
        this.setState({
            industries,
            subIndustries
        })
    }
}

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const mapStateToProps = ({companyTypes: {industries, subIndustries}}) => {
    //state.form.CompanyForm && console.log(state.form.CompanyForm.values);

    return (
        {
            industries,
            subIndustries,
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
    namespace("reduxForm", reduxForm({form: "CompanyForm"})),
    Form.create(),
)
(UserForm)



