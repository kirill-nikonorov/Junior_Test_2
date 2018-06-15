import React from "react"

import BattleField from "../components/BattleField";
import {Route, Switch, Link} from 'react-router-dom';

import SingUpForm from "../components/SingUpForm";
import NewCompanyForm from "../components/NewCompanyForm";
import SignInForm from "../components/SignInForm";
import SignUpCompleteForm from "../components/SignUpCompleteForm";

import {hot} from "react-hot-loader";

import {Row, Col, Layout, notification, Button} from 'antd';

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


        <Row type="flex" justify="center">
            <Col style={{border: "1px solid black"}} span={20}>
                <Header style={{background: '#aaa'}}>
                    Ссылка
                </Header>
                <Content>
                        <Route exact path="/" component={SignInForm}/>
                        <Route exact path="/createnewcompany" component={NewCompanyForm}/>
                        <Route exact path="/signup" component={SingUpForm}/>
                        <Route exact path="/signupcomplete" component={SignUpCompleteForm}/>
                </Content>
            </Col>
        </Row>
    </div>
);


export default hot(module)((
    App)
);