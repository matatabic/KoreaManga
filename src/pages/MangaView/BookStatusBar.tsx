import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getBottomSpace} from "react-native-iphone-x-helper";
import {wp} from "@/utils/index";
import {Color} from "@/utils/const";

interface IProps {
    currentRoast: any
}

class BookStatusBar extends React.Component<IProps> {

    render() {
        const {currentRoast} = this.props;
        console.log(currentRoast)
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>第{currentRoast}回</Text>
                </View>
                <View>
                    <Text style={styles.title}>1/8</Text>
                </View>
                <View>
                    <Text style={styles.title}>16:52</Text>
                </View>
                <View>
                    <Text style={styles.title}>WiFi</Text>
                </View>
                <View>
                    <Text style={styles.title}>电池</Text>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 0,
        borderRadius: 5,
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
