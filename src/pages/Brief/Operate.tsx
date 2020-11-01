import React from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import Icon from "@/assets/iconfont";
import {Color} from "@/utils/const";
import Touchable from "@/components/Touchable";
import {hp, wp} from "@/utils/index";


interface IProps {
    opacity: Animated.AnimatedInterpolation;
    leftViewX: Animated.AnimatedInterpolation;
    rightViewX: Animated.AnimatedInterpolation;
    rightViewScale: Animated.AnimatedInterpolation;
    rightFontSize: Animated.AnimatedInterpolation;
}

class Operate extends React.Component<IProps> {
    render() {
        const {opacity, leftViewX, rightViewX, rightViewScale, rightFontSize} = this.props;
        return (
            <>
                <Animated.View style={[styles.shadowView, {opacity: opacity}]}/>
                <View style={styles.container}>
                    <View style={styles.spaceView}/>
                    <View style={styles.contentContainer}>
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
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: hp(10),
    },
    spaceView: {
        height: hp(3),
    },
    shadowView: {
        height: hp(10),
        position: "relative",
        top: hp(10),
        left: 0,
        backgroundColor: Color.grey_page_bg,
    },
    contentContainer: {
        height: hp(7),
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
    },
    leftView: {
        width: 75,
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

export default Operate;
