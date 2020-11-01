import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import ImageBackground from './ImageBackground'
import {Color} from "@/utils/const";
import Information from "./Information";


class Mine extends Component {

    render() {
        return (
            <>
                <ImageBackground/>
                <View style={styles.spaceView}/>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.detail}>
                            <Information/>
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

});

export default Mine
