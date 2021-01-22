import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {ip, viewportWidth} from "@/utils/index";
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
    statusBarHeight: number;
    fixedOpacity: number;
}

class ImageTopBar extends React.Component<IProps> {

    render() {
        const {data, statusBarHeight} = this.props;
        return (
            data.image.length > 0 && (<View style={[styles.container, {
                height: statusBarHeight + 30,
                opacity: 1
            }]}>
                <FastImage
                    source={{uri: data.image}}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <BlurView
                    blurType="dark"
                    blurAmount={25}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>)
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: viewportWidth,
        overflow: "hidden",
    },
    image: {
        width: viewportWidth,
        height: ip(viewportWidth),
    }
})

export default connector(ImageTopBar);
