import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


class History extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>123</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'red'
    }
})

export default History;
