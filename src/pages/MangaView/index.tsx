import React from 'react';
import {
    FlatList,
    StyleSheet,
    ListRenderItemInfo,
    NativeSyntheticEvent,
    NativeScrollEvent,
    StatusBar,
    NativeEventEmitter,
    NativeModules
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import {IChapter} from "@/models/brief";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RouteProp} from "@react-navigation/native";
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {RootStackParamList} from "@/navigator/index";
import {IEpisode} from "@/models/mangaView";
import Item from "./item/Item";
import More from "@/components/More";
import End from "@/components/End";
import {viewportWidth, getCurrentDate} from "@/utils/index";
import Toast from "react-native-root-toast";
import BookStatusBar from "./BookStatusBar";

const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);

const mapStateToProps = ({mangaView, brief, user, loading}: RootState) => {
    return {
        isLogin: user.isLogin,
        episodeList: mangaView.episodeList,
        currentChapter: brief.markChapterNum,
        currentRoast: brief.markRoast,
        refreshing: mangaView.refreshing,
        headerHasMore: mangaView.headerHasMore,
        endHasMore: mangaView.endHasMore,
        loading: loading.effects['mangaView/fetchEpisodeList']
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    route: RouteProp<RootStackParamList, 'MangaView'>;
    data: IChapter;
}


interface IState {
    endReached: boolean;
    currentTime: string;
    currentEpisodeTotal: number;
    currentChapterNum: number;
    currentNumber: number;
    connectionType: string;
    batteryLevel: string;
}


class MangaView extends React.PureComponent<IProps, IState> {

    timer: NodeJS.Timer | null = null;
    currentChapterId: number = 0;
    currentRoast: number = 0;

    constructor(props: IProps) {
        super(props);
        this.state = {
            endReached: false,
            connectionType: '未知',
            currentEpisodeTotal: 0,
            currentChapterNum: 1,
            currentNumber: 1,
            currentTime: '',
            batteryLevel: '100',
        };
    }

    componentDidMount() {
        const time: string = getCurrentDate();
        this.setState({
            currentTime: time
        })

        this.timer = setInterval(() => {
            const time: string = getCurrentDate();
            this.setState({
                currentTime: time
            })
        }, 60000)

        NetInfo.fetch("wifi").then(state => {
            if (state.type !== "wifi") {
                Toast.show('现在处于非wifi环境，请注意流量使用', {
                    position: Toast.positions.CENTER,
                    duration: Toast.durations.LONG,
                    shadow: true,
                    animation: true,
                })
            }
        });

        NetInfo.addEventListener(state => {
            this.setState({
                connectionType: state.type,
            })
        });

        const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);

        deviceInfoEmitter.addListener('RNDeviceInfo_batteryLevelDidChange', level => {
            if (level !== '-1') {
                this.setState({
                    batteryLevel: level
                })
            }
        });

        const {dispatch} = this.props;
        const {roast, book_id} = this.props.route.params;
        dispatch({
            type: 'mangaView/setState',
            payload: {
                book_id,
                roast,
            }
        });
        this.loadData(true, true);
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        if (prevState.currentEpisodeTotal === 0 && nextProps.episodeList.length > 0) {
            return {
                currentEpisodeTotal: nextProps.episodeList[0].episode_total,
                currentChapterNum: nextProps.episodeList[0].chapter_num,
                currentNumber: nextProps.episodeList[0].number,
            }
        }

        return null;
    }

    renderFooter = () => {
        const {endHasMore} = this.props;
        const {endReached} = this.state;
        if (endReached) {
            return <More/>;
        }
        if (!endHasMore) {
            return <End/>;
        }

        return null;
    }

    loadData = (refreshing: boolean, direction: boolean, callback?: () => void) => {
        const {dispatch} = this.props;
        dispatch({
            type: 'mangaView/fetchEpisodeList',
            payload: {
                refreshing,
                direction,
            },
            callback
        });
    }

    onEndReached = () => {
        const {endHasMore, loading} = this.props;

        if (!endHasMore || loading) {
            return;
        }
        this.setState({
            endReached: true,
        });

        this.loadData(false, true, () => {
            this.setState({
                endReached: false,
            });
        });
    }

    onScrollEndDrag = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
        const {episodeList} = this.props;
        let offset_total = 0;
        for (let i = 0; i < episodeList.length; i++) {
            offset_total += episodeList[i].multiple * viewportWidth;
            if (nativeEvent.contentOffset.y < offset_total) {
                this.currentChapterId = episodeList[i].chapter_id;
                this.currentRoast = episodeList[i].roast;

                this.setState({
                    currentChapterNum: episodeList[i].chapter_num,
                    currentEpisodeTotal: episodeList[i].episode_total,
                    currentNumber: episodeList[i].number,
                })
                break;
            }
        }
    };

    renderItem = ({item}: ListRenderItemInfo<IEpisode>) => {
        return (
            <Item data={item}/>
        )
    }

    componentWillUnmount() {
        const {isLogin, dispatch, episodeList} = this.props;
        const {book_id} = this.props.route.params;

        const chapter_id = this.currentChapterId > 0 ? this.currentChapterId : episodeList[0].chapter_id;
        const chapter_num = this.state.currentChapterNum > 0 ?
            this.state.currentChapterNum : episodeList[0].chapter_num;
        const roast = this.currentRoast > 0 ? this.currentRoast : episodeList[0].roast;

        dispatch({
            type: 'brief/setChapter',
            payload: {
                markChapterNum: chapter_num,
                markRoast: roast
            }
        })

        if (isLogin) {
            dispatch({
                type: 'mangaView/addHistory',
                payload: {
                    book_id,
                    chapter_id,
                    chapter_num,
                    roast,
                }
            })
            dispatch({
                type: 'shelf/setHistoryScreenReload',
            })
        }

        clearInterval(Number(this.timer));
    }

    render() {
        const {episodeList} = this.props;
        const {
            batteryLevel,
            connectionType,
            currentTime,
            currentNumber,
            currentChapterNum,
            currentEpisodeTotal
        } = this.state;
        return (
            <>
                <StatusBar hidden/>
                <FlatList
                    style={styles.container}
                    data={episodeList}
                    numColumns={1}
                    scrollEventThrottle={1}
                    extraData={this.state}
                    renderItem={this.renderItem}
                    getItemLayout={(data: any, index) => {
                        let offset = 0;
                        const length = viewportWidth * data[index].multiple;
                        for (let i = 0; i < index; i++) {
                            offset += viewportWidth * data[i].multiple
                        }
                        return {length: length, offset, index}
                    }}
                    keyExtractor={(item) => `item-${item.id}`}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={0.1}
                    onScrollEndDrag={this.onScrollEndDrag}
                    ListFooterComponent={this.renderFooter}
                />
                <BookStatusBar
                    batteryLevel={batteryLevel}
                    connectionType={connectionType}
                    currentTime={currentTime}
                    currentEpisodeTotal={currentEpisodeTotal}
                    currentChapterNum={currentChapterNum}
                    currentNumber={currentNumber}
                />
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
