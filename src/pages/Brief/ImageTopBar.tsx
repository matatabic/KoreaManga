import React from 'react';
import {StyleSheet, Animated} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {ip, viewportWidth} from "@/utils/index";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import FastImage from "react-native-fast-image";


const mapStateToProps = ({brief}: RootState) => {
    return {
        data: brief.bookInfo,
        statusBarHeight: brief.statusBarHeight,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    statusBarHeight: number;
    opacity: Animated.AnimatedInterpolation;
}

class ImageTopBar extends React.Component<IProps> {

    render() {
        const {data, statusBarHeight, opacity} = this.props;
        return (
            data.image.length > 0 &&
            <Animated.View style={[styles.container, {
                height: statusBarHeight + 30,
                opacity: opacity
            }]}>
                <FastImage
                    source={{uri: data.image}}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <BlurView
                    blurType="dark"
                    blurAmount={25}
                    style={StyleSheet.absoluteFillObject}
                />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        overflow: "hidden",
    },
    image: {
        width: viewportWidth,
        height: ip(viewportWidth),
    }
})

export default connector(ImageTopBar);
