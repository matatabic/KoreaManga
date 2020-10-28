import React from 'react';
import {Animated, StyleSheet, View, Text} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Icon from '@/assets/iconfont/index';
import Touchable from "@/components/Touchable";
import {RootStackNavigation} from "@/navigator/index";

export const NavigatorHeight = 40;
export const TopBarNavigatorHeight = getStatusBarHeight() + NavigatorHeight;

interface IProps {
    navigation: RootStackNavigation;
    topBarColor: Animated.AnimatedInterpolation;
}

class TopBarWrapper extends React.Component<IProps> {

    goSearch = () => {
        const {navigation} = this.props;
        navigation.navigate('Search');
    }

    render() {
        const {topBarColor} = this.props;
        return (
            <Animated.View style={[styles.container, {
                backgroundColor: topBarColor
            }]}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.headerLeftView}>
                            <Icon name="icon-paihangbang" size={25}/>
                            <Text style={styles.headerText}>榜单</Text>
                        </View>
                        <View style={styles.headerLeftView}>
                            <Icon name="icon-shizhong" size={25}/>
                            <Text style={styles.headerText}>更新</Text>
                        </View>
                        <View style={styles.headerLeftView}>
                            <Icon name="icon-history" size={25}/>
                            <Text style={styles.headerText}>书单</Text>
                        </View>
                        <View style={styles.headerLeftView}>
                            <Icon name="icon-VIP" size={25}/>
                            <Text style={styles.headerText}>VIP</Text>
                        </View>
                    </View>
                    <Touchable onPress={this.goSearch}>
                        <View style={styles.headerRight}>
                            <Icon name="icon-search" size={25}/>
                        </View>
                    </Touchable>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: getStatusBarHeight(),
        zIndex: 100,
        height: TopBarNavigatorHeight,
    },
    header: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        alignItems: "flex-end",
        justifyContent: 'space-between',
    },
    headerLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    headerLeftView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 15
    },
    headerRight: {
        paddingLeft: 35,
        paddingRight: 8,
    }
});


export default TopBarWrapper;
