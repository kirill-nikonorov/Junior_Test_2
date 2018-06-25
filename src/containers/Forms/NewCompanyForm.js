import React from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import {hot} from 'react-hot-loader';
import * as ActionsCreators from '../../actions/index';
import {Field, reduxForm} from 'redux-form';
import {Form, Select} from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';

import {InputField, SubscribeButton, SelectField} from '../../components';

const Option = Select.Option;
const FormItem = Form.Item;

const required = value => (value ? undefined : 'Required');

const isSelected = value => (parseInt(value) ? undefined : 'You should choose from list');

class UserForm extends React.Component {
    static propTypes = {
        industries: PropTypes.object,
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
            subIndustries
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIndustrySelect = this.handleIndustrySelect.bind(this);
        this.handleSuccessPost = this.handleSuccessPost.bind(this);
    }

    handleSubmit({company}) {
        const {actions, subIndustryId} = this.props;
        const {industryId} = this.state;

        let data = {
            name: company,
            industry: industryId,
            sub_industry: subIndustryId
        };
        actions.postNewCompany(data, this.handleSuccessPost);
    }

    handleSuccessPost(id) {
        const {history} = this.props;

        history.push('/signup?CompanyID=' + id);
    }

    handleIndustrySelect(value, {key}) {
        const {industryId, subIndustries} = this.state,
            {actions} = this.props;
        if (industryId !== key) {
            !subIndustries[key] && actions.fetchSubIndustries(key);
        }
    }

    render() {
        const {industries, subIndustries, industryId} = this.state,
            {handleSubmit} = this.props;

        const industriesOptions = Object.values(industries).map(industry => (
            <Option key={industry.id}>{industry.name}</Option>
        ));
        const subIndustriesOptions = subIndustries[industryId]
            ? subIndustries[industryId].map(subIndustry => (
                  <Option key={subIndustry.id}>{subIndustry.name}</Option>
              ))
            : [];

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
                    name="industryId"
                    placeholder="Industry"
                    component={SelectField}
                    onSelect={this.handleIndustrySelect}
                    arrayOfOptions={industriesOptions}
                    validate={[required, isSelected]}
                />
                <Field
                    name="subIndustryId"
                    placeholder="Subindustry"
                    component={SelectField}
                    arrayOfOptions={subIndustriesOptions}
                    validate={[required, isSelected]}
                />
                <SubscribeButton text="Create" />
            </Form>
        );
    }

    componentWillMount() {
        const {actions} = this.props;
        actions.fetchIndustries();
    }

    componentWillReceiveProps({industries, subIndustries, industryId}) {
        this.setState({
            industries,
            subIndustries,
            industryId
        });
    }
}

const mapStateToProps = ({
    companyOrientations: {industries, subIndustries},
    form: {CompanyForm}
}) => {
    const props = {
        industries,
        subIndustries
    };
    CompanyForm &&
        CompanyForm.values &&
        CompanyForm.values.industryId &&
        (props['industryId'] = CompanyForm.values.industryId);

    CompanyForm &&
        CompanyForm.values &&
        CompanyForm.values.subIndustryId &&
        (props['subIndustryId'] = CompanyForm.values.subIndustryId);

    return props;
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(ActionsCreators, dispatch)
    };
};

export default compose(
    hot(module),
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    reduxForm({form: 'CompanyForm'})
)(UserForm);
