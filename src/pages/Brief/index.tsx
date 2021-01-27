import React, {useEffect, useRef} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Animated,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ListRenderItemInfo,
} from 'react-native';
import StickyHeader from 'react-native-stickyheader';
import {RootState} from "@/models/index";
import {RouteProp} from "@react-navigation/native";
import {ModalStackNavigation, RootStackNavigation, RootStackParamList} from "@/navigator/index";
import {connect, ConnectedProps} from "react-redux";
import {Color} from "@/utils/const";
import TopBarWrapper from "@/pages/Brief/TopBarWrapper";
import {useHeaderHeight} from "@react-navigation/stack";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import Information from "@/pages/Brief/Information";
import ImageBlurBackground from "@/pages/Brief/ImageBlurBackground";
import Operate from "@/pages/Brief/Operate";
import BookIntro from "@/pages/Brief/BookIntro";
import {ip, viewportWidth, wp} from "@/utils/index";
import {IChapter} from "@/models/brief";
import Item from "@/pages/Brief/Item";
import Footer from "@/pages/Brief/Footer";
import BriefPlaceholder from "@/components/Placeholder/BriefPlaceholder";
import Drawer from "@/pages/Brief/Drawer";
import FixedOperate from "@/pages/Brief/FixedOperate";


const mapStateToProps = ({user, brief, loading}: RootState, {route}: { route: RouteProp<RootStackParamList, 'Brief'> }) => {
    const {id} = route.params;
    return {
        isLogin: user.isLogin,
        book_id: id,
        markRoast: brief.markRoast,
        collection_id: brief.collection_id,
        refreshing: brief.refreshing,
        chapterList: brief.chapterList,
        statusBarHeight: brief.statusBarHeight,
        loading: loading.effects['brief/fetchBrief']
    };
};


const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    route: RouteProp<RootStackParamList, 'Brief'>
    navigation: RootStackNavigation & ModalStackNavigation;
    scrollY: any;
    headerHeight: number;
}

interface IState {
    fixedOpacity: number,
}

const imageWidth = wp(30);
const imageHeight = ip(imageWidth);


class Brief extends React.PureComponent<IProps, IState> {

    EndShowHeight = getStatusBarHeight() + this.props.headerHeight + imageHeight - 30;
    fixedHeight = this.props.headerHeight + imageHeight + 30;
    drawerTranslateX = new Animated.Value(viewportWidth);

    constructor(props: IProps) {
        super(props);
        this.state = {
            fixedOpacity: 0,
        }
    }

    getOpacity = () => {
        const {scrollY, statusBarHeight} = this.props;
        return scrollY.interpolate({
            inputRange: [
                getStatusBarHeight() + statusBarHeight,
                this.EndShowHeight
            ],
            outputRange: [1, 0],
            extrapolate: "clamp",
        })
    }

    getLeftViewX = () => {
        const {scrollY, statusBarHeight} = this.props;
        return scrollY.interpolate({
            inputRange: [
                getStatusBarHeight() + statusBarHeight,
                this.EndShowHeight
            ],
            outputRange: [0, wp(25)],
            extrapolate: "clamp",
        })
    }

    getRightViewX = () => {
        const {scrollY, statusBarHeight} = this.props;
        return scrollY.interpolate({
            inputRange: [
                getStatusBarHeight() + statusBarHeight,
                this.EndShowHeight
            ],
            outputRange: [0, wp(10)],
            extrapolate: "clamp",
        })
    }

    getRightViewScale = () => {
        const {scrollY, statusBarHeight} = this.props;
        return scrollY.interpolate({
            inputRange: [
                getStatusBarHeight() + statusBarHeight,
                this.EndShowHeight
            ],
            outputRange: [1, 0.65],
            extrapolate: "clamp",
        })
    }

    getRightFontSize = () => {
        const {scrollY, statusBarHeight} = this.props;
        return scrollY.interpolate({
            inputRange: [
                getStatusBarHeight() + statusBarHeight,
                this.EndShowHeight
            ],
            outputRange: [14, 20],
            extrapolate: "clamp",
        })
    }

    getFontColor = () => {
        const {scrollY, statusBarHeight} = this.props;
        return scrollY.interpolate({
            inputRange: [
                getStatusBarHeight() + statusBarHeight,
                this.EndShowHeight
            ],
            outputRange: [Color.black, Color.white],
            extrapolate: "clamp",
        })
    }

    getBgImageSize = () => {
        const {scrollY} = this.props;
        return scrollY.interpolate({
            inputRange: [-100, 0],
            outputRange: [1.2, 1],
            extrapolate: "clamp",
        })
    }

    onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (event.nativeEvent.contentOffset.y >= this.fixedHeight) {
            this.setState({
                fixedOpacity: 1
            })
        } else {
            this.setState({
                fixedOpacity: 0
            })
        }
    };

    renderItem = ({item}: ListRenderItemInfo<IChapter>) => {
        return <Item data={item} goMangaView={this.goMangaView}/>;
    };

    renderFooter = () => {
        return <Footer/>
    }

    onClickCollection = () => {
        const {dispatch, navigation, isLogin, collection_id, book_id} = this.props;
        if (!isLogin) {
            navigation.navigate("Login");
        } else {
            if (collection_id > 0) {
                dispatch({
                    type: 'brief/delUserCollection',
                    payload: {
                        id: collection_id.toString()
                    }
                })
            } else {
                dispatch({
                    type: 'brief/addUserCollection',
                    payload: {
                        book_id
                    }
                })
            }
            dispatch({
                type: 'shelf/setCollectionScreenReload',
            })
        }
    }

    readNow = () => {
        const {navigation, book_id, markRoast} = this.props;
        if (markRoast > 0) {
            navigation.navigate('MangaView', {
                book_id,
                roast: markRoast,
            });
        } else {
            navigation.navigate('MangaView', {
                book_id,
                roast: 1,
            });
        }
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    goMangaView = (item: IChapter) => {
        const {navigation, book_id} = this.props;

        navigation.navigate('MangaView', {
            book_id: book_id,
            roast: item.roast,
        });
    }

    showDrawer = () => {
        Animated.timing(this.drawerTranslateX, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start();
    }

    hideDrawer = () => {
        Animated.timing(this.drawerTranslateX, {
            toValue: viewportWidth,
            duration: 200,
            useNativeDriver: true
        }).start();
    }

    componentDidMount() {
        this.loadData(true);
    }

    loadData = (refreshing: boolean, callback?: () => void) => {
        const {dispatch, book_id} = this.props;
        dispatch({
            type: 'brief/fetchBrief',
            payload: {
                refreshing,
                book_id,
            },
            callback
        })
    }

    get header() {
        const {navigation, statusBarHeight} = this.props;
        const opacity = this.getOpacity();
        const leftViewX = this.getLeftViewX();
        const rightViewX = this.getRightViewX();
        const rightViewScale = this.getRightViewScale();
        const rightFontSize = this.getRightFontSize();
        const fontColor = this.getFontColor();

        return (
            <>
                <Information
                    statusBarHeight={statusBarHeight}
                    opacity={opacity}
                />
                {/*<StickyHeader*/}
                {/*    stickyHeaderY={this.fixedHeight} // 滑动到多少悬浮*/}
                {/*    stickyScrollY={scrollY}*/}
                {/*>*/}
                <Operate
                    navigation={navigation}
                    fixedOpacity={this.state.fixedOpacity}
                    opacity={opacity}
                    statusBarHeight={statusBarHeight}
                    leftViewX={leftViewX}
                    rightViewX={rightViewX}
                    rightViewScale={rightViewScale}
                    rightFontSize={rightFontSize}
                    fontColor={fontColor}
                    onClickCollection={this.onClickCollection}
                    readNow={this.readNow}
                />
                {/*</StickyHeader>*/}
                <BookIntro showDrawer={this.showDrawer}/>
            </>
        )
    }

    render() {
        const {scrollY, chapterList, statusBarHeight, loading, refreshing} = this.props;

        const opacity = this.getOpacity();
        const imageSize = this.getBgImageSize();

        return (
            (loading && refreshing) ? <BriefPlaceholder/> :
                <View style={styles.container}>
                    <Drawer
                        drawerTranslateX={this.drawerTranslateX}
                        hideDrawer={this.hideDrawer}
                        goMangaView={this.goMangaView}
                    />
                    <ImageBlurBackground imageSize={imageSize}/>
                    <TopBarWrapper
                        goBack={this.goBack}
                        statusBarHeight={statusBarHeight}
                        opacity={opacity}
                        fixedOpacity={this.state.fixedOpacity}
                    />
                    {
                        this.state.fixedOpacity === 1 &&
                        <FixedOperate
                            statusBarHeight={statusBarHeight}
                            onClickCollection={this.onClickCollection}
                            readNow={this.readNow}
                        />
                    }
                    <FlatList
                        data={chapterList}
                        numColumns={4}
                        ListHeaderComponent={this.header}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {contentOffset: {y: scrollY}},
                                },
                            ],
                            {
                                useNativeDriver: false,
                                listener: this.onScroll
                            },
                        )}
                        scrollEventThrottle={1}
                        style={styles.container}
                        columnWrapperStyle={styles.columnWrapper}
                        renderItem={this.renderItem}
                        keyExtractor={(item, key) => `item-${key}-item-${item.id}`}
                        ListFooterComponent={this.renderFooter}
                    />
                </View>

        )
    }
}

const Wrapper = function (props: IProps) {
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerHeight = useHeaderHeight() - getStatusBarHeight();

    useEffect(() => {
        props.dispatch({
            type: 'brief/setState',
            payload: {
                statusBarHeight: headerHeight
            }
        })
    }, [])

    return <Brief {...props} scrollY={scrollY} headerHeight={headerHeight}/>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    columnWrapper: {
        paddingHorizontal: 10,
        backgroundColor: Color.page_bg,
    },
});


export default connector(Wrapper)
