import React from 'react';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {StyleSheet, Text, View} from "react-native";
import {Color} from "@/utils/const";
import Icon from "@/assets/iconfont";

const mapStateToProps = ({brief}: RootState) => {
    return {
        bookInfo: brief.bookInfo,
        book_update_info: brief.book_update_info,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class Header extends React.Component<ModelState> {
    render() {
        const {bookInfo} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>{bookInfo.title}</Text>
                    <Text style={styles.status}>{bookInfo.status}</Text>
                </View>
                <View style={styles.changeView}>
                    <View style={styles.huaView}>
                        <Text>话</Text>
                    </View>
                    <Icon name="icon-qiehuan" size={24}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        paddingHorizontal: 10,
    },
    titleView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 22,
        fontWeight: "bold"
    },
    status: {
        color: Color.theme
    },
    changeView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    huaView: {
        width: 45,
        height: 25,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.theme,
    }
})

export default connector(Header);