import React from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import Icon from "@/assets/iconfont";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import Touchable from "@/components/Touchable";
import {Color} from "@/utils/const";


interface IProps {
    statusBarHeight: number;
    goBack: () => void;
    fixedOpacity: number,
    opacity: Animated.AnimatedInterpolation;
}

class TopBarWrapper extends React.Component<IProps> {

    goBack = () => {
        const {goBack} = this.props;
        if (typeof goBack === 'function') {
            goBack();
        }
    }

    render() {
        const {statusBarHeight, opacity, fixedOpacity} = this.props;

        return (
            fixedOpacity === 1 ?
                <View style={[styles.wrapper, {
                    height: statusBarHeight + getStatusBarHeight(),
                    width: 50,
                }]}>
                    <Touchable onPress={this.goBack}>
                        <View style={styles.backView}>
                            <Icon name="icon-zuofang" color={Color.white} size={22}/>
                        </View>
                    </Touchable>
                </View>
                :
                <View style={[styles.wrapper, {
                    height: statusBarHeight + getStatusBarHeight()
                }]}>
                    <View style={styles.container}>
                        <View style={styles.leftView}>
                            <Touchable onPress={this.goBack}>
                                <Icon name="icon-zuofang" color={Color.white} size={22}/>
                            </Touchable>
                        </View>
                        <Animated.View style={[styles.rightView, {
                            opacity: opacity,
                        }]}>
                            <Touchable onPress={() => {
                                console.log('shangbian')
                            }}>
                                <Icon style={styles.rightIcon} name="icon-shangbian" color={Color.white} size={22}/>
                            </Touchable>
                            <Touchable onPress={() => {
                                console.log('xiabian')
                            }}>
                                <Icon style={styles.rightIcon} name="icon-xiabian" color={Color.white} size={22}/>
                            </Touchable>
                            <Touchable onPress={() => {
                                console.log('more')
                            }}>
                                <Icon style={styles.rightIcon} name="icon-more" color={Color.white} size={22}/>
                            </Touchable>
                        </Animated.View>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 20,
    },
    container: {
        flex: 1,
        paddingTop: getStatusBarHeight(),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10
    },
    backView: {
        paddingTop: getStatusBarHeight(),
        height: '100%',
        flexDirection: "row",
        alignItems: 'center',
        marginHorizontal: 10,
    },
    leftView: {
        height: '100%',
        flexDirection: "row",
        alignItems: 'center',
    },
    rightView: {
        height: '100%',
        flexDirection: "row",
        alignItems: 'center',
    },
    rightIcon: {
        marginHorizontal: 10
    },
})

export default TopBarWrapper;
