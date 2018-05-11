import React, { Component } from 'react';
import {  View, } from 'react-native';
import {
    Button,
    Footer,
    FooterTab,
    Text,
    Container,
    Content,
    StyleProvider } from 'native-base';

import getTheme from '../../../native-base-theme/components'
import commonTheme from '../../../native-base-theme/variables/commonColor'
import { RkButton } from 'react-native-ui-kitten';

// PAGE BANGSAM
import ListOrder from './listorders';
	
export default class BangSamPage extends Component {
	constructor(props) {
	  super(props)
	
	  this.state = {
		page : <View></View>,
		activePage : 'listorder'
	  };
	};
	
	footerMenu() {
        return (
            <Footer>
                <FooterTab>
					<Button
						active={this.state.activePage == 'listorder' ? true : false}
						onPress={() => this.getPage('listorder')}>
                        <Text>Home</Text>
                    </Button>
                    <Button
						active={this.state.activePage == 'users' ? true : false}
						onPress={() => this.getPage('users')}>
                        <Text>Users</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }

	getPage(page) {
		let pageView = <View></View>
		if (page == 'listorder') {
			pageView = <ListOrder {...this.props}/>
		}

		this.setState({
			page : pageView,
			activePage : page
		})
	}

	componentDidMount() {
		// GET DEFAULT PAGE
		this.getPage('listorder')
	}

	render() {
		return (
			<StyleProvider style={getTheme(commonTheme)}>
				<Container>
					<Content>
						{this.state.page}
					</Content>
					{this.footerMenu()}
				</Container>
			</StyleProvider>
		);
	}
}
