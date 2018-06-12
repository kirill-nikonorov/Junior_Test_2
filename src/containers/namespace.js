import {compose, withProps, mapProps} from 'recompose';

const namespace = (namespace, ...hocs) =>
    compose(
        mapProps(props => ({$parentProps: props})),
        ...hocs,
        mapProps(props => ({[namespace]: props, ...props.$parentProps}))
    );

export default namespace;