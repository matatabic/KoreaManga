import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import Dog from "@/assets/image/dog.gif";
import {Color} from "@/utils/const";

class Information extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftView}>
                    <Image source={Dog} style={styles.dog}/>
                    <View style={styles.titleView}>
                        <View><Text style={styles.name}>漫画人000001</Text></View>
                        <View><Text style={styles.tips}>登录更安全,云端同步记录</Text></View>
                    </View>
                </View>
                <View style={styles.rightView}>
                    <View style={styles.login}>
                        <Text style={styles.loginTitle}>登录/注册</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
        marginBottom: 25,
        height: 200,
        backgroundColor: Color.white
    },
    leftView: {
        flexDirection: "row",
        height: 65,
        alignItems: 'center',
    },
    rightView: {
        marginRight: 15,
        width: 90,
        height: 65,
        justifyContent: 'center',
    },
    dog: {
        width: 65,
        height: 65,
    },
    titleView: {
        marginLeft: 8,
    },
    name: {
        fontSize: 17,
    },
    tips: {
        fontSize: 13,
        color: Color.grey_title
    },
    login: {
        height: 46,
        borderRadius: 23,
        borderWidth:2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    },
    loginTitle: {
        fontSize: 15,
    }
})


export default Information;
