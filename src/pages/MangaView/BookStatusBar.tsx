import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getBottomSpace} from "react-native-iphone-x-helper";
import {wp} from "@/utils/index";
import {Color} from "@/utils/const";

interface IProps {
    batteryLevel: string;
    connectionType: string;
    currentTime: string;
    currentEpisodeTotal: number;
    currentChapterNum: number;
    currentNumber: number;
}

class BookStatusBar extends React.Component<IProps> {

    render() {
        const {
            batteryLevel,
            connectionType,
            currentTime,
            currentEpisodeTotal,
            currentNumber,
            currentChapterNum
        } = this.props;

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>第{currentChapterNum}回</Text>
                </View>
                <View>
                    <Text style={styles.title}>{`${currentNumber}/${currentEpisodeTotal}`}</Text>
                </View>
                <View>
                    <Text style={styles.title}>{currentTime}</Text>
                </View>
                <View>
                    <Text style={styles.title}>{connectionType.toLocaleUpperCase()}</Text>
                </View>
                <View>
                    <Text style={styles.title}>{`电池${batteryLevel}%`}</Text>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 0,
        borderTopLeftRadius: 10,
        bottom: getBottomSpace(),
        width: wp(60),
        height: 30,
        backgroundColor: Color.translucent,
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
    },
    title: {
        color: Color.white,
    }
})

export default BookStatusBar;
