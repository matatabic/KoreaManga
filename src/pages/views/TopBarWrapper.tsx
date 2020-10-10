import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Icon from '@/assets/iconfont/index';
import Touchable from "@/components/Touchable";
import {RootStackNavigation} from "@/navigator/index";

export const NavigatorHeight = 0;
export const TopBarNavigatorHeight = getStatusBarHeight() + NavigatorHeight;

interface IProps {
    navigation: RootStackNavigation;
}

class TopBarWrapper extends React.Component<IProps> {

    goSearch = () => {
        const {navigation} = this.props;
        navigation.navigate('Search');
    }

    render() {
        return (
            <View style={styles.container}>
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
    header: {
        height: 45,
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
