import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class UserHeader extends Component {
	render() {
        const { role } = this.props;

		return (
			<View style={styles.container}>
                <Text style={styles.text}>{ role }</Text>
			</View>
		);
	}
}

UserHeader.propTypes = {
    role: PropTypes.string
}

UserHeader.defaultProps = {
    role: 'Spectator'
}

const styles = StyleSheet.create({
  	container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center'
  	},
    text: {
        color: '#000',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderBottomRightRadius: 13,
        borderBottomLeftRadius: 13,
        backgroundColor: 'lightgrey'
    }
});