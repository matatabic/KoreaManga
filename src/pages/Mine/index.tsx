import React, {Component} from 'react';
import {
    Animated,
    Button,
    StyleSheet, TouchableOpacity,
    View,
    Text
} from 'react-native';

export default class AnimatedAnimationDemo extends Component {

    translateY = new Animated.Value(0);
    fontSize = new Animated.Value(0)
    viewSize = new Animated.Value(0)

    constructor(Props:any) {
        super(Props);
        this.state = {
            viewSS:1
        }
    }

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

    change2 = () => {
        Animated.spring(this.fontSize, {
            toValue: 1,
            useNativeDriver: false,
        }).start();
    }

    change3 = () => {
        // Animated.timing(this.viewSize, {
        //     toValue: 1,
        //     useNativeDriver: true
        // }).start()
        this.setState({
            viewSS:1.5
        })
    }

    render() {
        return (
            <Animated.View style={{transform: [{translateY: this.translateY,}]}}>
                <View style={[styles.container,]}>


                </View>
                {/*<Animated.View style={[styles.view1, {*/}
                {/*    transform:*/}
                {/*}]}>*/}
                <Animated.View style={[styles.view1, {
                    // transform: ([{ scaleY: this.state.viewSS }])
                }]}>
                    <Animated.Text style={{
                        fontSize: this.fontSize.interpolate({
                            inputRange: [0, 1],
                            outputRange: [12, 26]
                        })
                    }}>fontSize</Animated.Text>
                    <Button onPress={this.change} title={'change'}/>
                    <Button onPress={this.change1} title={'change1'}/>
                    <Button onPress={this.change2} title={'change2'}/>
                    <Button onPress={this.change3} title={'change3'}/>
                </Animated.View>
            </Animated.View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        backgroundColor: 'green'
    },
    view1: {
        width: '100%',
        // height: 200,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'red'
    }
});
