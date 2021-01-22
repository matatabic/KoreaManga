import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {Color} from "@/utils/const";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {ip, wp} from "@/utils/index";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import FastImage from "react-native-fast-image";
import ErrorImage from "@/assets/image/error.png";


const mapStateToProps = ({brief}: RootState) => {
    return {
        data: brief.bookInfo,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    statusBarHeight: number,
    opacity: Animated.AnimatedInterpolation;
}

interface IState {
    errorLoad: boolean;
}

const imageWidth = wp(30);
const imageHeight = ip(imageWidth);

class Information extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            errorLoad: false,
        }
    }

    showError = () => {
        this.setState({
            errorLoad: true
        })
    };

    render() {
        const {data, statusBarHeight, opacity} = this.props;
        const {errorLoad} = this.state;
        const loadImage = errorLoad ? ErrorImage : {uri: data.image, cache: FastImage.cacheControl.immutable};
        return (
            data.image.length > 0 &&
            <Animated.View style={[styles.container, {
                paddingTop: getStatusBarHeight() + statusBarHeight,
                opacity: opacity,
            }]}>
                <View style={styles.leftView}>
                    <FastImage
                        source={loadImage}
                        onError={this.showError}
                        style={styles.image}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                </View>
                <View style={styles.rightView}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.bulletin}>{data.status}</Text>
                    <Text style={styles.bulletin}>{data.author}</Text>
                    <Text style={styles.bulletin}>{data.category}</Text>
                </View>
            </Animated.View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        position: "relative",
        zIndex: 5000,
        bottom: -30,
        flexDirection: "row",
    },
    leftView: {
        marginLeft: 20,
    },
    rightView: {
        marginLeft: 20,
    },
    title: {
        color: Color.grey_title,
        fontSize: 18,
        marginTop: 5,
        marginBottom: 12,
    },
    bulletin: {
        color: Color.grey_title,
        fontSize: 15,
        marginBottom: 12,
    },
    image: {
        width: imageWidth,
        height: imageHeight,
    },
})

export default connector(Information);
