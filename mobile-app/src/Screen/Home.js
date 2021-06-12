import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Controller from '../Component/Controller';
import UserHeader from '../Component/UserHeader';
import VideoPlayer from '../Component/VideoPlayer';

export default class Home extends Component {
	render() {
		return (
			<View style={styles.container}>
                <VideoPlayer/>
                <UserHeader role='Master'/>
				<Controller/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
    	backgroundColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center'
  	},
});