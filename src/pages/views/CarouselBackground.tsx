import React from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {BlurView} from '@react-native-community/blur';
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {sideHeight} from "@/pages/Home/Carousel";


const mapStateToProps = ({home}: RootState) => {
    return {
        carouselList: home.carouselList,
        activeCarouselIndex: home.activeCarouselIndex,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
}

class CarouselBackground extends React.Component<IProps> {

    render() {
        const {carouselList, activeCarouselIndex} = this.props;
        return (
            carouselList && carouselList.length > 0 &&
            (
                <View>
                    <Image source={{uri: carouselList[activeCarouselIndex].image}} style={styles.image}/>
                    <BlurView
                        blurType="light"
                        blurAmount={10}
                        style={StyleSheet.absoluteFillObject}
                    />
                </View>
            )
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: getStatusBarHeight() + sideHeight + 60,
    }
})

export default connector(CarouselBackground);
