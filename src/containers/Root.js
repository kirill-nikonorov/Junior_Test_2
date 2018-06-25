import React from 'react';
import {Provider} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row, Col, Layout} from 'antd';

const {Content, Sider, Header} = Layout;
import {hot} from 'react-hot-loader';
import PropTypes from 'prop-types';

import FormPart from './FormPart';

const Root = ({store}) => {
    const siderPart = (
        <div>
            <Header style={{background: 'white'}}>
                <Link to={'/'}> Konnex </Link>
            </Header>
            <Content>
                <FormPart/>
                <input
                    type='button'
                    value="log Store"
                    onClick={() => {
                        console.log(store.getState())
                    }}/>
            </Content>
        </div>
    );

    return (
        <Provider store={store}>
            <Layout style={{height: '100vh', border: 'none'}}>
                <Content
                    style={{
                        background: 'url("i.png")',
                        backgroundSize: 'cover'
                    }}
                />
                <Sider width={400} style={{background: '#fff'}}>
                    <Row type="flex" justify="center">
                        <Col span={20}>{siderPart}</Col>
                    </Row>
                </Sider>
            </Layout>
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object
};

export default hot(module)(Root);
