import React, {Component} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {viewportWidth} from "@/utils/index";
import moon from '@/assets/image/moon.png';

interface IProps {
    imageSize: Animated.AnimatedInterpolation;
}

class ImageBackground extends Component<IProps> {

    render() {
        const {imageSize} = this.props;
        return (
            <View style={styles.container}>
                <Animated.Image
                    source={moon}
                    style={[styles.image, {
                        transform: [{scale: imageSize}]
                    }]}
                    resizeMode={"cover"}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: viewportWidth,
        height: 600,
    },
    image: {
        width: viewportWidth,
        height: 600,
    }

});

export default ImageBackground
