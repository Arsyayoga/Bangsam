import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Login from './login';
import Home from './home';

export default class IndexApp extends Component {
    static navigationOptions = {
        title: 'Login Masyarakat',
        headerStyle: {
            backgroundColor: '#228B22'
        },
        headerTitleStyle: {
            color: 'white'
        }
    }
    constructor(props) {
        super(props)

        this.state = {
            loggedIn: false,
            loaded: false
        };
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user && user.emailVerified) {
                //user sudah login
                this.setState({
                    loggedIn: true,
                    loaded: true
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
                return <Home onLogout={() => this.setState({ loggedIn: false })} />
            } else {
                // Ketika tidak login
                return <Login onLogin={(isLoggedIn) => this.setState({ isLoggedIn })} {...this.props} />
            }
        }
    }
}
