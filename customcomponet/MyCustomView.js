import React, { Component } from 'react';

import {
    requireNativeComponent,
    View,

    UIManager,
} from 'react-native';

import PropTypes  from 'prop-types';

const ReactNative = require('ReactNative'); // ReactNative通过import没用

export default class MyCustomView extends Component{
    constructor(props){
        super(props)
    }

    static propTypes = {
        /**
         * 当这个属性被设置为true，并且地图上绑定了一个有效的可视区域的情况下，
         * 可以通过捏放操作来改变摄像头的偏转角度。
         * 当这个属性被设置成false时，摄像头的角度会被忽略，地图会一直显示为俯视状态。
         */
        color: PropTypes.string // 设置color属性
    };

    render(){
        // {...this.props} 一定需要设置，不让你永远也看不到
        return(
            <RCTMyCustomView
                {...this.props}>
    </RCTMyCustomView>);
    }
}

// MyCustomView.propTypes = {
//
//     color: PropTypes.string // 设置color属性
//     // ...View.propTypes // 这里一定需要设置，不然会报错。has no propType for native prop。这个被坑了
// };

var RCTMyCustomView = requireNativeComponent('MyCustomView', MyCustomView);  // 拿到Native组件