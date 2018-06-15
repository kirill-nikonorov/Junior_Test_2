import React from "react"
import {Provider} from "react-redux";
import Forms from "./Forms"
import styled from "styled-components"

import {Layout, Menu, Breadcrumb, Icon} from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Sider, Footer} = Layout;

import {hot} from "react-hot-loader";


const Root = ({store}) => (

    <Provider store={store}>
        <Layout>
            <Content style={{background: '#fff'}}>
                <img src="/i.png"
                     style={{
                         width: '100%',
                         height: '759px'
                     }}/>
            </Content>
            <Sider width={450}
                   style={{
                       background: '#fff'
                   }}>
                <Forms/>
            </Sider>
        </Layout>
    </Provider>

);

export default hot(module)((
    Root)
);