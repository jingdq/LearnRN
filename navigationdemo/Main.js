/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import FlexLayout from './FlexLayout'
import {
 StackNavigator,
} from 'react-navigation'

// import  MyCustomView  from '../customcomponet/MyCustomView'
import DemoView from '../customcomponet/DemoView'


export default class Main extends Component<{}> {
  static navigationOptions=
  {
     title:'LearnRN'
   };

  render() {
      const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>
        <Button title="flex布局" onPress={()=>{
            navigate('FlexLayout',{name:'FlexLayout'})
        } } />

          <DemoView
              ref = { 'mDemoView' }
              style = { { width:1080, height:100 } }
              title = { 'DEMO' }
              alpha = { 0.5 }
              onTextColorChange = { (color) => {
                  console.log('text color:' + color);
              }}/>
          <Button
              title = { '改变字体颜色' }
              onPress = { () => {
                  this.refs.mDemoView.changeTextColor(-48060);
              }}>
          </Button>
          <Button
              title = { '动态添加控件' }
              onPress = { () => {
                  this.refs.mDemoView.addView();
              }}>
          </Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
