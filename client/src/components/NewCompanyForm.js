import React, {compose} from "react";
import {bindActionCreators} from "redux"
import {Field, reduxForm} from "redux-form"
import {connect} from "react-redux";
import {hot} from "react-hot-loader";


import * as ActionsCreators from "../actions/actions"
import "react-bootstrap";


const renderDataList = (arrayOfValues, listId) => {
    return (
        <datalist id={listId}>
            {arrayOfValues.map((value, i) => (
                <option value={value.name} key={i}/>))
            }
        </datalist>
    )
};

const renderField = ({
                         input,
                         input: {name},
                         placeholder,
                         type,
                         meta: {touched, error},
                         listId,
                         arrayOfValues,
                     }) => (
    <div>
        <input {...input}
               placeholder={placeholder}
               type="text"
               autoComplete={"off"}
               list={listId}
        />
        {touched && error && <span>{error}</span>}

        {arrayOfValues ? renderDataList(arrayOfValues, listId) : ""}

    </div>
);


const required = value => (value ? undefined : 'Required');


class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {industryId: 0};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();

    }

    handleChange(e) {
        const {actions, industries, subIndustries} = this.props;
        let industryId;
        industries.map((industry) => {
            if (industry.name === e.target.value)
                industryId = industry.id;
        });

        if (industryId) {
            if (!subIndustries[industryId]) {
                new Promise((resolve, reject) => {
                    resolve(actions.fetchSubIndustries(industryId));
                })
                    .then(() => {
                        this.setState({industryId})
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
            else this.setState({"industryId": industryId})
        } else this.setState({"industryId": 0})
    }


    render() {
        const {industries, subIndustries} = this.props;
        const {industryId} = this.state;
        // console.log(subIndustries)
        return (
            <form onSubmit={this.handleSubmit}>
                <Field
                    name="companyName"
                    component={renderField}
                    type="text"
                    placeholder="Company name"
                    validate={[required]}
                />
                <Field
                    name="industryOfCompany"
                    component={renderField}
                    type="text"
                    placeholder="Industry"
                    validate={[required]}

                    listId={"industries"}
                    arrayOfValues={industries}
                    onChange={this.handleChange}
                />
                <Field
                    name="subIndustryOfCompany"
                    component={renderField}
                    type="text"
                    placeholder="Subindustry"
                    validate={[required]}

                    listId={"subIndustries"}
                    arrayOfValues={subIndustries[industryId]}
                />
                <select placeholder="Select a person">
                    <option value={"aa"}>aa</option>
                    <option value={"aaa1"}>aa1</option>
                </select>
                <button type="submit">Create</button>
            </form>
        );
    }

    componentDidMount() {
        const {actions} = this.props;
        actions.fetchIndustries();
    }
}

const mapStateToProps = (state) => {
    // console.log("mapStateToProps = state : ", state);
    return (
        {
            industries: state.companyTypes.industries,
            subIndustries: state.companyTypes.subIndustries,
        }
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(ActionsCreators, dispatch)
    }
};

export default hot(module)(
    connect(mapStateToProps, mapDispatchToProps)
    (reduxForm({form: "firstForm"})
        (UserForm)
    )
)


