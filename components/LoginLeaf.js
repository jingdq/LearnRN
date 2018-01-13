import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput
} from 'react-native'

let widthOfMargin = Dimensions.get('window').width * 0.005

export default class LoginLeaf extends Component {

    static classField = 123

    static classMethod() {
        alert('please call me jing !')
    }

    constructor(props) {
        super(props)
        this.propertyName1 = 'value1'
        this.propertyName2 = 'value2'
        this.state = {
            inputedNum: '',
            inputedPW: '',
        }

        this.updatePW = this.updatePW.bind(this)
        // this.updateNum = this.updateNum.bind(this)

    }


    updateNum(newText) {
        this.setState({
            inputedNum: newText,
        })
    }

    updatePW(newText) {
        this.setState({
            inputedPW: newText,
        })
    }

    render() {

        return (
            <View style={styles.container}>

                <TextInput style={styles.textInputStyle} placeholder={'请输入手机号'} onChangeText={(newText) => {
                    this.updateNum(newText)
                }}/>
                <Text style={styles.textPromptStyle}>你输入的手机号 : {this.state.inputedNum}</Text>
                <TextInput style={styles.textInputStyle} placeholder={'请输入密码'} secureTextEntry={true}/>
                <Text style={styles.bigTextPromt}>确定</Text>

            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textInputStyle: {
        margin: widthOfMargin,
        backgroundColor: 'gray',
        fontSize: 20,
    },
    textPromptStyle: {
        margin: widthOfMargin,
        fontSize: 20,


    },
    bigTextPromt: {

        margin: widthOfMargin,
        backgroundColor: 'gray',
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
    },


})