import React, { Component } from 'react';
import { ScrollView, View, Text, } from 'react-native';
import {
	RkCard,
	RkText,
	RkButton
} from 'react-native-ui-kitten'

export default class ListOrders extends Component {
	constructor(props) {
	  super(props)
	
	  this.state = {
		 orders : []
	  };
	};
	
	getListOrder() {
		firebase.database().ref('orders').on('value', (results, orderID) => {
			let orders = results.val()
			if (orders) {
				this.setState({ orders })
			}
		})
	}

	listOrderView() {
		return (
			<View>
				{this.state.orders.map((order, index) => {
					return (
						<RkCard rkType="shadowed" key={index}>
							<View rkCardHeader>
								<RkText>{"Order : #" + order.orderid}</RkText>
							</View>
							<View rkCardContent>
								<RkText>{"Nama : " + order.name}</RkText>
								<RkText>{"Alamat : " + order.alamat}</RkText>
								<RkText>{"Status : " + order.status}</RkText>
							</View>
			
							<View rkCardFooter>
								<RkButton rkType="small outline">Lihat Map</RkButton>
								<RkButton rkType="small primary" onPress={() => this.props.navigation.navigate('AmbilSampah', {orderid : order.orderid})}>Ambil Sampah</RkButton>
							</View>
						</RkCard>
					)
				})}
			</View>
		)
	}
	
	componentDidMount() {
		this.getListOrder()
	}

	render() {
		return (
			<ScrollView style={{padding : 10}}>
				{this.listOrderView()}
				<RkButton onPress={() => this.props.btnLogout()}>Logout</RkButton>
			</ScrollView>
		);
	}
}
