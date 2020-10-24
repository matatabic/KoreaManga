import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Color} from "@/utils/const";

class End extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>已经没有更多内容！</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 100,
        margin: 10,
        alignItems: 'center',
    },
    text: {
        color: Color.theme,
    },
});

export default End;
