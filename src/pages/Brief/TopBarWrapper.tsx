import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from "@/assets/iconfont";
import {getStatusBarHeight} from "react-native-iphone-x-helper";


class TopBarWrapper extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.leftView}>
                        <Icon name="icon-arrow-left-bold" color='#ccc' size={24}/>
                    </View>
                    <View style={styles.rightView}>
                        <Icon style={styles.rightIcon} name="icon-shangbian" color='#ccc' size={22}/>
                        <Icon style={styles.rightIcon} name="icon-xiabian" color='#ccc' size={22}/>
                        <Icon style={styles.rightIcon} name="icon-jubao" color='#ccc' size={22}/>
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
        height: 45,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingTop: 15,
    },
    leftView: {
        marginLeft: 6
    },
    rightView: {
        flexDirection: 'row',
    },
    rightIcon: {
        marginHorizontal: 10
    },
})

export default TopBarWrapper;
