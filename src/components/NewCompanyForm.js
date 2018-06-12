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
import { Row, Col } from 'antd';


const Option = Select.Option;
const FormItem = Form.Item;


class UserForm extends React.Component {
    constructor(props) {
        super(props);

        const {industries, subIndustries, actions} = this.props;

        this.state = {
            actions,
            industries,
            subIndustries,
            industryId: -1,
            subIndustryId: -1
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

        this.renderSelect = this.renderSelect.bind(this);
        this.renderField = this.renderField.bind(this);

        this.handleIndustrySelect = this.handleIndustrySelect.bind(this);
        this.handleSubIndustrySelect = this.handleSubIndustrySelect.bind(this);

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
                this.postNewCompany();
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
                history.push("/");
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
                    formItemLayout
                }) {
        delete input.value;

        const {getFieldDecorator} = this.props.form;
        return (
            <FormItem
                {...meta}
                {...formItemLayout}
            >
                {getFieldDecorator(`${name}`, {
                    rules: [{required: true, message: `Please input your ${name}!`}]
                })(
                    <Input
                        {...input}
                        placeholder={name}
                        autoComplete="off"
                    />
                )
                }
            </FormItem>
        )
    }

    renderSelect({
                     input,
                     input: {name},
                     placeholder,
                     onSelect,
                     arrayOfOptions,
                     meta,
                     formItemLayout
                 }) {
        delete input.value;

        const {getFieldDecorator} = this.props.form;

        return (
            <FormItem
                {...formItemLayout}
                {...meta}>
                {getFieldDecorator(`${name}`, {
                    rules: [{required: true, message: `Please input your ${name}!`}],
                })(
                    <Select
                        {...input}
                        mode="combobox"
                        placeholder={name}
                        defaultActiveFirstOption={false}
                        onSelect={onSelect}
                    >
                        {arrayOfOptions}
                    </Select>
                )}
            </FormItem>
        )
    }

    handleSelect(value, option) {
        const {key} = option;
        const {industries} = this.state;

        if (industries.map(industry => (industry.id)).indexOf(parseInt(key)) !== -1)
            this.handleIndustrySelect(key);
        else this.handleSubIndustrySelect(key)
    }

    handleIndustrySelect(key) {
        const {actions, industryId, subIndustries} = this.state;
        if (industryId !== key) {
            (!subIndustries[key]
                && actions.fetchSubIndustries(key)
            );
            this.setState({industryId: key})
        }
    }

    handleSubIndustrySelect(key) {
        const {subIndustryId} = this.state;
        if (subIndustryId !== key) {
            this.setState({subIndustryId: key})
        }
    }

    render() {

        const {industries, subIndustries, industryId} = this.state;
        const {history} = this.props;

        const industriesOptions = industries.map(industry => <Option key={industry.id}
                                                                     value={industry.name}>{industry.name}</Option>);
        const subIndustriesOptions = subIndustries[industryId] ?
            subIndustries[industryId].map(subIndustry => <Option key={subIndustry.id}
                                                                 value={subIndustry.name}>{subIndustry.name}</Option>) : [];
        const formItemLayout = {
            style: {width: 150}
        };

        return (
            <div>
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <Field name="Company"
                           component={this.renderField}
                           formItemLayout={formItemLayout}
                    />
                    <Field name="Industry"
                           component={this.renderSelect}
                           onSelect={this.handleSelect}
                           arrayOfOptions={industriesOptions}
                           formItemLayout={formItemLayout}
                    />
                    <Field name="Subindustry"
                           component={this.renderSelect}
                           onSelect={this.handleSelect}
                           arrayOfOptions={subIndustriesOptions}
                           formItemLayout={formItemLayout}
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
                                const search = qs.parse(this.props.history.location.search)
                                console.log(search);


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



