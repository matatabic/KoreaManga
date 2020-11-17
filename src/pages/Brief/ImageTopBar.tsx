import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {hp, ip, viewportWidth, wp} from "@/utils/index";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import FastImage from "react-native-fast-image";
import {getStatusBarHeight} from "react-native-iphone-x-helper";


const mapStateToProps = ({brief}: RootState) => {
    return {
        bookInfo: brief.bookInfo,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;


class ImageTopBar extends React.Component<ModelState> {

    render() {
        const {bookInfo} = this.props;
        return (
            <View style={styles.container}>
                <FastImage
                    source={{uri: bookInfo.image}}
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
        height: hp(6) + getStatusBarHeight(),
        overflow: "hidden"
    },
    image: {
        width: viewportWidth,
        height: ip(viewportWidth),
    }
})

export default connector(ImageTopBar);
