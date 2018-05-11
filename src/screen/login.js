import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Alert,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import {
    Item,
    Input,
    Button,
    Icon,
    Label,
    Spinner,
    Container
} from 'native-base';
import {
    RkCard,
    RkText,
    RkButton
} from 'react-native-ui-kitten';

export default class LoginApp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loaded : false,
            email: '',
            password: '',
            loginType : 'masyarakat'
        };
    };

    onLogin() {
        // alert(JSON.stringify(this.state)) mengecek login
        const { email, password } = this.state
        this.setState({
            loaded : true
        })
        if (email == '' || password == '') {
            Alert.alert('Login Gagal', 'Email atau Password Masih Kosong')
            this.setState({
                loaded : false
            })
        } else {
            // Proses ke firebase
            firebase.auth().signInWithEmailAndPassword(email, password).then(
                (result) => {
                    console.log(result) //mengecek data firebase
                    if (result.emailVerified) {
                        this.setState({
                            loaded : false
                        })
                        this.props.onLogin(true)
                    }
                    else {
                        this.setState({
                            loaded : false
                        })
                        Alert.alert('Login Gagal', 'Email Belum Di Verifikasi')
                        this.props.onLogin(false)
                    }
                    // this.props.navigation.navigate('Home')

                }).catch((e) => {
                    this.setState({
                        loaded : false
                    })
                    Alert.alert('Login Gagal', 'Username / Password belum terdaftar')
                })
        }
    }

    componentDidMount() {
        // const {params} = this.props.navigation.state
        // this.setState({
        //     loginType : params.loginType
        // })
    }

    tombolRegister() {
        return (
            <Button block bordered success style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('Signup')}>
                <Label style={{ color: '#2ecc71' , fontSize: 20 }}><Icon type="FontAwesome" name="user" style={{ color: '#2ecc71', fontSize: 20}}/> DAFTAR </Label>
            </Button>    
        )
    }

    render() {
        if (this.state.loaded) {
            return (
				<Container>
					<ActivityIndicator size="large" color="#0000ff" size={90} />
				</Container>
            )
        } else {
            return (
                <ScrollView scrollEnabled={true} style={{ flex: 1, backgroundColor : 'white' }}>
                    <View style={{ alignItems: 'center', flex: 1, padding: 10, justifyContent: 'center', alignContent: 'center', paddingTop: 20 }}>
                        <RkCard style={{ alignItems: 'center', padding: 10, backgroundColor: 'white', borderColor: 'white' }}>
                            <RkText rkType="success large" style={{ fontSize: 30, padding: 3 }}>Silahkan Login</RkText>
                            <Item floatingLabel style={{ marginTop: 20, marginBottom: 20, borderColor: '#2ecc71' }}>
                                <Label style={{ color: '#2ecc71' }}>Email</Label>
                                <Input type="email"
                                    onChangeText={(email) => this.setState({ email })}
                                    value={this.state.email} />
                            </Item>
                            <Item floatingLabel style={{ marginTop: 5, marginBottom: 20, borderColor: '#2ecc71' }}>
                                <Label style={{ color: '#2ecc71' }}>Password</Label>
                                <Input
                                    secureTextEntry={true}
                                    onChangeText={(password) => this.setState({ password })}
                                    value={this.state.password} />
                            </Item>
                            <Button block success style={{ marginTop: 20 }}
                                onPress={this.onLogin.bind(this)}>
                                <Label style={{ color: 'white', fontSize: 20 }}><Icon type="FontAwesome" name="sign-in" style={{ color: 'white', fontSize: 20}}/> LOGIN </Label>
                            </Button>
    
                            {this.tombolRegister()}
                            <Button transparent success 
                                onPress={() => this.props.navigation.navigate('Reset')}>
                                <Text style={{ color: '#2ecc71', marginTop: 20, marginBottom: 20 }}> Lupa Password ? </Text>
                            </Button>
                        </RkCard>
                    </View>
                </ScrollView>
            );
        }
    }
}
