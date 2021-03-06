import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getBottomSpace} from "react-native-iphone-x-helper";
import {Color} from "@/utils/const";

class Footer extends React.Component {
    render() {
        return (
            <View style={style.container}>
                <Text>评论区</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 1000,
        backgroundColor: Color.page_bg,
        paddingBottom: getBottomSpace()
    }
})

export default Footer;
