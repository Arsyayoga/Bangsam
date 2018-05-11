import React, { Component } from 'react';
import { View, Text, Alert} from 'react-native';

import Login from './login';
import Home from './home';

export default class IndexApp extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: !navigation.state.params.isLoggedIn ? 'Silahkan Login' : navigation.state.params.title,
            headerStyle: {
                backgroundColor: '#228B22'
            },
            headerTitleStyle: {
                color: 'white'
            },
            headerLeft : navigation.state.params.isLoggedIn && null
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            loggedIn: false,
            loaded: false,
            roleUser : 'masyarakat'
        };
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user && user.emailVerified) {
                this.props.navigation.setParams({'isLoggedIn' : true})
                firebase.database().ref('users/' + user.uid).on('value',(val) => {
                    let dataUser = val.val()
                    // if (dataUser.role == this.props.navigation.state.params.loginType) {
                        //user sudah login
                        let title = dataUser.role == 'masyarakat' ? 'Bangsam Masyarakat' : 'Bangsam Admin'
                        this.props.navigation.setParams({title : title})

                        this.setState({
                            loggedIn: true,
                            loaded: true,
                            roleUser : dataUser.role
                        })
                    // } else {
                    //     // firebase.auth().signOut()
                    //     Alert.alert('Login Gagal', 'Anda Login Sebagai ' + dataUser.role + ', Apakah Anda Yakin Ingin Tetap Masuk ?', [{
                    //         text : 'TIDAK',
                    //         onPress : () => {
                    //             firebase.auth().signOut()
                    //             //user belum login
                    //             this.setState({
                    //                 loaded: true,
                    //                 loggedIn : false
                    //             })
                    //         }
                    //     }, {
                    //         text : 'YA',
                    //         onPress : () => {
                    //             //user belum login
                    //             this.props.navigation.setParams({loginType : dataUser.role})
                    //             setTimeout(() => {
                    //                 this.setState({
                    //                     loaded: true,
                    //                     loggedIn : true
                    //                 })
                    //             }, 3000)
                    //         }
                    //     }])
                    // }
                })
            } else {
                firebase.auth().signOut()
                //user belum login
                this.setState({
                    loaded: true
                })                
            }
        })
    }
    render() {
        if (!this.state.loaded) {
            return (
                <View>
                    <Text> Loading </Text>
                </View>
            );
        } else {
            if (this.state.loggedIn) {
                // Ketika dia login
                return <Home onLogout={() => this.setState({ loggedIn: false })} {...this.props} role={this.props.navigation.state.params.loginType}/>
            } else {
                // Ketika tidak login
                return <Login onLogin={(isLoggedIn) => {
                        this.setState({loaded : false})
                        this.setState({ isLoggedIn })}
                    }
                    {...this.props} />
            }
        }
    }
}
