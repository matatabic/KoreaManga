import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class More extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>正在加载中...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginVertical: 15,
        alignItems: 'center',
    },
    text: {
        fontSize:15,
        color: '#333',
    },
});

export default More;
