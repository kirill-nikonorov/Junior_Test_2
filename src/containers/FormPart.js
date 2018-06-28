import React from 'react';
import {hot} from 'react-hot-loader';
import {Route, Switch, Link} from 'react-router-dom';

import {SingUpForm, NewCompanyForm, SignInForm, SignUpCompleteForm} from './Forms';

const FormPart = () => {
    const links = {
        authLink: {to: '/', label: 'Авторизация'},
        signInLink: {to: '/signup', label: 'Регистрация'},
        signInCompleteLink: {to: '/signupcomplete', label: 'Подтверждение регистрации'},
        createNewCompanyLink: {to: '/createnewcompany', label: 'Создать компанию'}
    };

    const linksElements = Object.entries(links).reduce((readyLinks, [name, {to, label}]) => {
        readyLinks[name] = (
            <div key={label}>
                <Link to={to}>{label}</Link>
                <br />
            </div>
        );
        return readyLinks;
    }, {});

    const linksPart = (
        <div style={{backgroundColor: '#ffe474', padding: '10px', bottom: '0'}}>
            <span>Ссылки на время разработки</span>
            {Object.values(linksElements)}
        </div>
    );

    const routes = [
        {path: '/', component: SignInForm, linkElement: linksElements.createNewCompanyLink},
        {path: '/signup', component: SingUpForm, linkElement: linksElements.authLink},
        {path: '/signupcomplete', component: SignUpCompleteForm},
        {path: '/createnewcompany', component: NewCompanyForm}
    ].map(({path, component, linkElement}) => (
        <Route
            exact
            path={path}
            key={path}
            render={props => React.createElement(component, {...props, linkElement})}
        />
    ));

    return (
        <div>
            <Switch>{routes}</Switch>
            {linksPart}
        </div>
    );
};

export default hot(module)(FormPart);
