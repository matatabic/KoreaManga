import React from 'react';
import SnapCarousel, {
    ParallaxImage,
    Pagination,
    AdditionalParallaxProps,
} from 'react-native-snap-carousel';
import {viewportWidth, wp, hp} from '@/utils/index';
import {StyleSheet, View} from 'react-native';
import {ICarousel} from '@/models/home';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import FastImage from 'react-native-fast-image';

const sliderWidth = viewportWidth;
const sideWidth = wp(90);
export const sideHeight = hp(30);
const itemWidth = sideWidth + wp(2) * 2;

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

class Carousel extends React.Component<IProps> {

    componentDidMount() {
        this.fetch();
    }

    fetch = () => {
        const {dispatch} = this.props;
        dispatch({
            type: 'home/fetchCarouselList',
        });
    };

    onSnapToItem = (index: number) => {
        const {dispatch} = this.props;
        dispatch({
            type: 'home/setState',
            payload: {
                activeCarouselIndex: index,
            },
        });
    };

    // renderItem = (
    //     {item}: { item: ICarousel },
    //     parallaxProps?: AdditionalParallaxProps,
    // ) => {
    //     return (
    //         <ParallaxImage
    //             source={{uri: item.image}}
    //             style={styles.image}
    //             containerStyle={styles.containerStyle}
    //             parallaxFactor={0.8}
    //             showSpinner
    //             spinnerColor="rgba(0,0,0,0.25)"
    //             {...parallaxProps}
    //         />
    //     );
    // };
    renderItem = (
        {item}: { item: ICarousel }) => {
        return (
            <View>
                <FastImage source={{uri: item.image}} style={styles.containerStyle}/>
            </View>
        );
    };

    get pagination() {
        const {carouselList, activeCarouselIndex} = this.props;
        return (
            <View style={styles.paginationWrapper}>
                <Pagination
                    containerStyle={styles.paginationContainer}
                    activeDotIndex={activeCarouselIndex}
                    dotContainerStyle={styles.dotContainer}
                    dotStyle={styles.dot}
                    dotsLength={carouselList.length}
                    inactiveDotScale={0.7}
                    inactiveDotOpacity={0.4}
                />
            </View>
        );
    }

    render() {
        const {carouselList} = this.props;
        return (
            <View>
                <SnapCarousel
                    data={carouselList}
                    renderItem={this.renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    // hasParallaxImages
                    onSnapToItem={this.onSnapToItem}
                    loop
                    autoplay
                />
                {this.pagination}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        width: itemWidth,
        height: sideHeight,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    paginationWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginationContainer: {
        position: 'absolute',
        top: -20,
        paddingHorizontal: 3,
        paddingVertical: 4,
        borderRadius: 8,
    },
    dotContainer: {
        marginHorizontal: 6,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.92)',
    },
});

export default connector(Carousel);
