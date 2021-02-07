import React from 'react';
import {
    FlatList,
    StyleSheet,
    ListRenderItemInfo,
    NativeSyntheticEvent,
    NativeScrollEvent,
    StatusBar,
    Animated,
    Easing
} from 'react-native';
import {IChapter} from "@/models/brief";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RouteProp} from "@react-navigation/native";
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {RootStackNavigation, RootStackParamList} from "@/navigator/index";
import {IEpisode, initialState} from "@/models/mangaView";
import Item from "./item/Item";
import More from "@/components/More";
import End from "@/components/End";
import {hp, viewportWidth} from "@/utils/index";
import BookStatusBar from "./BookStatusBar";
import TopCtrPanel from "@/pages/MangaView/TopCtrPanel";
import BottomCtrPanel from "@/pages/MangaView/BottomCtrPanel";
import Touchable from "@/components/Touchable";
import DarkDrawer from "@/components/DarkDrawer";

const mapStateToProps = ({mangaView, brief, user, loading}: RootState) => {
    return {
        isLogin: user.isLogin,
        statusBarHeight: brief.statusBarHeight,
        episodeList: mangaView.episodeList,
        currentChapter: brief.markChapterNum,
        currentRoast: mangaView.currentRoast,
        hasMore: mangaView.hasMore,
        refreshing: mangaView.refreshing,
        currentChapterId: mangaView.currentChapterId,
        currentChapterNum: mangaView.currentChapterNum,
        panelStatus: mangaView.panelStatus,
        pages: mangaView.pagination,
        loading: loading.effects['mangaView/fetchEpisodeList']
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    route: RouteProp<RootStackParamList, 'MangaView'>;
    navigation: RootStackNavigation;
    data: IChapter;
}


interface IState {
    endReached: boolean;
}


class MangaView extends React.PureComponent<IProps, IState> {

    flatListRef: FlatList<IEpisode> | null = null;
    topPanelValue = new Animated.Value(0)
    bottomPanelValue = new Animated.Value(0)
    panelStatus: boolean = true;
    drawerTranslateX = new Animated.Value(-viewportWidth);

    constructor(props: IProps) {
        super(props);
        this.state = {
            endReached: false,
        };
    }

    componentDidMount() {
        this.loadData(true);
    }

    renderFooter = () => {
        const {hasMore} = this.props;
        const {endReached} = this.state;
        if (endReached) {
            return <More/>;
        }
        if (!hasMore) {
            return <End/>;
        }

        return null;
    }

    loadData = (refreshing: boolean, callback?: () => void) => {
        const {dispatch} = this.props;
        const {roast, book_id} = this.props.route.params
        dispatch({
            type: 'mangaView/fetchEpisodeList',
            payload: {
                refreshing,
                roast,
                book_id
            },
            callback
        });
    }

    onEndReached = () => {
        const {hasMore, loading} = this.props;

        if (!hasMore || loading) {
            return;
        }
        this.setState({
            endReached: true,
        });

        this.loadData(false, () => {
            this.setState({
                endReached: false,
            });
        });
    }

    onScrollEndDrag = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
        const {dispatch, episodeList} = this.props;
        let offset_total = 0;
        for (let i = 0; i < episodeList.length; i++) {
            offset_total += episodeList[i].multiple * viewportWidth;
            if (nativeEvent.contentOffset.y < offset_total) {
                dispatch({
                    type: 'mangaView/setState',
                    payload: {
                        currentEpisodeTotal: episodeList[i].episode_total,
                        currentChapterId: episodeList[i].chapter_id,
                        currentChapterNum: episodeList[i].chapter_num,
                        currentNumber: episodeList[i].number,
                        currentRoast: episodeList[i].roast,
                        currentTitle: episodeList[i].title,
                    }
                })
                break;
            }
        }
    };

    onScroll = () => {
        const {dispatch, panelStatus} = this.props;
        if (panelStatus) {
            dispatch({
                type: 'mangaView/setState',
                payload: {
                    panelStatus: false
                }
            })
            this.hidePanel();
        }
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
            toValue: -viewportWidth,
            duration: 200,
            useNativeDriver: true
        }).start();
    }

    goMangaChapter = (item: IChapter) => {
        const {dispatch} = this.props;
        const {book_id} = this.props.route.params
        dispatch({
            type: 'mangaView/fetchEpisodeList',
            payload: {
                refreshing: true,
                roast: item.roast,
                book_id,
                callback: this.hideDrawer()
            }
        });
    }

    hidePanel = () => {
        const {statusBarHeight} = this.props;
        Animated.parallel([
            Animated.timing(
                this.topPanelValue,
                {
                    toValue: -(statusBarHeight + getStatusBarHeight()),
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.bottomPanelValue,
                {
                    toValue: hp(25),
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            )
        ]).start();
        StatusBar.setHidden(true);
    }

    showPanel = () => {
        Animated.parallel([
            Animated.timing(
                this.topPanelValue,
                {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.bottomPanelValue,
                {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            )
        ]).start();
    }

    panelHandle = () => {
        const {dispatch, panelStatus} = this.props;
        if (panelStatus) {
            this.hidePanel();
            StatusBar.setHidden(true);
        } else {
            this.showPanel();
            StatusBar.setHidden(false);
        }

        dispatch({
            type: 'mangaView/setState',
            payload: {
                panelStatus: !panelStatus
            }
        })
    }

    lastChapter = () => {
        const {dispatch, currentChapterNum, loading} = this.props;
        const {book_id} = this.props.route.params

        if (!loading) {
            dispatch({
                type: 'mangaView/fetchEpisodeList',
                payload: {
                    refreshing: true,
                    chapter_num: currentChapterNum - 1,
                    book_id,
                }
            });
        }
    }

    nextChapter = () => {
        const {dispatch, currentChapterNum, loading} = this.props;
        const {book_id} = this.props.route.params

        if (!loading) {
            dispatch({
                type: 'mangaView/fetchEpisodeList',
                payload: {
                    refreshing: true,
                    chapter_num: currentChapterNum + 1,
                    book_id,
                }
            });
        }
    }

    scrollToIndex = (index: number) => {
        this.flatListRef?.scrollToIndex({viewPosition: 0, index: index});
    }

    renderItem = ({item}: ListRenderItemInfo<IEpisode>) => {
        return (
            <Touchable onPress={this.panelHandle} activeOpacity={1}>
                <Item data={item}/>
            </Touchable>
        )
    }

    UNSAFE_componentWillMount() {
        const {isLogin, dispatch, currentChapterId, currentChapterNum, currentRoast} = this.props;
        const {book_id} = this.props.route.params;

        dispatch({
            type: 'brief/setChapter',
            payload: {
                markChapterNum: currentChapterNum,
                markRoast: currentRoast
            }
        })

        dispatch({
            type: 'mangaView/setState',
            payload: {
                ...initialState
            }
        })

        StatusBar.setHidden(false);

        if (isLogin) {
            dispatch({
                type: 'mangaView/addHistory',
                payload: {
                    book_id,
                    chapter_id: currentChapterId,
                    chapter_num: currentChapterNum,
                    roast: currentRoast,
                }
            })
            dispatch({
                type: 'shelf/setHistoryScreenReload',
            })
        }
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        const {episodeList, pages} = this.props;
        return (
            episodeList.length > 0 && <>
                <StatusBar barStyle="light-content"/>
                <TopCtrPanel topPanelValue={this.topPanelValue} goBack={this.goBack}/>
                <BottomCtrPanel
                    bottomPanelValue={this.bottomPanelValue}
                    scrollToIndex={this.scrollToIndex}
                    showDrawer={this.showDrawer}
                    lastChapter={this.lastChapter}
                    nextChapter={this.nextChapter}
                />
                <FlatList
                    ref={ref => (this.flatListRef = ref)}
                    style={styles.container}
                    data={episodeList}
                    numColumns={1}
                    scrollEventThrottle={1}
                    extraData={this.state}
                    renderItem={this.renderItem}
                    onScroll={this.onScroll}
                    getItemLayout={(data: any, index) => {
                        if (data[index] === undefined) {
                            return {length: 0, offset: 0, index}
                        }

                        let offset = 0;
                        const length = viewportWidth * data[index].multiple

                        for (let i = 0; i < index; i++) {
                            offset += viewportWidth * data[i].multiple
                        }

                        return {length: length, offset, index}
                    }}
                    initialScrollIndex={pages.episode_offset - 1}
                    keyExtractor={(item) => `item-${item.id}`}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={0.1}
                    onScrollEndDrag={this.onScrollEndDrag}
                    ListFooterComponent={this.renderFooter}
                />
                <DarkDrawer
                    drawerTranslateX={this.drawerTranslateX}
                    hideDrawer={this.hideDrawer}
                    goMangaChapter={this.goMangaChapter}
                />
                <BookStatusBar/>
            </>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: getStatusBarHeight(),
    },
})

export default connector(MangaView);
