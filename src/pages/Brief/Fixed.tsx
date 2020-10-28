import React from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import Icon from "@/assets/iconfont";
import {Color} from "@/utils/const";
import Touchable from "@/components/Touchable";
import {hp, viewportWidth, wp} from "@/utils/index";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import ImageTopBar from "@/pages/Brief/ImageTopBar";

export const TopHeight = getStatusBarHeight() + hp(5);
export const operateHeight = hp(15);
export const operatePaddingTopView = TopHeight;


class Fixed extends React.PureComponent {
    render() {
        return (
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: viewportWidth,
        paddingTop: getStatusBarHeight(),
        height: operateHeight - operatePaddingTopView,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    leftView: {
        marginLeft: 25,
        width: 75,
        height: operateHeight - operatePaddingTopView,
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
        width: wp(65),
        height: operateHeight - operatePaddingTopView,
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
