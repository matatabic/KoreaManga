import React from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {sideHeight} from "@/pages/Home/Carousel";
import {BlurView} from '@react-native-community/blur';
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {TopBarNavigatorHeight} from "@/pages/views/TopBarWrapper";

const TopBarBackgroundImageHeight = sideHeight + getStatusBarHeight() * 2 + TopBarNavigatorHeight;

const mapStateToProps = ({home}: RootState) => {
    return {
        carousels: home.carousels,
        activeCarouselIndex: home.activeCarouselIndex,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
}

class TopBarBackground extends React.Component<IProps> {

    render() {
        const {carousels, activeCarouselIndex} = this.props;
        return (
            carousels && carousels.length > 0 &&
            <View>
                <Image source={{uri: carousels[activeCarouselIndex].image}} style={styles.image}/>
                <BlurView
                    blurType="light"
                    blurAmount={10}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: TopBarBackgroundImageHeight,
    }
})

export default connector(TopBarBackground);
