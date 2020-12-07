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
        data: brief.bookInfo,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
}

class ImageTopBar extends React.Component<IProps> {

    render() {
        const {data} = this.props;
        return (
            <View style={styles.container}>
                <FastImage
                    source={{uri: data.image}}
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
