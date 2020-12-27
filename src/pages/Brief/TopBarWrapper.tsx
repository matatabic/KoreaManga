import React from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import Icon from "@/assets/iconfont";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import Touchable from "@/components/Touchable";
import {Color} from "@/utils/const";
import {hp} from "@/utils/index";

interface IProps {
    goBack: () => void;
    topBarOpacity: Animated.AnimatedInterpolation;
}

class TopBarWrapper extends React.PureComponent<IProps> {

    onPress = () => {
        const {goBack} = this.props;
        if (typeof goBack === 'function') {
            goBack();
        }
    }

    render() {
        const {topBarOpacity} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Touchable onPress={this.onPress} style={styles.leftView}>
                        <Icon name="icon-arrow-left-bold" color='#ccc' size={24}/>
                    </Touchable>
                    <Animated.View style={[styles.rightView, {
                        opacity: topBarOpacity
                    }]}>
                        <Touchable onPress={() => {
                            console.log('123123')
                        }}>
                            <Icon style={styles.rightIcon} name="icon-shangbian" color={Color.white} size={22}/>
                        </Touchable>
                        <Icon style={styles.rightIcon} name="icon-xiabian" color={Color.white} size={22}/>
                        <Icon style={styles.rightIcon} name="icon-more" color={Color.white} size={22}/>
                    </Animated.View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        paddingTop: getStatusBarHeight(),
        height: 45,
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingTop: 15,
        paddingHorizontal: hp(1.5)
    },
    leftView: {
        width: 25,
    },
    rightView: {
        flexDirection: 'row',
    },
    rightIcon: {
        marginHorizontal: 10
    },
})

export default TopBarWrapper;
