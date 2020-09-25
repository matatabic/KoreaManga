import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {ip, viewportWidth} from "@/utils/index";

interface IProps {
    image: string;
}

class ImageBlurBackground extends React.Component<IProps> {

    render() {
        const {image} = this.props;
        return (
            <View style={StyleSheet.absoluteFillObject}>
                <View style={[{flex: 1, backgroundColor: '#fff'}]}/>
                <View style={styles.container}>
                    <Image source={{uri: image}} style={styles.image}/>
                    <BlurView
                        blurType="dark"
                        blurAmount={10}
                        style={StyleSheet.absoluteFillObject}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: viewportWidth,
        height: ip(viewportWidth),
    },
    image: {
        width: viewportWidth,
        height: ip(viewportWidth),
    }
})

export default ImageBlurBackground;
