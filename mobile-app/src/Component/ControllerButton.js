import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;

export default class ControllerButton extends Component {
    getName = () => {
        const { type } = this.props;
        const map = new Map([['up', 'arrow-drop-up'], ['down', 'arrow-drop-down'], ['left', 'arrow-left'], ['right', 'arrow-right']])
        
        return (map.get(type));
    }

	render() {
		return (
			<TouchableOpacity style={styles.container}>
                <Icon name={this.getName()} size={windowWidth / 6}/>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
  	container: {
        width: windowWidth / 4,
        height: windowWidth / 4,
        borderRadius: windowWidth / 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
        marginHorizontal: 5,
        opacity: 0.8
  	},
});