import React from 'react';
import {View, FlatList, NativeSyntheticEvent, NativeScrollEvent, ListRenderItemInfo, StyleSheet} from 'react-native';
import Carousel, {sideHeight} from "@/pages/Home/Carousel";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RootStackNavigation} from "@/navigator/index";
import {IBookCover, ICommendList} from "@/models/home";
import CommendItem from "./CommendItem";
import TopBarWrapper, {TopBarNavigatorHeight} from "@/pages/views/TopBarWrapper";
import CarouselBackground from "@/pages/views/CarouselBackground";


const mapStateToProps = ({home}: RootState) => {
    return {
        commendList: home.commendList,
        gradientVisible: home.gradientVisible,
    };
};

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {
    navigation: RootStackNavigation;
}

class Home extends React.Component<IProps> {

    componentDidMount() {
        this.fetch();
    }

    fetch = () => {
        const {dispatch} = this.props;
        dispatch({
            type: 'home/fetchCommendList',
        });
    };

    get header() {
        return (
            <View>
                <View style={styles.imageBackground}>
                    <CarouselBackground/>
                </View>
                <View style={styles.carouselTop}>
                    <Carousel/>
                </View>
            </View>
        );
    }

    goBrief = (data: IBookCover) => {
        const {navigation} = this.props;
        navigation.navigate('Brief', {
            item: data,
        });
    };

    onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = nativeEvent.contentOffset.y;
        let newGradientVisible = offsetY < sideHeight;
        const {dispatch, gradientVisible,} = this.props;
        if (gradientVisible !== newGradientVisible) {
            dispatch({
                type: 'home/setState',
                payload: {
                    gradientVisible: newGradientVisible,
                },
            });
        }
    };

    renderItem = ({item}: ListRenderItemInfo<ICommendList>) => {
        return <CommendItem data={item} goBrief={this.goBrief}/>;
    };

    render() {
        const {commendList} = this.props;
        return (
            <View>
                <FlatList
                    ListHeaderComponent={this.header}
                    keyExtractor={(item, key) => `item-${key}`}
                    data={commendList}
                    renderItem={this.renderItem}
                    onScroll={this.onScroll}
                />
                <TopBarWrapper/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageBackground: {
        ...StyleSheet.absoluteFillObject
    },
    carouselTop: {
        paddingTop: TopBarNavigatorHeight,
    },
})

export default connector(Home);
