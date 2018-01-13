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
    ScrollView
} from 'react-native';


let nativeImageSource = require('nativeImageSource');
export default class AlbumDemo1 extends Component {

    constructor(props) {
        super(props);
        this.state = {

            images: null

        }
        this.setImagesData = this.setImagesData.bind(this)

    }

    render() {

        var resultView = []
        if (this.state.images != null) {
            if (this.state.images.length > 0) {
                resultView.push(<Text key={-1} style={styles.instructions}>选择图片的路径列表：</Text>)
            }
            for (var i = 0; i < this.state.images.length; i++) {

                var ades = {
                    android: "file://" + this.state.images[i],
                    width: 200,
                    height: 200
                }
                var imageData = this.state.images[i]


                resultView.push(<Image key={1000 + i} style={{width: 200, height: 200, resizeMode: 'contain'}}
                                       source={{uri: 'data:image/png;base64,' + imageData,width: 200, height: 200}}/>)


            }
        }


        return (
            <View style={styles.container}>


                <Text style={styles.button}
                      onPress={this.openalbum.bind(this)}>
                    打开相册[单选]
                </Text>
                <Text style={styles.button}
                      onPress={this.openalbumwithselectimges.bind(this)}>
                    打开相册[默认选中图片]
                </Text>
                <Text style={styles.button}
                      onPress={this.openalbummulti.bind(this)}>
                    打开相册[多选，最大选择个数5]
                </Text>
                <Text style={styles.button}
                      onPress={this.openAlbumWithSelectType.bind(this)}>
                    打开相册[多选类型]
                </Text>

                <Text style={styles.button}
                      onPress={this.openAlbumWithSingleSelectType.bind(this)}>
                    打开相册[单选裁剪类型]
                </Text>

                <ScrollView>

                    {resultView}

                </ScrollView>

            </View>
        );


    }

    openalbum() {
        NativeModules.AHRNAlbumModule.openAlbum()
            .then((response) => {

                // NativeModules.AHRNToastManager.showToast(retval,0,1,1000);
                this.setImagesData(response)
            })
            .catch((error) => {
                alert(error)
                // NativeModules.AHRNToastManager.showToast(error,0,1,1000);
            });
    }


    openalbummulti() {
        NativeModules.AHRNAlbumModule.openAlbumWithMaxSelectImg(5, [])
            .then((response) => {

                // NativeModules.AHRNToastManager.showToast(retval,0,1,1000);})
                this.setImagesData(response)
            })
            .catch(
                (error) => {
                    // NativeModules.AHRNToastManager.showToast(error,0,1,1000);
                    alert(error)
                }
            );

    }

    openalbumwithselectimges() {
        let selectimages = ["/storage/emulated/0/DCIM/Camera/20170411_163850(0).jpg",
            "/storage/emulated/0/DCIM/Camera/IMG_20170525_110814.jpg",
            "/storage/emulated/0/DCIM/Camera/20170525_124114.jpg",
            "/storage/emulated/0/DCIM/Camera/head_1488450927455.jpg",
            "/storage/emulated/0/DCIM/Camera/20170411_163850.jpg"]
        NativeModules.AHRNAlbumModule.openAlbumWithSelectImg(selectimages)
            .then((response) => {

                // NativeModules.AHRNToastManager.showToast(retval,0,1,1000);
                this.setImagesData(response)
            })
            .catch((error) => {
                // NativeModules.AHRNToastManager.showToast(error,0,1,1000);
                alert(error)
            });
    }

    setImagesData(imagearray) {

        // alert(imagearray)
        this.setState({
            images: imagearray

        });

    }

    openAlbumWithSelectType() {
        let maxnum = 5;
        let maxLimitTip = "最多选择5张";
        let selectType = 0;
        let selectimages = ["/storage/emulated/0/DCIM/Camera/20170411_163850(0).jpg",
            "/storage/emulated/0/DCIM/Camera/IMG_20170525_110814.jpg",
            "/storage/emulated/0/DCIM/Camera/20170525_124114.jpg",
            "/storage/emulated/0/DCIM/Camera/head_1488450927455.jpg",
            "/storage/emulated/0/DCIM/Camera/20170411_163850.jpg"]

        NativeModules.AHRNAlbumModule.openAlbumWithSelectType(maxnum, maxLimitTip, selectType, selectimages)
            .then((response) => {

                this.setImagesData(response)
                // NativeModules.AHRNToastManager.showToast(retval,0,1,1000);
            })
            .catch((error) => {
                alert(error)
                // NativeModules.AHRNToastManager.showToast(error,0,1,1000);
            })

    }

    openAlbumWithSingleSelectType() {
        let maxnum = 1;
        let maxLimitTip = "最多选择1张";
        let selectType = 1;
        let selectimages = []

        NativeModules.AHRNAlbumModule.openAlbumWithSelectType(maxnum, maxLimitTip, selectType, selectimages)
            .then((response) => {

                this.setImagesData(response)

            })
            .catch((error) => {
                alert(error)
                // NativeModules.AHRNToastManager.showToast(error,0,1,1000);
            })

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
});
