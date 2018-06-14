import React from "react"

import BattleField from "../components/BattleField";
import {Route, Switch, Link} from 'react-router-dom';

import SingUpForm from "../components/SingUpForm";
import NewCompanyForm from "../components/NewCompanyForm";
import SignInForm from "../components/SignInForm";
import SignUpCompleteForm from "../components/SignUpCompleteForm";

import {hot} from "react-hot-loader";

import {Row, Col, Layout, notification , Button} from 'antd';

const {Header, Content, Footer, Sider} = Layout;


const App = ({store}) => (

    <div>
        {/* <div style={{border: "10px solid black"}}>*/}

        <div>
            <Link to={"/"}>Авторизация</Link>
            <br/>
            <Link to={"/signup?"}>Регистрация</Link>
            <br/>
            <Link to={"/signupcomplete?username=11"}>Подтверждение регистрации</Link>
            <br/>
            <Link to={"/createnewcompany"}>Создать Команию</Link>
        </div>

        <Content>
            <Route exact path="/" component={SignInForm}/>
            <Route exact path="/createnewcompany" component={NewCompanyForm}/>
            <Route exact path="/signup" component={SingUpForm}/>
            <Route exact path="/signupcomplete" component={SignUpCompleteForm}/>
    {/*        <Route exact path="/signupcomplete" component={SignUpCompleteForm}/>
*/}         <Button onClick={()=>{document.location.href = "https://qa-app.konnex.us/dashboard/departments"}}>Go</Button>
        </Content>
        {/*     <Route exact path="/" component={BattleField}/>*/}
        {/*     <BattleField/>*/}
        {/*       <SecondField/>*/}
    </div>
);


export default hot(module)((
    App)
);