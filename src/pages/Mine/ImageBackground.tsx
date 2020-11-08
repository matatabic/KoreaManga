import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {viewportWidth} from "@/utils/index";
import moon from '@/assets/image/moon.png';


class ImageBackground extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={moon}
                    style={styles.image}
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
