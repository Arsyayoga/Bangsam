import React, { Component } from 'react';
import {  View, Text, Picker} from 'react-native';
import {
	RkCard,
	RkText,
	RkButton
} from 'react-native-ui-kitten'

export default class AmbilSampah extends Component {
	static navigationOptions = ({navigation}) => {
		return {
			title : navigation.state.params ? navigation.state.params.title : 'Order Detail'
		}
	}

	constructor(props) {
	  super(props)
	
	  this.state = {
		 data : {},
		 dataKey : '',
		 selectedDriver : '',
	  };
	};
	
	getDataSampah(orderid) {
		firebase.database().ref('orders')
			.orderByChild('orderid')
			.equalTo(orderid)
			.on('child_added', (results) => {
				this.setState({
					data : results.val(),
					dataKey : results.key
				}, () => {
					this.props.navigation.setParams({title : this.state.data.orderid})
				})
			})
	}
	
	renderDriver() {
		return (
			<Picker
				selectedValue={this.state.selectedDriver}
				onValueChange={(selectedDriver) => this.setState({selectedDriver})}>
				<Picker.Item label="George Sua" value="99201"/>
				<Picker.Item label="Kevin George" value="99202"/>
			</Picker>
		)
	}

	componentDidMount() {
		const {params} = this.props.navigation.state
		this.getDataSampah(params.orderid)
	}

	prosessAmbil() {
		if (this.state.dataKey) {
			let updates = {}
			updates['/orders/' + this.state.dataKey + '/driverid'] = this.state.selectedDriver
			updates['/orders/' + this.state.dataKey + '/status'] = 'process'
			firebase.database().ref().update(updates)

			// KEMBALI KE HOME
			this.props.navigation.goBack()
		}
	}

	render() {
	  	const {data} = this.state
		return (
			<RkCard rkType="shadowed">
				<View rkCardHeader>
					<RkText>{"Order : #" + data.orderid}</RkText>
				</View>
				<View rkCardContent>
					<RkText>{"Nama : " + data.name}</RkText>
					<RkText>{"Alamat : " + data.alamat}</RkText>
				</View>
				
				<View rkCardContent>
					<RkText>Pilih Driver</RkText>
					{this.renderDriver()}
				</View>

				<View rkCardFooter>
					<RkButton rkType="primary large" onPress={this.prosessAmbil.bind(this)}>
						Ambil Sampah Sekarang
					</RkButton>
				</View>

			</RkCard>
		);
	}
}
