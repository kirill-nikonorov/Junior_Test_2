import React from 'react';
import {hot} from 'react-hot-loader';
import PropTypes from 'prop-types';

import {Form, Button} from 'antd';

const FormItem = Form.Item;

const SubscribeButton = ({text}) => {
    return (
        <FormItem>
            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                {text}
            </Button>
        </FormItem>
    );
};

SubscribeButton.propTypes = {
    text: PropTypes.string
};

export default hot(module)(SubscribeButton);
