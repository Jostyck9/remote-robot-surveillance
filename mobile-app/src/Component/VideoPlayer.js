import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';
import video from '../../assets/test.mp4';

export default class VideoPlayer extends Component {
	render() {
		return (
			<View style={styles.container}>
                <Video source={ video }
                rate={1} volume={1} isMuted={false} resizeMode="cover" shouldPlay
                style={styles.videoContainer}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  	container: {
        width: '100%',
        height: '100%',
  	},
    videoContainer: {
        flex: 1,
    }
});