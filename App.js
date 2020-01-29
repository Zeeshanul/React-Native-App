import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Button, } from 'react-native';
import logo from './assets/icon.png';
import Cameracontrol from './cameracontrol'
import Camera1 from './camera.page';
import CameraPage from './camera.page'
import Cameracontrol1 from './camera1'

export default class App extends Component {

  state = { val: true };
  togglefunc = () => {
    this.setState({ val: !this.state.val });
  }

  render() {
    if (this.state.val) {
      console.log('Hello')
      return (
        <View style={styles.camerabtn}>
          <Button title='Start Photo Session' onPress={this.togglefunc} />
        </View >
      );
    }
    else {
      console.log('Functon called')
      // return <Camera1 />
      return (
        // <CameraPage />
        <Cameracontrol1 />
      );


    }
  }
}

const styles = StyleSheet.create({
  camerabtn: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'center'

  },
});
