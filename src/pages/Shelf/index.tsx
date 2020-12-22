import React from 'react';
import {StyleSheet, ListRenderItemInfo, FlatList, View, Animated} from 'react-native';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import BookCover from "./Item/BookCover";
import {ModalStackNavigation, RootStackNavigation} from "@/navigator/index";
import LoginPending from "./LoginPending";
import {ICollection} from "@/models/shelf";
import More from "@/components/More";
import End from "@/components/End";
import Touchable from "@/components/Touchable";
import EditView from "./EditView";
import BookPlaceholder from "@/components/Placeholder/BookPlaceholder";


const mapStateToProps = ({user, shelf, loading}: RootState) => {
    return {
        isLogin: user.isLogin,
        isEdit: shelf.isEditCollection,
        ids: shelf.ids,
        collectionList: shelf.collectionList,
        refreshing: shelf.refreshing,
        hasMore: shelf.collectionHasMore,
        loading: loading.effects['shelf/fetchCollectionList']
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

class Shelf extends React.PureComponent<IProps, IState> {

    initData = true;
    scrollY = new Animated.Value(0)
    _unsubscribe: () => void = () => {
    };
    _removeSubscribe: () => void = () => {
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            endReached: false,
        };
    }

    componentDidMount() {
        this.loadData(true);
        const {navigation, dispatch} = this.props;
        this._unsubscribe = navigation.addListener('focus', () => {
            dispatch({
                type: 'shelf/setActivePage',
                payload: {
                    activePage: 1,
                    isEditHistory: false,
                    isEditCollection: false,
                }
            })
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    componentDidUpdate() {
        if (this.props.isLogin && this.initData) {
            this.loadData(true);
            this.initData = false;
        }
    }

    loadData = (refreshing: boolean, callback?: () => void) => {
        const {dispatch, isLogin} = this.props;
        if (isLogin) {
            dispatch({
                type: 'shelf/fetchCollectionList',
                payload: {
                    refreshing: refreshing,
                },
                callback
            });
        }
    }

    onRefresh = () => {
        this.loadData(true);
    };

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

    onClickItem = (item: ICollection, index: number) => {
        const {dispatch, isEdit, navigation, ids} = this.props
        if (isEdit) {
            let i = ids.indexOf(item.id)
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
                        ids: [...ids, item.id]
                    }
                })
            }
        } else {
            navigation.navigate('Brief', {
                id: item.book_id
            });
        }
    }

    checkAll = () => {
        const {dispatch, collectionList, ids} = this.props;
        const newData = collectionList.map(item => item.id);
        if (collectionList.length === ids.length) {
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
            type: 'shelf/delUserCollection',
            payload: {
                ids
            }
        })
    }

    renderItem = ({item, index}: ListRenderItemInfo<ICollection>) => {
        const {isEdit, ids} = this.props;
        const selected = ids.indexOf(item.id) > -1;

        return (
            <Touchable
                key={item.id}
                onPress={() => this.onClickItem(item, index)}
            >
                <BookCover
                    data={item}
                    isEdit={isEdit}
                    selected={selected}
                />
            </Touchable>
        )
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
    };

    getHeaderOpacity = () => {
        return this.scrollY.interpolate({
            inputRange: [-50, 0],
            outputRange: [1, 0],
            extrapolate: "clamp",
        })
    }

    render() {
        const {collectionList, isEdit, loading, refreshing} = this.props;
        const headerOpacity = this.getHeaderOpacity();
        return (
            (loading && refreshing) ? <BookPlaceholder/> :
                <View style={styles.container}>
                    <View style={styles.totalView}>
                        <Animated.Text style={[{
                            opacity: headerOpacity,
                        }]}>总收藏{collectionList.length}本</Animated.Text>
                    </View>
                    <FlatList
                        keyExtractor={(item, key) => `item-${key}`}
                        scrollEventThrottle={1}
                        data={collectionList}
                        style={styles.container}
                        numColumns={3}
                        onScroll={Animated.event(
                            [{
                                nativeEvent: {contentOffset: {y: this.scrollY}}
                            }],
                            {
                                useNativeDriver: false
                            }
                        )}
                        renderItem={this.renderItem}
                        extraData={this.state}
                        ListFooterComponent={this.renderFooter}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={0.1}
                    />
                    <EditView isEdit={isEdit} checkAll={this.checkAll} destroy={this.destroy}/>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    totalView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        flexDirection: 'row',
        zIndex: 999,
    },
})

export default connector(Shelf);
