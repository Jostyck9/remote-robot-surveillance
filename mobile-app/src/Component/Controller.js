import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { RNGamePadSingle } from 'react-native-game-pad/components/single/single-joystick-buttons';
import { WebView } from 'react-native-webview';

export default class Controller extends Component {
	render() {

		return (
			<View style={styles.container}>
                <WebView 
                />
                <RNGamePadSingle
                    options={{
                        size: 40,
                        color: 'white'
                    }}
                />
			</View>
		);
	}
}

const styles = StyleSheet.create({
  	container: {
        width: '50%',
        height: '50%',
        position: 'absolute',
  	},
});