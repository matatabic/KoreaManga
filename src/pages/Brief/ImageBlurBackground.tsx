import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {hp, ip, viewportWidth} from "@/utils/index";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import FastImage from "react-native-fast-image";


const mapStateToProps = ({brief}: RootState) => {
    return {
        data: brief.bookInfo,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    imageSize: Animated.AnimatedInterpolation;
}


class ImageBlurBackground extends React.Component<IProps> {
    render() {
        const {data, imageSize} = this.props;
        return (
            data.image.length > 0 &&
            <View style={styles.container}>
                <Animated.Image
                    source={{uri: data.image}}
                    style={[styles.image, {
                        transform: [{scale: imageSize}]
                    }]}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <BlurView
                    blurType="dark"
                    blurAmount={25}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: hp(65),
        overflow: "hidden",
    },
    image: {
        width: viewportWidth,
        height: ip(viewportWidth),
    }
})

export default connector(ImageBlurBackground);
