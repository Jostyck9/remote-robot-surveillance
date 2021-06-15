import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import './src/Service/socket';
import Store from './src/Store/Store';
import Home from './src/Screen/Home';
import Control from './src/Screen/Control';

const Stack = createStackNavigator();

export default class App extends Component {
	componentDidMount = () => {
		this.changeScreenOrientation(ScreenOrientation.OrientationLock.LANDSCAPE);
	}

	changeScreenOrientation = async (orientation) => {
		await ScreenOrientation.lockAsync(orientation);
	}

	render() {
		return (
			<Provider store={Store}>
				<StatusBar hidden/>
				<NavigationContainer initialRouteName="Home">
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name='Home' component={Home}/>
						<Stack.Screen name='Control' component={Control}/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		);
	}
}