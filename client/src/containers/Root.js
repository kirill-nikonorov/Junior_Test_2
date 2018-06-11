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
                <Link to={"/"}>Регистрация</Link>
                <br/>
                <Link to={"/createNewCompany"}>Создать Команию</Link>
            </div>

           {/* <Route exact path="/" component={UserForm}/>*/}
{/*            <Route exact path="/createNewCompany" component={NewCompanyForm}/>*/}
            <Route exact path="/" component={BattleField}/>
       {/*     <BattleField/>*/}
     {/*       <SecondField/>*/}
        </div>
    </Provider>

);


export default hot(module)((
    Root)
);