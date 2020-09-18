import React, {Component} from 'react';
import {
    Animated,
    Button,
    StyleSheet, TouchableOpacity,
    View,
} from 'react-native';

export default class AnimatedAnimationDemo extends Component {

    translateY = new Animated.Value(0);

    change = () => {
        Animated.spring(this.translateY, {
            toValue: -200,
            useNativeDriver: true,
        }).start();
    }

    change1 = () => {
        Animated.spring(this.translateY, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    }

    render() {
        return (
            <Animated.View style={{transform: [{translateY: this.translateY}]}}>
                <View style={[styles.container,]}>


                </View>
                <View style={{width: '100%', height: 200, justifyContent: 'center', alignItems: "center", backgroundColor: 'red'}}>
                    <Button onPress={this.change} title={'change'}/>
                    <Button onPress={this.change1} title={'change1'}/>
                </View>
            </Animated.View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        backgroundColor: 'green'
    }
});
