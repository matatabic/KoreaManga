import React from 'react';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {StyleSheet, Text, View, Animated} from "react-native";
import {Color} from "@/utils/const";
import Icon from "@/assets/iconfont";
import Touchable from "@/components/Touchable";

const mapStateToProps = ({brief}: RootState) => {
    return {
        bookInfo: brief.bookInfo,
        book_update_info: brief.book_update_info,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    spin: Animated.AnimatedInterpolation;
    reverse: () => void;
}

class Header extends React.Component<IProps> {

    reverse = () => {
        const {reverse} = this.props;
        if (typeof reverse === "function") {
            reverse();
        }
    }

    render() {
        const {bookInfo, spin} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>{bookInfo.title}</Text>
                    <Text style={styles.status}>{bookInfo.status}</Text>
                </View>
                <View style={styles.changeView}>
                    <View style={styles.huaView}>
                        <Text style={styles.hua}>话</Text>
                    </View>
                    <Touchable onPress={this.reverse}>
                        <Animated.View style={{transform: [{rotate: spin}]}}>
                            <Icon name="icon-qiehuan" size={24}/>
                        </Animated.View>
                    </Touchable>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 100,
    },
    titleView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: Color.white
    },
    status: {
        color: Color.theme
    },
    changeView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: Color.dark,
        borderBottomColor: Color.dark_title,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    huaView: {
        width: 45,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    hua: {
        color: Color.white,
        fontSize: 16,
    }
})

export default connector(Header);
