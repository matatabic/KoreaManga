import React from 'react';
import {View, Text, FlatList, StyleSheet, ListRenderItemInfo, Image, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
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


const mapStateToProps = ({mangaView, loading}: RootState) => {
    return {
        episodeList: mangaView.episodeList,
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

    loadUpData = true;

    constructor(props: IProps) {
        super(props);
        this.state = {
            endReached: false,
            headerReached: false,
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;
        const {roast, book_id} = this.props.route.params.data;
        dispatch({
            type: 'mangaView/setState',
            payload: {
                book_id,
                roast,
            }
        });
        this.loadData(true, true);
    }

    renderHeader = () => {
        const {headerHasMore} = this.props;
        const {headerReached} = this.state;

        if (headerReached) {
            return <More/>;
        }
        if (!headerHasMore) {
            return <End/>;
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

    onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
        // const offsetY = nativeEvent.contentOffset.y;
        // console.log(offsetY)
        // if (this.loadUpData && offsetY < -30) {
        //     this.loadUpData = false;
        //     this.onHeaderReached();
        // }
    };

    renderItem = ({item}: ListRenderItemInfo<IEpisode>) => {
        return (
            <Item data={item}/>
        )
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'mangaView/setState',
            payload: {
                ...initialState
            }
        })
    }

    render() {
        const {episodeList} = this.props;

        return (
            <FlatList
                // ListHeaderComponent={this.renderHeader}
                style={styles.container}
                data={episodeList}
                numColumns={1}
                extraData={this.state}
                renderItem={this.renderItem}
                keyExtractor={(item, key) => `item-${item.id}`}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0.1}
                onScroll={this.onScroll}
                ListFooterComponent={this.renderFooter}
            />
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
