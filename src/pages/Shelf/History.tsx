import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SectionList,
    SectionListRenderItemInfo,
    Animated,
} from 'react-native';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {ModalStackNavigation, RootStackNavigation} from "@/navigator/index";
import {IHistory} from "@/models/shelf";
import {Color} from "@/utils/const";
import HistoryItem from "@/pages/Shelf/Item/HistoryItem";
import More from "@/components/More";
import End from "@/components/End";
import EditView from "@/pages/Shelf/EditView";
import Touchable from "@/components/Touchable";
import {wp} from "@/utils/index";
import ListPlaceholder from "@/components/Placeholder/ListPlaceholder";

const mapStateToProps = ({user, shelf, loading}: RootState) => {
    return {
        isLogin: user.isLogin,
        historyList: shelf.historyList,
        isEdit: shelf.isEditHistory,
        ids: shelf.ids,
        refreshing: shelf.refreshing,
        hasMore: shelf.historyHasMore,
        loading: loading.effects['shelf/fetchHistoryList']
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation & ModalStackNavigation;
}

interface IState {
    endReached: boolean;
}

class History extends React.PureComponent<IProps, IState> {

    initData = true;
    translateX = new Animated.Value(0)

    _unsubscribe: () => void = () => {
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            endReached: false,
        };
    }

    componentDidMount() {
        // this.loadData(true);
        const {navigation, dispatch} = this.props;
        this._unsubscribe = navigation.addListener('focus', () => {
            this.loadData(true);
            dispatch({
                type: 'shelf/setActivePage',
                payload: {
                    activePage: 2,
                    isEditHistory: false,
                    isEditCollection: false,
                }
            })
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    loadData = (refreshing: boolean, callback?: () => void) => {
        const {dispatch, isLogin} = this.props;
        if (isLogin) {
            dispatch({
                type: 'shelf/fetchHistoryList',
                payload: {
                    refreshing: refreshing,
                },
                callback
            });
        }
    }

    renderSectionHeader = ({section: {title}}: any) => {
        return (
            <View style={styles.headerView}>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
        );
    }

    getX = () => {
        Animated.timing(this.translateX,
            {
                useNativeDriver: false,
                toValue: wp(5),
                duration: 150
            },
        ).start();
    }

    getEditX = () => {
        Animated.timing(this.translateX,
            {
                useNativeDriver: false,
                toValue: 0,
                duration: 150
            },
        ).start();
    }

    onClickItem = (item: IHistory[]) => {
        const {navigation, dispatch, isEdit, ids} = this.props;
        if (isEdit) {
            let i = ids.indexOf(item['book_id'])
            if (i > -1) {
                ids.splice(i, 1);
                dispatch({
                    type: 'shelf/setIds',
                    payload: {
                        ids: [...ids]
                    }
                })
            } else {
                dispatch({
                    type: 'shelf/setIds',
                    payload: {
                        ids: [...ids, item['book_id']]
                    }
                })
            }
        } else {
            navigation.navigate('Brief', {
                id: item['book_id']
            })
        }
    }

    goMangaView = (item: IHistory[]) => {
        const {navigation} = this.props;
        navigation.navigate('Brief', {
            id: item['book_id']
        })
        navigation.navigate('MangaView', {
            roast: item['roast'],
            book_id: item['book_id'],
        })
    }

    renderItem = ({item}: SectionListRenderItemInfo<IHistory[]>) => {
        const {isEdit, ids} = this.props;
        const selected = ids.indexOf(item['book_id']) > -1;
        isEdit ? this.getX() : this.getEditX();
        return (
            <Touchable onPress={() => this.onClickItem(item)}>
                <Animated.View
                    style={[
                        {transform: [{translateX: this.translateX}]},
                    ]}>
                    <HistoryItem
                        data={item}
                        isEdit={isEdit}
                        selected={selected}
                        goMangaView={this.goMangaView}
                    />
                </Animated.View>
            </Touchable>
        )
    }

    onRefresh = () => {
        this.loadData(true)
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

    checkAll = () => {
        const {dispatch, historyList, ids} = this.props;
        let newData: string[] = [];
        historyList.forEach(items => {
                items.data.forEach(item => {
                    newData = newData.concat(item['book_id'])
                })
            }
        )
        if (newData.length === ids.length) {
            dispatch({
                type: 'shelf/setState',
                payload: {
                    ids: []
                }
            })
        } else {
            dispatch({
                type: 'shelf/setState',
                payload: {
                    ids: newData
                }
            })
        }
    }

    destroy = () => {
        const {dispatch, ids} = this.props;
        dispatch({
            type: 'shelf/delUserHistory',
            payload: {
                ids
            }
        })
    }

    render() {
        const {refreshing, loading, historyList, isEdit, isLogin} = this.props;
        return (
            !isLogin ? null :
                (loading && refreshing) ? <ListPlaceholder/> :
                    <View style={styles.container}>
                        <SectionList
                            keyExtractor={(item, index) => `section-item-${index}`}
                            renderSectionHeader={this.renderSectionHeader}
                            onRefresh={this.onRefresh}
                            refreshing={refreshing}
                            sections={historyList}
                            style={styles.container}
                            stickySectionHeadersEnabled={true}
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={0.1}
                            renderItem={this.renderItem}
                            extraData={this.state}
                            ListFooterComponent={this.renderFooter}
                        />
                        <EditView isEdit={isEdit} checkAll={this.checkAll} destroy={this.destroy}/>
                    </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.page_bg,
    },
    headerView: {
        height: 45,
        paddingLeft: 15,
        justifyContent: 'center',
        backgroundColor: Color.page_bg,
    },
    headerTitle: {
        fontSize: 16,
    }
})

export default connector(History);
