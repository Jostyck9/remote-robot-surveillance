import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Text, FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import socket from '../Service/socket';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 0
		};
	}

	componentDidUpdate = () => {
		const { navigate } = this.props.navigation;
		const { state, url } = this.props.userReducer;
		
		if (state !== 0)
			navigate('Control');
	}
	
	render() {
		const robots = this.props.robotReducer.robots;
		const renderItem = ({ item }) => {
			return (
				<TouchableOpacity style={{ ...styles.subContainer, width: this.state.width }} onPress={() => {socket.emit("connect to robot", item.robotId);}}>
					<Icon name='robot-mower' size={30}/>
					<Text style={{ marginLeft: 15 }}><Text style={styles.text}>{'Robot ID: '}</Text>{item.robotId}</Text>
				</TouchableOpacity>
			);
		}
		const renderSeparator = () => {
			return (
				<View style={styles.separator}/>
			);
		}

		return (
			<SafeAreaView style={styles.container} onLayout={(event) => {this.setState({ width: event.nativeEvent.layout.width })}}>
				<Text style={styles.title}>Robots List</Text>
				<FlatList data={robots} keyExtractor={item => item.robotId} renderItem={renderItem} ItemSeparatorComponent={renderSeparator}/>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
		alignItems: 'center',
		backgroundColor: 'lightgrey'
  	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginVertical: 10
	},
	separator: {
		height: 0.5,
		backgroundColor: 'grey'
	},
	subContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
	},
	text: {
		fontSize: 18,
		fontWeight: '600',
	}
});

const mapStatetoProps = (state) => {
	return ({
		robotReducer: state.robotReducer,
		userReducer: state.userReducer
	});
}

export default connect(mapStatetoProps, {})(Home);