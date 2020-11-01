import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {ip, viewportWidth} from "@/utils/index";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import FastImage from "react-native-fast-image";

const mapStateToProps = ({brief}: RootState) => {
    return {
        image: brief.image,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;


class ImageBlurBackground extends React.Component<ModelState> {
    render() {
        const {image} = this.props;
        if (!(image && image.length > 0)) return null;
        return (
            <View style={styles.container}>
                <FastImage
                    source={{uri: image}}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <BlurView
                    blurType="dark"
                    blurAmount={10}
                    style={StyleSheet.absoluteFillObject}
                />
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

export default connector(ImageBlurBackground);
