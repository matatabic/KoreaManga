import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import TopBarBackground from "./TopBarBackground";
import Icon from '@/assets/iconfont/index';

export const NavigatorHeight = 60;
export const TopBarNavigatorHeight = getStatusBarHeight() + NavigatorHeight;

class TopBarWrapper extends React.Component {

    get TopTabBarBackground() {
        return (
            <View style={styles.gradient}>
                <TopBarBackground/>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {/*{this.TopTabBarBackground}*/}
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
                    <View style={styles.headerRight}>
                        <Icon name="icon-search" size={25}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        paddingTop: getStatusBarHeight(),
        backgroundColor: 'transparent',
        height: TopBarNavigatorHeight,

    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    header: {
        height: TopBarNavigatorHeight,
        flexDirection: 'row',
        alignItems: 'center',
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
