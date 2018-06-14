import React from "react"
import {Provider} from "react-redux";
import App from "./App"

import {hot} from "react-hot-loader";

import {Row, Col} from 'antd';

const Root = ({store}) => (

    <Provider store={store}>
        <Row  align="middle" type="flex" justify="center">
            <Col span={4}>
              Картинка
            </Col>
            <Col span={20}>
                <App/>
            </Col>
        </Row>
    </Provider>

);

export default hot(module)((
    Root)
);