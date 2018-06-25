import React from 'react';
import {hot} from 'react-hot-loader';
import {Route, Switch, Link} from 'react-router-dom';

import {SingUpForm, NewCompanyForm, SignInForm, SignUpCompleteForm} from './Forms';

const FormPart = () => {
    const routes = [
        {path: '/', component: SignInForm},
        {path: '/signup', component: SingUpForm},
        {path: '/signupcomplete', component: SignUpCompleteForm},
        {path: '/createnewcompany', component: NewCompanyForm}
    ].map(routeData => (
        <Route exact path={routeData.path} key={routeData.path} component={routeData.component} />
    ));

    const links = [
        {to: '/', label: 'Авторизация'},
        {to: '/signup', label: 'Регистрация'},
        {to: '/signupcomplete', label: 'Подтверждение регистрации'},
        {
            to: '/signupcomplete?username=aa@aa.aaa',
            label: 'Подтверждение регистрации с параметрами'
        },
        {to: '/createnewcompany', label: 'Создать Команию'}
    ];

    const linksPart = (
        <div style={{backgroundColor: '#ffe474', padding: '10px'}}>
            <span>Ссылки на время разработки</span>
            {links.map(linkData => (
                <div key={linkData.label}>
                    <Link to={linkData.to}>{linkData.label}</Link>
                    <br />
                </div>
            ))}
        </div>
    );
    return (
        <div>
            <Switch>{routes}</Switch>
            {linksPart}
        </div>
    );
};

export default hot(module)(FormPart);
