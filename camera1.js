import React, { useState, useEffect, Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'

import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


export default class Cameracontrol1 extends Component {
    state = {
        rollGranted: false,
        hasPermission: null,
        type: Camera.Constants.Type.back,
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });

        const { perimit } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ rollGranted: perimit === 'granted' });

    }

    async handleCameraType() {
        console.log('Called');
        const { cameraType } = this.state

        this.setState({
            cameraType:
                cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
        })
    }

    async takePicture() {
        console.log('Taking Picture')

        if (this.camera) {
            console.log('Takennnnnnnnnnnn');
            const { uri } = await this.camera.takePictureAsync();
            console.log('uri', uri);
            const asset = await MediaLibrary.createAssetAsync(uri);
            console.log('asset', asset);
            MediaLibrary.createAlbumAsync('Expo', asset)
                .then(() => {

                    console.log('Album Created')
                })
                .catch(error => {

                    console.log('Error Occured')
                });
        }
    }

    render() {
        const { hasPermission } = this.state
        if (hasPermission === null) {
            return <View />;
        } else if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.cameraType}
                        ref={ref => {
                            this.camera = ref;
                        }}
                    >

                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 20 }}>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                }}>
                                <Ionicons
                                    name="ios-photos"
                                    style={{ color: "#fff", fontSize: 40 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.takePicture()}
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                }}>
                                <FontAwesome
                                    name="camera"
                                    style={{ color: "#fff", fontSize: 40 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                }}
                                onPress={() => this.handleCameraType()}
                            >
                                <MaterialCommunityIcons
                                    name="camera-switch"
                                    style={{ color: "#fff", fontSize: 40 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }

}