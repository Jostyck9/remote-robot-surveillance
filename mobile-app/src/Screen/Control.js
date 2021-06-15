import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { setInit } from '../Actions/userActions';

import Controller from '../Component/Controller';
import UserHeader from '../Component/UserHeader';
import VideoPlayer from '../Component/VideoPlayer';
import socket from '../Service/socket';
import Store from '../Store/Store';

class Control extends Component {
    handleClick = () => {
        const { navigate } = this.props.navigation;

        socket.emit("disconnect from robot");
        Store.dispatch(setInit());
        navigate('Home');
    }

	render() {
        const { state, url } = this.props.userReducer;

		return (
			<View style={styles.container}>
                <VideoPlayer url={url}/>
                <UserHeader role={state === 1 ? 'Master' : 'Spectator' }/>
                <Icon style={styles.icon} name='arrow-back' size={35} color='lightgrey' onPress={() => {this.handleClick()}}/>
                {state === 1 ?
	    			<Controller/> : null
                }
			</View>
		);
	}
}

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
		backgroundColor: 'black'
  	},
    icon: {
        position: 'absolute',
        margin: 5
    }
});

const mapStatetoProps = (state) => {
	return ({
		userReducer: state.userReducer
	});
}

export default connect(mapStatetoProps, {})(Control);