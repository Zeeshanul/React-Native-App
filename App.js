import React, { Component, setState, useState, useEffect, } from 'react';
import { Text, View, TouchableOpacity, Button, StyleSheet } from 'react-native';
import Cameracontrol from './cameracontrol'


class App extends Component {

  state = { val: true };
  togglefunc = () => {
    this.setState({ val: !this.state.val });
  }


  //state object


  render() {

    if (this.state.val) {
      return (

        <View style={styles.camerabtn}>
          <Button title='Start Photo Session' onPress={this.togglefunc} />
        </View >
      );
    }

    else {
      console.log('Functon called')

      return <Cameracontrol />

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
  red: {
    color: 'red',
  },
});

export default App;