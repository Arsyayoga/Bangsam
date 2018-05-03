import React, { Component } from 'react';
import {  View, Text, Alert} from 'react-native';
import {
    RkButton
} from 'react-native-ui-kitten'

export default class HomeApp extends Component {
    onLogout(){
        Alert.alert('Warning', 'Apakah Anda Yakin Ingin Keluar ?', [{
            text : 'IYA',
            onPress : () => {
                firebase.auth().signOut().then((result) => {
                    //Berhasil Logout
                    this.props.onLogout()
                }).catch((e) => Alert.alert('Logout Gagal', 'Anda Tidak Bisa Logout'))
            }
        }, {
            text : 'TIDAK',
            onPress : () => {}
        }])
    }
  render() {
    return (
      <View>
        <Text> HomeApp </Text>
        <RkButton onPress={this.onLogout.bind(this)} rkType="danger small"> Logout </RkButton>
      </View>
    );
  }
}
