import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import ImageBackground from './ImageBackground'
import {Color} from "@/utils/const";
import Information from "./Information";
import BuyList from "./BuyList";
import Balance from "./Balance";
import {ModalStackNavigation} from "@/navigator/index";


interface IProps {
    navigation: ModalStackNavigation;
}

class Mine extends Component<IProps> {


    render() {
        const {navigation} = this.props;
        return (
            <>
                <ImageBackground/>
                <View style={styles.spaceView}/>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.detail}>
                            <Information navigation={navigation}/>
                            <BuyList/>
                            <Balance/>
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
        flex: 1,
        height: 200,
        top: -100,
        marginHorizontal: 15,
        marginBottom: 25,
        backgroundColor: Color.white
    },

});

export default Mine;
