import React, {Component} from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, View, Text, Image} from 'react-native';
import {viewportWidth} from "@/utils/index";
import moon from '@/assets/image/moon.png';

class ImageBackground extends Component {

    render() {
        return (
            <FastImage
                source={moon}
                style={styles.container}
                resizeMode={FastImage.resizeMode.center}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: viewportWidth,
        height: 600,
    },

});

export default ImageBackground
