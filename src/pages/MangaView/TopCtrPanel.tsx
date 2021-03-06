import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {Color} from "@/utils/const";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import Icon from "@/assets/iconfont";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import Touchable from "@/components/Touchable";

const mapStateToProps = ({brief, mangaView}: RootState) => {
    return {
        statusBarHeight: brief.statusBarHeight,
        currentTitle: mangaView.currentTitle,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    topPanelValue: Animated.Value;
    goBack: () => void;
}

function TopCtrPanel({statusBarHeight, topPanelValue, currentTitle, goBack}: IProps) {

    const back = () => {
        if (typeof goBack === "function") {
            goBack();
        }
    }

    return (
        <Animated.View style={[styles.wrapper, {
            height: statusBarHeight + getStatusBarHeight(),
            transform: [{translateY: topPanelValue}]
        }]}>
            <View style={styles.container}>
                <View style={styles.leftView}>
                    <Touchable onPress={back} style={styles.backWrapper}>
                        <Icon name="icon-zuofang" color={Color.white} style={styles.leftIcon} size={22}/>
                    </Touchable>
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.title}>第{currentTitle}话</Text>
                </View>
                <View style={styles.rightView}>
                    <Icon name="icon-xiabian" color={Color.white} style={styles.rightIcon} size={22}/>
                    <Icon name="icon-elipsis" color={Color.white} style={styles.rightIcon} size={22}/>
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        ...StyleSheet.absoluteFillObject,
        paddingTop: getStatusBarHeight(),
        backgroundColor: Color.black,
        zIndex: 10
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftView: {
        flex: 1,
    },
    backWrapper: {
        width: 40,
        justifyContent: "center",
    },
    leftIcon: {
        marginLeft: 10,
    },
    titleView: {
        flex: 1,
    },
    title: {
        color: Color.white,
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center",
    },
    rightView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    rightIcon: {
        marginRight: 15,
    },
})

export default connector(TopCtrPanel);
