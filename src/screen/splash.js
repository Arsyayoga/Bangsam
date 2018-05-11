import React, { Component } from 'react';
import { ActivityIndicator, View, Text, Image, StyleSheet, StatusBar, ScrollView} from 'react-native';

import {
	Button, Header, Left, Body, Container, Content, Title
} from 'native-base'

import Home from "./home";
import Login from './index'

class HeaderApp extends Component {
	render() {
		return (
			<Header
				androidStatusBarColor="green"
				style={{backgroundColor : 'green'}}>
				<Body>
					<Title>{this.props.title}</Title>
				</Body>
			</Header>
		)
	}
}

export default class SplashScreen extends Component {
	static navigationOptions = ({navigation}) => {
		return {
			header : navigation.state.params ? navigation.state.params.isLoggedIn ? <HeaderApp title={navigation.state.params.title}/> : null : null,
			title : 'HOME'
		}
	}

	constructor(props) {
	  super(props)
	
	  this.state = {
		 isLoggedIn : false,
		 loaded : true
	  };
	};
		
	renderSplash() {
		return (
				<View style={styles.container}>
					<StatusBar
						backgroundColor="#FEFEFE"
						barStyle="dark-content"
					/>
					<Image
						style={styles.logo}
						source={require('../assets/img/logo.png')}/>
					<Text
						style={styles.titleApp}> BANGSAM APPLICATION </Text>
					
					<View style={styles.tempatBtn}>
						<Button
							success
							block
							large
							style={styles.btn}
							onPress={() => this.props.navigation.navigate('Screen', {'loginType' : 'masyarakat'})}>
							<Text style={styles.btnText}>LOGIN MASYARAKAT</Text>
						</Button>
						<Button
							success
							block
							large
							style={styles.btn}
							onPress={() => this.props.navigation.navigate('Screen', {'loginType' : 'bangsampah'})}>
							<Text style={styles.btnText}>LOGIN BANGSAMPAH</Text>
						</Button>
					</View>
				</View>
		)
	}

	componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user && user.emailVerified) {
				firebase.database().ref('users/' + user.uid).on('value', (results) => {
					this.props.navigation.setParams({isLoggedIn : true})
					this.setState({
						isLoggedIn : true,
						loaded : false,
						role : results.val().role
					})
				})
			} else {
				this.props.navigation.setParams({isLoggedIn : false})
				this.setState({
					isLoggedIn : false,
					loaded : false,
				})
			}
		})
	}
	
	render() {
		if (this.state.loaded) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color="#0000ff" size={90} />
				</View>
			)
		} else {
			if (this.state.isLoggedIn) {
				return (
					<Home
						{...this.props}
						role={this.state.role}
						onLogout={() => this.setState({ loggedIn: false })}/>
				)
			} else {
				return (
					// <ScrollView style={styles.root}>
					// 	{this.renderSplash()}
					// </ScrollView>
					<Login
						{...this.props}
						onLogin={(isLoggedIn) => {
                        this.setState({loaded : false})
                        this.setState({ isLoggedIn })}
                    }/>
				)
			}
		}
	}
}

const styles = StyleSheet.create({
	root : {
		backgroundColor : '#FEFEFE',
		paddingTop: 40,
		paddingBottom: 40,
		flex : 1
	},
	container : {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FEFEFE',
		flex : 1,
		padding: 20,
	},
	logo : {
		width : 200,
		height : 200
	},
	titleApp : {
		fontSize: 20,
		fontWeight: 'bold',
	},
	btnText : {
		color : '#FEFEFE'
	},
	tempatBtn: {
		width : 250,
		flex : 1,
		marginTop: 50,
	},
	btn : {
		marginBottom: 10,
	}
})