import React, {compose} from "react";
import {bindActionCreators} from "redux"
import {Field, reduxForm} from "redux-form"
import {connect} from "react-redux";
import {hot} from "react-hot-loader";


import * as ActionsCreators from "../actions/actions"
import "react-bootstrap";


class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        const {actions} = this.props;
        actions.authUser();
        console.log(actions)
    }

    render() {
        const {actions} = this.props;
        console.log(actions);

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="userName">Enter you name</label>
                    <Field name="userName" component="input" type="text"/>
                </div>
                <div>
                    <label htmlFor={"userSecondName"}>Enter you second name</label>
                    <Field name="userSecondName" component="input" type="text"/>
                </div>
                <button>Suscribe form</button>
            </form>
        );
    }

    componentWillUnmount() {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(ActionsCreators, dispatch)
    }
};

export default hot(module)(
    connect(null, mapDispatchToProps)
    (reduxForm({form: "firstForm"})
        (UserForm)
    )
);

