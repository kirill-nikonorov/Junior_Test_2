import React from "react"

import BattleField from "../components/BattleField";
import {Route, Switch, Link} from 'react-router-dom';

import SingUpForm from "../components/SingUpForm";
import NewCompanyForm from "../components/NewCompanyForm";
import SignInForm from "../components/SignInForm";

import {hot} from "react-hot-loader";

import {Row, Col, Layout} from 'antd';

const {Header, Content, Footer, Sider} = Layout;

const App = ({store}) => (

    <div>
        {/* <div style={{border: "10px solid black"}}>*/}

        <div>
            <Link to={"/signin"}>Авторизация</Link>
            <br/>
            <Link to={"/signup"}>Регистрация</Link>
            <br/>
            <Link to={"/createNewCompany"}>Создать Команию</Link>
        </div>

        <Content>
            <Route exact path="/signin" component={SignInForm}/>
            <Route exact path="/signup" component={SingUpForm}/>
            <Route exact path="/createnewcompany" component={NewCompanyForm}/>
        </Content>
        {/*     <Route exact path="/" component={BattleField}/>*/}
        {/*     <BattleField/>*/}
        {/*       <SecondField/>*/}
    </div>
);


export default hot(module)((
    App)
);