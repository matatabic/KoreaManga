import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {ip, viewportWidth} from "@/utils/index";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";


const mapStateToProps = ({brief}: RootState) => {
    return {
        bookInfo: brief.bookInfo,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    imageSize: Animated.AnimatedInterpolation;
}

class ImageBlurBackground extends React.Component<IProps> {
    render() {
        const {bookInfo, imageSize} = this.props;
        return (
            bookInfo && bookInfo.image.length > 0 && (
                <View style={styles.container}>
                    <Animated.Image
                        source={{uri: bookInfo.image}}
                        style={[styles.image, {
                            transform: [{scale: imageSize}]
                        }]}
                        resizeMode={"cover"}
                    />
                    <BlurView
                        blurType="dark"
                        blurAmount={10}
                        style={StyleSheet.absoluteFillObject}
                    />
                </View>
            )
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
