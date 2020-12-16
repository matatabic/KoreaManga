import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ListRenderItemInfo,
    Animated,
    NativeSyntheticEvent,
    NativeScrollEvent
} from 'react-native';
import {RootState} from "@/models/index";
import {RouteProp} from "@react-navigation/native";
import {ModalStackNavigation, RootStackNavigation, RootStackParamList} from "@/navigator/index";
import {connect, ConnectedProps} from "react-redux";
import {IChapter, initialState} from "@/models/brief";
import ImageBlurBackground from "@/pages/Brief/ImageBlurBackground";
import {hp, wp} from "@/utils/index";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {Color} from "@/utils/const";
import Item from "./Item";
import TopBarWrapper from "./TopBarWrapper";
import Footer from "./Footer";
import Operate from "./Operate";
import Information from "./Information";
import BookIntro from "./BookIntro";
import Fixed from "./Fixed";
import BriefPlaceholder from "@/components/Placeholder/BriefPlaceholder";


const startHeight = hp(17.5);
const endHeight = hp(35) - getStatusBarHeight();
const showFixedViewH = endHeight + hp(3.5);


const mapStateToProps = ({brief, loading}: RootState, {route}: { route: RouteProp<RootStackParamList, 'Brief'> }) => {
    const {id} = route.params;
    return {
        book_id: id,
        refreshing: brief.refreshing,
        chapterList: brief.chapterList,
        loading: loading.effects['brief/fetchBrief']
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    route: RouteProp<RootStackParamList, 'Brief'>
    navigation: RootStackNavigation & ModalStackNavigation;
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
        this.loadData(true);
    }

    getBgImageSize = () => {
        return this.translateY.interpolate({
            inputRange: [-100, 0],
            outputRange: [1.2, 1],
            extrapolate: "clamp",
        })
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
            outputRange: [0, wp(30)],
            extrapolate: "clamp",
        })
    }

    getRightViewX = () => {
        return this.translateY.interpolate({
            inputRange: [startHeight, endHeight],
            outputRange: [0, wp(10)],
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
        this.props.navigation.goBack();
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

    goMangaView = (item: IChapter) => {
        const {navigation, book_id} = this.props;
        navigation.navigate('MangaView', {
            book_id: book_id,
            roast: item.roast,
        });
    }

    get header() {
        const {navigation} = this.props;
        const operateOpacity = this.getOpacity();
        const leftViewX = this.getLeftViewX();
        const rightViewX = this.getRightViewX();
        const rightViewScale = this.getRightViewScale();
        const rightFontSize = this.getRightViewFontSize();
        return (
            <View>
                <Information opacity={operateOpacity}/>
                <Operate
                    navigation={navigation}
                    opacity={operateOpacity}
                    leftViewX={leftViewX}
                    rightViewX={rightViewX}
                    rightViewScale={rightViewScale}
                    rightFontSize={rightFontSize}
                />
                <BookIntro/>
            </View>
        );
    }

    get fixedView() {
        const {navigation} = this.props;
        if (this.state.showFixed) {
            return <Fixed navigation={navigation}/>
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
        const {chapterList, loading, refreshing} = this.props;
        const topBarOpacity = this.getOpacity();
        const imageSize = this.getBgImageSize();

        return (
            (loading && refreshing) ? <BriefPlaceholder/> :
                <View>
                    <ImageBlurBackground imageSize={imageSize}/>
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
                </View>
        );
    }
}

const styles = StyleSheet.create({
    columnWrapper: {
        paddingHorizontal: 10,
        backgroundColor: Color.page_bg,
    },
})

export default connector(Brief);
