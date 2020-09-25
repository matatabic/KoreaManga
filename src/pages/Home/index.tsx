import React from 'react';
import {View, FlatList, NativeSyntheticEvent, NativeScrollEvent, ListRenderItemInfo, StyleSheet} from 'react-native';
import Carousel, {sideHeight} from "@/pages/Home/Carousel";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RootStackNavigation} from "@/navigator/index";
import {IBookCover, ICommendList} from "@/models/home";
import CommendItem from "./CommendItem";
import TopBarWrapper, {TopBarNavigatorHeight} from "@/pages/views/TopBarWrapper";
import CarouselBlurBackground from "@/pages/views/CarouselBlurBackground";


const mapStateToProps = ({home}: RootState) => {
    return {
        commendList: home.commendList,
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
                <CarouselBlurBackground/>
                <View style={styles.carouselTop}>
                    <Carousel/>
                </View>
            </View>
        );
    }

    goBrief = (data: IBookCover) => {
        const {navigation} = this.props;
        navigation.navigate('Brief', {
            data: data
        });
    };

    onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = nativeEvent.contentOffset.y;
        let newGradientVisible = offsetY < sideHeight;
        const {dispatch} = this.props;

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
    carouselTop: {
        paddingTop: TopBarNavigatorHeight,
    },
})

export default connector(Home);
