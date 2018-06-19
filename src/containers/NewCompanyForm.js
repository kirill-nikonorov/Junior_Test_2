import React from "react";
import {withRouter} from 'react-router-dom';
import {bindActionCreators, compose} from "redux"
import {connect} from "react-redux";
import {hot} from "react-hot-loader";
import * as ActionsCreators from "../actions/actions"
import {Field, reduxForm} from "redux-form"
import {Form, Input, Button, Select} from 'antd';
import 'antd/dist/antd.css';
import PropTypes from "prop-types";

import InputField from "../components/InputField"
import SubscribeButton from "../components/SubscribeButton"
import SelectField from "../components/SelectField"

const Option = Select.Option;
const FormItem = Form.Item;

const required = value => (value ? undefined : 'Required');

class UserForm extends React.Component {
    static propTypes = {
        industries: PropTypes.array,
        subIndustries: PropTypes.object,
        history: PropTypes.object,
        actions: PropTypes.object,
        location: PropTypes.object,
        match: PropTypes.object
    };

    constructor(props) {
        super(props);
        const {industries, subIndustries} = this.props;
        this.state = {
            industries,
            subIndustries,
            industryId: -1,
            subIndustryId: -1
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleIndustrySelect = this.handleIndustrySelect.bind(this);
        this.handleSubIndustrySelect = this.handleSubIndustrySelect.bind(this);
        this.handleSuccessPost = this.handleSuccessPost.bind(this);
        /* setInterval(() => {
             console.log(this.state)
         }, 5000)*/
    }


    handleSubmit({company}) {
        const {actions} = this.props;
        const {industryId, subIndustryId} = this.state;

        let data = {
            name: company,
            industry: industryId,
            sub_industry: subIndustryId
        };

        actions.postNewCompany(data, this.handleSuccessPost);
    }

    handleSuccessPost(id) {
        const {history} = this.props;

        history.push("/signup?CompanyID=" + id);
    }

    handleSelect(value, option) {
        const {key} = option;
        const {industries} = this.state;
        if (industries.map(industry => (industry.id)).indexOf(parseInt(key)) !== -1)
            this.handleIndustrySelect(key);
        else this.handleSubIndustrySelect(key)
    }

    handleIndustrySelect(key) {
        const {industryId, subIndustries} = this.state,
            {actions} = this.props;
        if (industryId !== key) {
            (!subIndustries[key]
                && actions.fetchSubIndustries(key)
            );
            this.setState({
                industryId: key,
            });
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
        const industriesOptions = industries.map(industry => <Option key={industry.id}
                                                                     value={industry.name}>{industry.name}</Option>);
        const subIndustriesOptions = subIndustries[industryId] ?
            subIndustries[industryId].map(subIndustry => <Option key={subIndustry.id}
                                                                 value={subIndustry.name}>{subIndustry.name}</Option>) : [];

        const {handleSubmit} = this.props;

        return (
            <Form layout="horizontal" onSubmit={handleSubmit(this.handleSubmit)}>
                <Field
                    name="company"
                    placeholder="Company"
                    component={InputField}
                    type="text"
                    validate={[required]}
                />
                <Field
                    name="industry"
                    placeholder="Industry"
                    component={SelectField}
                    onSelect={this.handleSelect}
                    arrayOfOptions={industriesOptions}
                    validate={[required]}
                />
                <Field
                    name="subindustry"
                    placeholder="Subindustry"
                    component={SelectField}
                    onSelect={this.handleSelect}
                    arrayOfOptions={subIndustriesOptions}
                    validate={[required]}
                />
                <SubscribeButton
                    text="Create"
                />
            </Form>
        )
            ;
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

const mapStateToProps = ({companyTypes: {industries, subIndustries}}) => {
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
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: "CompanyForm"}),
)(UserForm)



