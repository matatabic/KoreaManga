import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import ImageBackground from './ImageBackground'
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {Color} from "@/utils/const";
import Dog from "@/assets/image/dog.gif";

class Mine extends Component {

    render() {
        return (
            <>
                <ImageBackground/>
                <View style={styles.spaceView}/>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.detail}>
                            <View style={styles.information}>
                                <View style={styles.leftView}>
                                    <View>
                                        <Image source={Dog} style={styles.dog}/>
                                    </View>
                                    <View>
                                        <View><Text>漫画人000001</Text></View>
                                        <View><Text>登录更安全,云端同步记录</Text></View>
                                    </View>
                                </View>
                                <View style={styles.rightView}>
                                    <Text>登录/注册</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </ScrollView>

            </>
        );
    }
}

const styles = StyleSheet.create({
    spaceView: {
        ...StyleSheet.absoluteFillObject,
        marginTop: 500,
        backgroundColor: Color.grey_page_bg
    },
    container: {
        height: 800,
        marginTop: 250,
        backgroundColor: Color.grey_page_bg,
    },
    detail: {
        ...StyleSheet.absoluteFillObject,
        top: -100,
    },
    information: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
        height: 200,
        backgroundColor: Color.white
    },
    leftView: {
        flexDirection: "row",
    },
    rightView: {},
    dog: {
        width: 75,
        height: 75,
    }
});

export default Mine
