import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Animated} from 'react-native';
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

    translateY = new Animated.Value(0)

    getBgImageSize = () => {
        return this.translateY.interpolate({
            inputRange: [-100, 0],
            outputRange: [1.3, 1],
            extrapolate: "clamp",
        })
    }

    render() {
        const {navigation} = this.props;
        const imageSize = this.getBgImageSize();
        return (
            <>
                <ImageBackground imageSize={imageSize}/>
                <View style={styles.spaceView}/>
                <ScrollView
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                    [{
                        nativeEvent: {contentOffset: {y: this.translateY}}
                    }],
                    {
                        useNativeDriver: false,
                    },
                )}>
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
