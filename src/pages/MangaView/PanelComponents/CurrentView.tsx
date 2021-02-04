import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {hp} from "@/utils/index";
import {Color} from "@/utils/const";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";

const mapStateToProps = ({brief, mangaView}: RootState) => {
    return {
        statusBarHeight: brief.statusBarHeight,
        currentNumber: mangaView.currentNumber,
        currentEpisodeTotal: mangaView.currentEpisodeTotal,
        pages: mangaView.pagination,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

function CurrentView({currentNumber, currentEpisodeTotal}: ModelState) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{currentNumber}/{currentEpisodeTotal}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: hp(5),
        backgroundColor: Color.black,
        justifyContent: "center",
    },
    title: {
        alignSelf: "center",
        color: Color.white,
        fontWeight: "bold",
    }
})

export default connector(CurrentView);
