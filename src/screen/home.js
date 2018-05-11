import React, { Component } from 'react';
import {  View, Alert} from 'react-native';
import {
    RkButton, RkTabView
} from 'react-native-ui-kitten'
import {
    Button,
    Footer,
    FooterTab,
    Text,
    Container,
    Content,
    StyleProvider } from 'native-base';

import getTheme from '../../native-base-theme/components'
import commonTheme from '../../native-base-theme/variables/commonColor'

import BangSamPage from './bangsam';

export default class HomeApp extends Component {
    onLogout(){
        Alert.alert('Warning', 'Apakah Anda Yakin Ingin Keluar ?', [{
            text : 'IYA',
            onPress : () => {
                firebase.auth().signOut().then((result) => {
                    //Berhasil Logout
                    this.props.onLogout()
                    this.props.navigation.setParams({'isLoggedIn' : false})
                    this.props.navigation.navigate('Splash')
                }).catch((e) => console.log(e))
            }
        }, {
            text : 'TIDAK',
            onPress : () => {}
        }])
    }

    componentDidMount() {
        let title = this.props.role == 'masyarakat' ? 'Bangsam Masyarakat' : 'Bangsam Admin'
        this.props.navigation.setParams({title : title})
    }

    checkRolePage() {
        // alert(this.props.role)
        if (this.props.role == 'masyarakat') {
            return (
                <View>
                    <Text>Hello World</Text>
                    <RkButton onPress={this.onLogout.bind(this)}>Logout</RkButton>
                </View>
            )
        } else {
            return (
                <BangSamPage {...this.props} btnLogout={this.onLogout.bind(this)}/>
            )
        }
    }

    render() {
        return this.checkRolePage()
    }
}
