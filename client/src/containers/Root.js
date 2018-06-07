import React from "react"
import UserForm from "../components/UserAuthForm";
import NewCompanyForm from "../components/NewCompanyForm";
import BattleField from "../components/BattleField";
import {Route, Switch, Link} from 'react-router-dom';
import {Provider} from "react-redux";

import {hot} from "react-hot-loader";

const Root = ({store}) => (
    <Provider store={store}>
        <div>
            <div>
                <Link to={"/"}>Главн</Link>
                <br/>
                <Link to={"/company"}>Компании</Link>
            </div>

                <Route exact path="/a" component={UserForm}/>
                <Route exact path="/" component={NewCompanyForm}/>
              {/*  <Route exact path="/" component={BattleField}/>*/}

        </div>
    </Provider>

);


export default hot(module)((
    Root)
);