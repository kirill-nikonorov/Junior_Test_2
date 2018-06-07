import React from "react";
import {bindActionCreators, compose} from "redux"
import {connect} from "react-redux";
import {hot} from "react-hot-loader";


import * as ActionsCreators from "../actions/actions"

import {Form, Icon, Input, Button, Select} from 'antd';

const FormItem = Form.Item;
import 'antd/dist/antd.css';

const Option = Select.Option;


class UserForm extends React.Component {
    constructor(props) {
        super(props);

        const {industries, subIndustries, actions} = this.props;

        this.state = {
            actions,
            industries,
            subIndustries,
            industryId: -1
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleSelect(value, option) {
        console.log("option = ", option.key);

        const {key} = option;
        const {actions, subIndustries, industryId} = this.state;

        if (industryId !== key) {

            (!subIndustries[key]
                && actions.fetchSubIndustries(key)
            );
            this.setState({industryId: key})

        }
    };


    render() {
        const {industries, subIndustries, industryId} = this.state;

        const {getFieldDecorator, getFieldsError} = this.props.form;

        const industriesOptions = industries.map(industry => <Option key={industry.id}
                                                                     value={industry.name}>{industry.name}</Option>);
        const subIndustriesOptions = subIndustries[industryId] ?
            subIndustries[industryId].map(subIndustry => <Option key={subIndustry.id}
                                                                 value={subIndustry.name}>{subIndustry.name}</Option>) : [];
        const formItemLayout = {
            style: {width: 300}
        };
        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}>
                    {getFieldDecorator('company', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input placeholder="Company"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}>
                    {getFieldDecorator('industry', {
                        rules: [{required: true, message: 'Please input you industry!'}],
                    })(
                        <Select
                            mode="combobox"
                            placeholder={"Industry"}
                            defaultActiveFirstOption={false}
                            onSelect={this.handleSelect}
                        >
                            {industriesOptions}
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}>
                    {getFieldDecorator('subIndustry', {
                        rules: [{required: true, message: 'Please input you subindustry!'}],
                    })(
                        <Select
                            mode="combobox"
                            placeholder={"Subindustry"}
                            defaultActiveFirstOption={false}
                        >
                            {subIndustriesOptions}
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        Log in
                    </Button>
                </FormItem>
            </Form>
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

const mapStateToProps = (state) => {
    const {industries, subIndustries} = state.companyTypes;
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
    Form.create()
)(UserForm)



