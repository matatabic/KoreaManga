import React from 'react';
import {View, Text, Image, StyleSheet, Animated} from 'react-native';
import {Color} from "@/utils/const";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {hp, ip, wp} from "@/utils/index";
import {getStatusBarHeight} from "react-native-iphone-x-helper";


const mapStateToProps = ({brief}: RootState) => {
    return {
        bookInfo: brief.bookInfo,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    opacity: Animated.AnimatedInterpolation;
}

const imageWidth = wp(33);
const imageHeight = ip(imageWidth);

class Information extends React.Component<IProps> {
    render() {
        const {bookInfo, opacity} = this.props;
        return (
            <Animated.View style={[styles.wrapper, {
                opacity: opacity
            }]}>
                <View style={styles.container}>
                    <View style={styles.leftView}>
                        <Image source={{uri: bookInfo.image}} style={styles.image}/>
                    </View>
                    <View style={styles.rightView}>
                        <Text style={styles.title}>{bookInfo.title}</Text>
                        <Text style={styles.bulletin}>{bookInfo.status}</Text>
                        <Text style={styles.bulletin}>{bookInfo.author}</Text>
                        <Text style={styles.bulletin}>{bookInfo.category}</Text>
                    </View>
                </View>
            </Animated.View>
        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        paddingTop: getStatusBarHeight(),
        height: hp(25),
        zIndex: 99999,
    },
    container: {
        flexDirection: "row",
        position: "absolute",
        left: 0,
        bottom: -hp(13),
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
