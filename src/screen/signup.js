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
        title: 'Daftar Akun',
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
            email: '',
            password: '',
            message: '',
            nama: '',
            nomer_hp: '',
            alamat: ''
        };
    };

    onSignup() {
        const { email, password, nama, nomer_hp, alamat } = this.state
        if (email != '' && password != '' && nama != '' && nomer_hp != '' && alamat != '') {
            firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
                firebase.auth().currentUser.sendEmailVerification()

                //Simpan extra data
                firebase.database().ref('users/' + result.uid).set({
                    nama: nama,
                    nomer_hp: nomer_hp,
                    alamat: alamat,
                    role : 'masyarakat'
                })
                Alert.alert('Registrasi Berhasil', 'Silahkan Buka Email Untuk Memverifikasi Akun')
                this.props.navigation.navigate('Screen', {loginType : 'masyarakat'})
            }).catch((e) => {
                Alert.alert('Registrasi Gagal', e.message)
            })
        } else {
            Alert.alert('Registrasi Gagal', 'Harap Isi Semua Data')
        }
    }

    render() {
        return (
            <ScrollView scrollEnabled={true} style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ alignItems: 'center', flex: 1, padding: 10, justifyContent: 'center', alignContent: 'center', paddingTop: 20 }}>
                    <RkCard style={{ alignItems: 'center', padding: 10, backgroundColor: 'white', borderColor: 'white' }}>
                        <RkText rkType="success large" style={{ fontSize: 25, padding: 3 }}>Silahkan Isi Data</RkText>
                        <Item floatingLabel style={{ marginTop: 10, marginBottom: 10, borderColor: '#2ecc71' }}>
                            <Label style={{ color: '#2ecc71' }}>Nama</Label>
                            <Input
                                onChangeText={(nama) => this.setState({ nama })}
                                value={this.state.nama} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 5, marginBottom: 10, borderColor: '#2ecc71' }}>
                            <Label style={{ color: '#2ecc71' }}>No HP</Label>
                            <Input
                                keyboardType="phone-pad"
                                onChangeText={(nomer_hp) => this.setState({ nomer_hp })}
                                value={this.state.nomer_hp} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 5, marginBottom: 10, borderColor: '#2ecc71' }}>
                            <Label style={{ color: '#2ecc71' }}>Alamat</Label>
                            <Input
                                onChangeText={(alamat) => this.setState({ alamat })}
                                value={this.state.alamat} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 5, marginBottom: 10, borderColor: '#2ecc71' }}>
                            <Label style={{ color: '#2ecc71' }}>Email</Label>
                            <Input type="email"
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 5, marginBottom: 10, borderColor: '#2ecc71' }}>
                            <Label style={{ color: '#2ecc71' }}>Password</Label>
                            <Input
                                secureTextEntry={true}
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password} />
                        </Item>
                        <Button block success style={{ marginTop: 20, marginBottom: 20 }}
                            onPress={this.onSignup.bind(this)}>
                            <Label style={{ color: 'white' , fontSize: 20 }}><Icon type="FontAwesome" name="user" style={{ color: 'white', fontSize: 20}}/> DAFTAR </Label>
                        </Button>
                    </RkCard>
                </View>
            </ScrollView>
        );
    }
}
