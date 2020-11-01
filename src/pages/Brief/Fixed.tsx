import React from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import Icon from "@/assets/iconfont";
import {Color} from "@/utils/const";
import Touchable from "@/components/Touchable";
import {hp, wp} from "@/utils/index";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import ImageTopBar from "@/pages/Brief/ImageTopBar";


class Fixed extends React.PureComponent {
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <ImageTopBar/>
                    <View style={[styles.leftView, {
                        left: 75
                    }]}>
                        <Icon name="icon-shoucang"
                              color={Color.theme}
                              size={25}
                        />
                        <Text style={styles.collected}>{'已收藏'}</Text>
                    </View>
                    <View style={[styles.rightView, {
                        left: 35,
                        transform: [{scale: 0.65}]
                    }]}>
                        <Touchable onPress={() => {
                            console.log('开始阅读')
                        }}>
                            <Text style={[styles.rightTitle, {
                                fontSize: 20
                            }]}>开始阅读</Text>
                        </Touchable>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        height: hp(7),
    },
    container: {
        paddingTop: getStatusBarHeight(),
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
    },
    leftView: {
        width: 75,
        height: hp(7),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    collected: {
        marginLeft: 5
    },
    leftTitle: {
        marginLeft: 8,
    },
    rightView: {
        width: wp(50),
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.red,
        marginHorizontal: 10,
        borderRadius: 35,
    },
    rightTitle: {
        color: Color.grey_title,
    },
})

export default Fixed;
