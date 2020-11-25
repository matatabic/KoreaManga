import React from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';
import {
    MaterialTopTabBar,
    MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import Touchable from '@/components/Touchable';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {Color} from "@/utils/const";
import TopBatItem from "@/pages/Category/Item/TopBatItem";
import {IStatus} from "@/models/category";
import {getStatusBarHeight} from "react-native-iphone-x-helper";


class ShelfTopBar extends React.PureComponent<MaterialTopTabBarProps> {

    editBtn = () => {
        console.log('editBtn')
    };

    render() {
        let {indicatorStyle, activeTintColor, ...restProps} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.topTabBarView}>
                    <MaterialTopTabBar
                        {...restProps}
                        indicatorStyle={indicatorStyle}
                        activeTintColor={activeTintColor}
                        style={styles.tabBar}
                    />
                    <Touchable
                        style={styles.editBtn}
                        onPress={this.editBtn}>
                        <Text style={styles.text}>编辑</Text>
                    </Touchable>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: getStatusBarHeight(),
        backgroundColor: Color.theme,
    },
    topTabBarView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: Color.light_btn,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    tabBar: {
        flex: 1,
        marginLeft: 25,
        elevation: 0,
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    editBtn: {
        paddingHorizontal: 15,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderColor: Color.light_btn,
    },
    text: {
        color: Color.white,
        fontSize: 15,
    },
});

export default ShelfTopBar;
