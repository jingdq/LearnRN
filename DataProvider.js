/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    NativeModules,
    View,
    Image,
    TextInput,
    Switch
} from 'react-native';

import Dimensions from 'Dimensions';


export default class DataProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {

            scheme: null,
            data: null

        };


    }

    render() {
        var resultView = []
        if (this.state.data != null) {

            resultView.push(<Text key={1} style={styles.instructions}>获取结果： {this.state.data}</Text>)

        }

        return (

            <View style={styles.container}>
                <TextInput style={styles.inputs}
                           placeholder="请输入scheme"
                           onChangeText={(text) => {
                               this.state.scheme = text
                           }}/>
                <Text style={styles.button}
                      onPress={this.fetchData.bind(this)}>
                    获取数据
                </Text>

                {resultView}


            </View>
        );

    }

    fetchData() {
        alert(this.state.scheme)
        NativeModules.AHRNDataProviderModule.fetch(this.state.scheme)
            .then((response) => {
//                this.setImageData(response)
                this.setState({
                    data: response
                });

            })
            .catch((error) => {
                NativeModules.AHRNToastManager.showToast(error, 0, 1, 1000);
            });
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //    justifyContent: 'center',
        //    alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        fontSize: 15,
        textAlign: 'center',
        color: '#ffffff',
        margin: 5,
        padding: 5,
        borderWidth: 3,
        borderColor: '#eee',
        backgroundColor: '#3a6ab5'

    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    inputs: {
        marginTop: 2,
        height: 45,
        marginLeft: 5,
        paddingLeft: 5,
        borderColor: '#CCC',
        borderRadius: 4,
    }
});
