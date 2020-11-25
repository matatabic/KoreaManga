import React from 'react';
import {StyleSheet, ListRenderItemInfo, FlatList, Text, View, Animated} from 'react-native';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import BookCover from "./Item/BookCover";
import {ModalStackNavigation, RootStackNavigation} from "@/navigator/index";
import LoginPending from "./LoginPending";
import {ICollection} from "@/models/shelf";
import {Color} from "@/utils/const";
import More from "@/components/More";
import End from "@/components/End";

const mapStateToProps = ({user, shelf, loading}: RootState) => {
    return {
        isLogin: user.isLogin,
        collectionList: shelf.collectionList,
        refreshing: shelf.refreshing,
        hasMore: shelf.hasMore,
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

    scrollY = new Animated.Value(0)

    constructor(props: IProps) {
        super(props);
        this.state = {
            endReached: false,
        };
    }

    componentDidMount() {
        this.loadData(true);
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

    goBrief = (data: ICollection) => {
        const {navigation} = this.props;
        navigation.navigate('Brief', {
            id: data.book_id,
        });
    };

    renderItem = ({item}: ListRenderItemInfo<ICollection>) => {
        return (
            <BookCover
                data={item}
                goBrief={this.goBrief}
                key={item.id}
            />
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
        const {navigation, isLogin, collectionList} = this.props;
        const headerOpacity = this.getHeaderOpacity();
        return (
            isLogin ?
                <View style={{flex: 1}}>
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
                        ListFooterComponent={this.renderFooter}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={0.1}
                    />
                </View> :
                <LoginPending navigation={navigation}/>
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
