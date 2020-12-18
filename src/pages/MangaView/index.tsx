import React from 'react';
import {
    FlatList,
    StyleSheet,
    ListRenderItemInfo,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Text, StatusBar,
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import {IChapter} from "@/models/brief";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RouteProp} from "@react-navigation/native";
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {RootStackParamList} from "@/navigator/index";
import {IEpisode, initialState} from "@/models/mangaView";
import Item from "./item/Item";
import More from "@/components/More";
import End from "@/components/End";
import {viewportWidth} from "@/utils/index";
import Touchable from "@/components/Touchable";
import Toast from "react-native-root-toast";


const mapStateToProps = ({mangaView, brief, loading}: RootState) => {
    return {
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
    headerReached: boolean;
}

class MangaView extends React.PureComponent<IProps, IState> {

    _FlatList: any = null;
    loadUpData: boolean = true;
    currentChapterId: number = 0
    currentChapterNum: number = 0;
    currentRoast: number = 0;

    constructor(props: IProps) {
        super(props);
        this.state = {
            endReached: false,
            headerReached: false,
        };
    }

    componentDidMount() {
        NetInfo.fetch("wifi").then(state => {
            if (state.type !== "wifi") {
                Toast.show('现在处于wifi环境，请注意流量使用', {
                    position: Toast.positions.CENTER,
                    duration: Toast.durations.LONG,
                    shadow: true,
                    animation: true,
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

    onPress = () => {
        this._FlatList.scrollToIndex({viewPosition: 0, index: 5});
    }

    renderHeader = () => {
        return (
            <Touchable onPress={this.onPress}>
                <Text style={{color: 'red', height: 50}}>jump</Text>
            </Touchable>
        )
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

    onHeaderReached = () => {
        const {headerHasMore, loading} = this.props;

        if (!headerHasMore || loading) {
            return;
        }
        this.setState({
            headerReached: true,
        });

        this.loadData(false, false, () => {
            this.setState({
                headerReached: false,
            });
            setTimeout(() => {
                this.loadUpData = true;
            }, 1000)
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
                this.currentChapterNum = episodeList[i].chapter_num;
                this.currentRoast = episodeList[i].roast;
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
        const {dispatch, episodeList} = this.props;
        const {book_id} = this.props.route.params;

        const chapter_id = this.currentChapterId > 0 ? this.currentChapterId : episodeList[0].chapter_id;
        const chapter_num = this.currentChapterNum > 0 ? this.currentChapterNum : episodeList[0].chapter_num;
        const roast = this.currentRoast > 0 ? this.currentRoast : episodeList[0].roast;

        dispatch({
            type: 'mangaView/setState',
            payload: {
                ...initialState
            }
        })

        dispatch({
            type: 'brief/setChapter',
            payload: {
                markChapterNum: chapter_num,
                markRoast: roast
            }
        })

        dispatch({
            type: 'mangaView/addHistory',
            payload: {
                book_id,
                chapter_id,
                chapter_num,
                roast,
            }
        })

    }

    render() {
        const {episodeList} = this.props;

        return (
            <>
                <StatusBar hidden/>
                <FlatList
                    // ListHeaderComponent={this.renderHeader}
                    ref={(ref) => {
                        this._FlatList = ref;
                    }}
                    style={styles.container}
                    data={episodeList}
                    numColumns={1}
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
