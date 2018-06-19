import React from "react"
import {Provider} from "react-redux";
import {Route, Switch, Link} from 'react-router-dom';

import Forms from "./Forms"


import {Row, Col, Layout} from 'antd';

const {Content, Sider, Header} = Layout;

import {hot} from "react-hot-loader";
import PropTypes from "prop-types";

import SignInForm from "./SignInForm";
import SignUpCompleteForm from "./SignUpCompleteForm";
import NewCompanyForm from "./NewCompanyForm";
import SingUpForm from "./SingUpForm";


const Root = ({store}) => {

    const routes = [
        {path: "/", component: SignInForm},
        {path: "/signup", component: SingUpForm},
        {path: "/signupcomplete", component: SignUpCompleteForm},
        {path: "/createnewcompany", component: NewCompanyForm}
    ];
    const links = [
        {to: "/", label: "Авторизация"},
        {to: "/signup", label: "Регистрация"},
        {to: "/signupcomplete", label: "Подтверждение регистрации"},
        {to: "/signupcomplete?username=aa@aa.aaa", label: "Подтверждение регистрации с параметрами"},
        {to: "/createnewcompany", label: "Создать Команию"}
    ];
    const linksPart = (
        <div>
            {links.map((linkData) => (
                <div key={linkData.label}>
                    <Link to={linkData.to}>{linkData.label}</Link>
                    <br/>
                </div>
            ))}
        </div>
    );

    const contentPart = (
        <Content style={{
            background: 'url("/i.png")',
            backgroundSize: 'cover'
        }}/>
    );

    const siderPart = (
        <Sider width={400} style={{background: '#fff'}}>
            <Row type="flex" justify="center">
                <Col span={20}>
                    <Header style={{background: 'white'}}>
                        <Link to={"/"}> Konnex </Link>
                    </Header>
                    <Content>
                        <Switch>
                            {routes.map((routeData) => (
                                <Route exact path={routeData.path}
                                       key={routeData.path}
                                       component={routeData.component}/>))}
                        </Switch>
                    </Content>
                    {linksPart}
                </Col>
            </Row>
        </Sider>);

    return (
        <Provider store={store}>
            <Layout style={{height: '100vh', border: 'none'}}>
                {contentPart}
                {siderPart}
            </Layout>
        </Provider>)
};

Root.propTypes = {
    store: PropTypes.object
};

export default hot(module)((
    Root)
);