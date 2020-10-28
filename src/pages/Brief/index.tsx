import React from 'react';
import {View, StyleSheet, FlatList, ListRenderItemInfo, Animated, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import {RootState} from "@/models/index";
import {RouteProp} from "@react-navigation/native";
import {RootStackNavigation, RootStackParamList} from "@/navigator/index";
import {connect, ConnectedProps} from "react-redux";
import {IChapter, initialState} from "@/models/brief";
import ImageBlurBackground from "@/pages/Brief/ImageBlurBackground";
import {hp, ip, viewportWidth, wp} from "@/utils/index";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {Color} from "@/utils/const";
import Item from "./Item";
import TopBarWrapper from "./TopBarWrapper";
import Footer from "./Footer";
import Operate from "./Operate";
import Information from "./Information";
import BookInfo from "./BookInfo";
import Fixed from "./Fixed";


export const imageWidth = wp(33);
export const imageHeight = wp(ip(33));
export const TopHeight = getStatusBarHeight() + hp(5);
export const headerHeight = hp(40);
export const operateHeight = hp(15);
const startHeight = (headerHeight / 2) - TopHeight;
const endHeight = headerHeight - operateHeight;
export const showFixedViewH = headerHeight - operateHeight + hp(5);


const mapStateToProps = ({brief}: RootState, {route}: { route: RouteProp<RootStackParamList, 'Brief'> }) => {
    const {id} = route.params;
    return {
        id,
        image: brief.image,
        chapterList: brief.chapterList,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    route: RouteProp<RootStackParamList, 'Brief'>
    navigation: RootStackNavigation;
}

interface IState {
    showFixed: boolean,
}

class Brief extends React.PureComponent<IProps, IState> {

    showFixedViewH = showFixedViewH;
    translateY = new Animated.Value(0)

    constructor(props: IProps) {
        super(props);
        this.state = {
            showFixed: false,
        }
    }

    componentDidMount() {
        this.loadData();
    }

    getOpacity = () => {
        return this.translateY.interpolate({
            inputRange: [startHeight, endHeight],
            outputRange: [1, 0],
            extrapolate: "clamp",
        })
    }

    getLeftViewX = () => {
        return this.translateY.interpolate({
            inputRange: [startHeight, endHeight],
            outputRange: [0, 75],
            extrapolate: "clamp",
        })
    }

    getRightViewX = () => {
        return this.translateY.interpolate({
            inputRange: [startHeight, endHeight],
            outputRange: [0, 35],
            extrapolate: "clamp",
        })
    }

    getRightViewScale = () => {
        return this.translateY.interpolate({
            inputRange: [startHeight, endHeight],
            outputRange: [1, 0.65],
            extrapolate: "clamp",
        })
    }

    getRightViewFontSize = () => {
        return this.translateY.interpolate({
            inputRange: [startHeight, endHeight],
            outputRange: [14, 20],
            extrapolate: "clamp",
        })
    }
    goBack = () => {
        const {navigation} = this.props;
        navigation.goBack();
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'brief/setState',
            payload: {
                ...initialState
            }
        })
    }

    loadData = () => {
        const {dispatch, id} = this.props;
        dispatch({
            type: 'brief/fetchBrief',
            payload: {
                book_id: id
            }
        })
    }

    goMangaView = (item: IChapter) => {
        const {navigation, id} = this.props;
        navigation.navigate('MangaView', {
            data: {
                sort: item.sort,
                title: item.title,
                book_id: id,
            }
        });
    }

    get header() {
        const operateOpacity = this.getOpacity();
        const leftViewX = this.getLeftViewX();
        const rightViewX = this.getRightViewX();
        const rightViewScale = this.getRightViewScale();
        const rightFontSize = this.getRightViewFontSize();
        return (
            <>
                <View>
                    <Animated.View style={[styles.shadowView, {
                        opacity: operateOpacity
                    }]}>
                    </Animated.View>

                    <Operate
                        leftViewX={leftViewX}
                        rightViewX={rightViewX}
                        rightViewScale={rightViewScale}
                        rightFontSize={rightFontSize}
                    />
                    <Animated.View style={[styles.headerView, {
                        opacity: operateOpacity,
                    }]}>
                        <Information/>
                    </Animated.View>
                </View>
                <BookInfo/>
            </>
        );
    }

    get fixedView() {
        if (this.state.showFixed) {
            return <Fixed/>
        }
        return null;
    }

    renderItem = ({item}: ListRenderItemInfo<IChapter>) => {
        return <Item data={item} goMangaView={this.goMangaView}/>;
    };

    renderFooter = () => {
        return <Footer/>
    }

    onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (event.nativeEvent.contentOffset.y > this.showFixedViewH) {
            this.setState({
                showFixed: true
            })
        } else {
            this.setState({
                showFixed: false
            })
        }
    };

    render() {
        const {chapterList} = this.props;
        const topBarOpacity = this.getOpacity();
        return (
            <>
                <ImageBlurBackground/>
                <FlatList
                    ListHeaderComponent={this.header}
                    data={chapterList}
                    numColumns={4}
                    columnWrapperStyle={styles.columnWrapper}
                    renderItem={this.renderItem}
                    keyExtractor={(item, key) => `item-${key}`}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{
                            nativeEvent: {contentOffset: {y: this.translateY}}
                        }],
                        {
                            useNativeDriver: false,
                            listener: this.onScroll
                        },
                    )}
                    ListFooterComponent={this.renderFooter}
                />
                {this.fixedView}
                <TopBarWrapper goBack={this.goBack} topBarOpacity={topBarOpacity}/>

            </>
        );
    }
}

const styles = StyleSheet.create({
    columnWrapper: {
        paddingHorizontal: 10,
        backgroundColor: Color.page_bg,
    },
    headerView: {
        paddingTop: TopHeight,
        marginHorizontal: 10,
        height: headerHeight,
    },
    shadowView: {
        position: "absolute",
        width: viewportWidth,
        height: operateHeight,
        bottom: 0,
        backgroundColor: Color.page_bg,
    },

})

export default connector(Brief);
