import React from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import Icon from "@/assets/iconfont";
import {Color} from "@/utils/const";
import Touchable from "@/components/Touchable";
import {hp, viewportWidth, wp} from "@/utils/index";
import {getStatusBarHeight} from "react-native-iphone-x-helper";


export const TopHeight = getStatusBarHeight() + hp(5);
export const operateHeight = hp(15);
export const operatePaddingTopView = TopHeight;


interface IProps {
    leftViewX: Animated.AnimatedInterpolation;
    rightViewX: Animated.AnimatedInterpolation;
    rightViewScale: Animated.AnimatedInterpolation;
    rightFontSize: Animated.AnimatedInterpolation;
}

class Operate extends React.Component<IProps> {
    render() {
        const {leftViewX, rightViewX, rightViewScale, rightFontSize} = this.props;
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.leftView, {
                    left: leftViewX
                }]}>
                    <Icon name="icon-shoucang"
                          color={Color.theme}
                          size={25}
                    />
                    <Text style={styles.collected}>{'已收藏'}</Text>
                </Animated.View>

                <Animated.View style={[styles.rightView, {
                    left: rightViewX,
                    transform: [{scale: rightViewScale}]
                }]}>
                    <Touchable onPress={() => {
                        console.log('开始阅读')
                    }}>
                        <Animated.Text style={[styles.rightTitle, {
                            fontSize: rightFontSize
                        }]}>开始阅读</Animated.Text>
                    </Touchable>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: viewportWidth,
        height: operateHeight,
        bottom: 0,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    leftView: {
        marginTop: operatePaddingTopView,
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
        marginTop: operatePaddingTopView,
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

export default Operate;
