import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

export default class VideoPlayer extends Component {
	render() {
        const { url } = this.props;
        const html = `
            <html>
                <head>
                    <meta http-equiv="content-type" content="text/html; charset=utf-8">
                    <style type="text/css">
                        body {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    </style>
                </head>
                <body>
                    <img src=${url} alt=${url}/>
                </body>
            </html>`

		return (
			<View style={styles.container}>
                <WebView style={styles.videoContainer}
                    containerStyle={styles.webContainer}
                    originWhitelist={['*']}
                    source={{ html: html }}
                />
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
        backgroundColor: 'black',
    },
    webContainer: {
        width: '100%',
        height: '100%',
    }
});