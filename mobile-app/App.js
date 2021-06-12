import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

import Home from './src/Screen/Home';

export default class App extends Component {
	componentDidMount = () => {
		this.changeScreenOrientation(ScreenOrientation.OrientationLock.LANDSCAPE);
	}

	changeScreenOrientation = async (orientation) => {
		await ScreenOrientation.lockAsync(orientation);
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar hidden/>
				<Home/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
    	backgroundColor: '#fff',
  	},
});