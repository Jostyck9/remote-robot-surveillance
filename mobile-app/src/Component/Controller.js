import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ControllerButton from './ControllerButton';

export default class Controller extends Component {
	render() {

		return (
			<View style={styles.container}>
                <View style={styles.subContainer}>
                    <ControllerButton type='up'/>
                    <ControllerButton type='down'/>
                </View>
                <View style={styles.subContainer}>
                    <ControllerButton type='left'/>
                    <ControllerButton type='right'/>
                </View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  	container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '50%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: 0,
  	},
    subContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: '5%'
  	},
});