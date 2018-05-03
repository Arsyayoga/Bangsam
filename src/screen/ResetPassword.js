import React, { Component } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import {
    Item,
    Input,
    Button,
    Icon,
    Label,
    StatusBar,
    Spinner
} from 'native-base';
import {
    RkCard,
    RkText,
    RkButton,
    RkTextInput
} from 'react-native-ui-kitten'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackNavigator } from 'react-navigation';

export default class componentName extends Component {
    static navigationOptions = {
        title: 'Reset Password',
        headerStyle: {
            backgroundColor: '#228B22'
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            color: 'white'
        }
    }
    constructor(props) {
      super(props)
    
      this.state = {
         email : ''
      };
    };

    onReset(){
        const { email} = this.state
        if (email != '' ) {
            firebase.auth().sendPasswordResetEmail(email).then((result) => {
                Alert.alert('Reset Berhasil', 'Silahkan Buka Email Anda')
                this.props.navigation.navigate('Screen')
            }).catch((e) => {
                this.setState({
                    message: e.message
                })
            })
        } else {
            this.setState({
                message: Alert.alert('Reset Gagal', 'Harap Isi Email Anda')
            })
        }
    }
    
  render() {
    return (
        <ScrollView scrollEnabled={true} style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ alignItems: 'center', flex: 1, padding: 10, justifyContent: 'center', alignContent: 'center', paddingTop: 20 }}>
            <RkCard style={{ alignItems: 'center', padding: 10, backgroundColor: 'white', borderColor: 'white' }}>
                <RkText rkType="success large" style={{ fontSize: 25, padding: 3 }}>Silahkan Masukkan Email</RkText>
                <Item floatingLabel style={{ marginTop: 20, marginBottom: 10, borderColor: '#2ecc71' }}>
                    <Label style={{ color: '#2ecc71' }}>Email</Label>
                    <Input type="email"
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email} />
                </Item>
                <Button block success style={{ marginTop: 20, marginBottom: 20 }}
                    onPress={this.onReset.bind(this)}>
                  <Label style={{ color: 'white' , fontSize: 20 }}><Icon type="MaterialCommunityIcons" name="lock-reset" style={{ color: 'white', fontSize: 20}}/> RESET </Label>
                </Button>
            </RkCard>
        </View>
    </ScrollView>
    );
  }
}
