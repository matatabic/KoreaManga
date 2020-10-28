import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {hp, ip, viewportWidth, wp} from "@/utils/index";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
// import {operateHeight, showFixedViewH} from "@/pages/Brief/index";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import FastImage from "react-native-fast-image";

export const imageWidth = wp(33);
export const imageHeight = wp(ip(33));
export const TopHeight = getStatusBarHeight() + hp(5);
export const headerHeight = hp(40);
export const operateHeight = hp(15);
export const operatePaddingTopView = TopHeight;
const startHeight = (headerHeight / 2) - TopHeight;
const endHeight = headerHeight - operateHeight;
export const showFixedViewH = headerHeight - operateHeight + hp(5);

const mapStateToProps = ({brief}: RootState) => {
    return {
        image: brief.image,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;


class ImageTopBar extends React.Component<ModelState> {

    render() {
        const {image} = this.props;
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
        height: hp(40)-showFixedViewH,
        overflow:"hidden"
    },
    image: {
        width: viewportWidth,
        height: ip(viewportWidth),
    }
})

export default connector(ImageTopBar);
