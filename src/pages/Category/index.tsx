import React from 'react';
import {
    FlatList,
    ListRenderItemInfo,
    NativeSyntheticEvent,
    NativeScrollEvent,
    StyleSheet,
} from 'react-native';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {IBook} from "@/models/home";
import BookCover from "@/components/BookCover";
import {RouteProp} from "@react-navigation/native";
import {CategoryParamList} from "@/navigator/CategoryTabs";
import More from "@/components/More";
import End from "@/components/End";
import {Color} from "@/utils/const";
import {RootStackNavigation} from "@/navigator/index";
import BookPlaceholder from "@/components/Placeholder/BookPlaceholder";


const mapStateToProps = (state: RootState, {route}: { route: RouteProp<CategoryParamList, string> }) => {
    const {namespace, category_id, goBrief} = route.params;
    const activeStatus = state['category'].activeStatus;
    const activeCategory = state['category'].activeCategory;
    const activeModel = `${namespace}-status-${activeStatus}`;
    const bookList = state[activeModel] ? state[activeModel].bookList : []
    const refreshing = state[activeModel] ? state[activeModel].refreshing : false
    const hasMore = state[activeModel] ? state[activeModel].hasMore : false
    const hideHeader = state[activeModel] ? state[activeModel].hideHeader : false

    return {
        activeModel,
        category_id,
        goBrief,
        activeCategory,
        activeStatus,
        bookList,
        hasMore,
        refreshing,
        hideHeader,
        loading: state.loading.effects[`${activeModel}/fetchBookList`],
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    route: RouteProp<CategoryParamList, string>;
    navigation: RootStackNavigation;
}

interface IState {
    endReached: boolean;
    offsetY: number,
    scrollViewScrollDirection: string,
}

const FLATLIST_DIRECTION_UP = 0;     //表示FlatList组件往上滚动
const FLATLIST_DIRECTION_DOWN = 1;   //表示FlatList组件往下滚动


class Category extends React.PureComponent<IProps, IState> {

    scrollViewStartOffsetY = 0;         //用于记录手指开始滑动时FlatList组件的Y轴偏移量，通过这个变量可以判断滚动方向
    scrollViewScrollDirection = 0;      //FlatList组件滚动的方向：0往上；1往下
    hideHearer = false;
    navListener: any = {};

    constructor(props: IProps) {
        super(props);
        this.state = {
            endReached: false,
            offsetY: 0,
            scrollViewScrollDirection: ''
        };
    }

    componentDidMount() {
        const {dispatch, navigation, category_id} = this.props;
        this.navListener = navigation.addListener('focus', () => {
            dispatch({
                type: 'category/setActiveCategory',
                payload: {
                    activeCategory: category_id
                }
            })
            this.loadData(true);
        });
    }

    loadData = (refreshing: boolean, callback?: () => void, onRefresh: boolean = false) => {
        const {dispatch, activeModel, category_id, activeStatus} = this.props;
        dispatch({
            type: `${activeModel}/fetchBookList`,
            payload: {
                refreshing: refreshing,
                onRefresh: onRefresh,
                category_id: category_id,
                status: activeStatus,
            },
            callback
        });
    }

    onRefresh = () => {
        this.loadData(true, undefined, true);
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

    renderItem = ({item}: ListRenderItemInfo<IBook>) => {
        const {goBrief} = this.props;
        return (
            <BookCover
                data={item}
                goBrief={goBrief}
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

    onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = nativeEvent.contentOffset.y;

        if (this.scrollViewStartOffsetY > offsetY) {
            //手势往下滑动，FlatList组件往上滚动
            // console.log('手势往下滑动，FlatList组件往上滚动');
            this.scrollViewScrollDirection = FLATLIST_DIRECTION_UP;
        } else if (this.scrollViewStartOffsetY < offsetY) {
            //手势往上滑动，ScrollView组件往下滚动
            // console.log('手势往上滑动，FlatList组件往下滚动');
            this.scrollViewScrollDirection = FLATLIST_DIRECTION_DOWN;
        }
    };

    onScrollBeginDrag = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
        this.scrollViewStartOffsetY = nativeEvent.contentOffset.y;
    }

    onScrollEndDrag = () => {
        const {dispatch} = this.props;
        if (this.scrollViewScrollDirection === FLATLIST_DIRECTION_UP && this.hideHearer) {
            dispatch({
                type: 'category/setState',
                payload: {
                    hideHeader: false,
                },
            });
            this.hideHearer = false;
        } else if (this.scrollViewScrollDirection === FLATLIST_DIRECTION_DOWN && !this.hideHearer) {
            dispatch({
                type: 'category/setState',
                payload: {
                    hideHeader: true,
                },
            });
            this.hideHearer = true;
        }
    }

    render() {
        const {bookList, refreshing, loading} = this.props
        return (
            (loading && refreshing) ? <BookPlaceholder/> :
                <FlatList
                    keyExtractor={(item, key) => `item-${key}`}
                    data={bookList}
                    extraData={this.state}
                    renderItem={this.renderItem}
                    refreshing={refreshing}
                    style={styles.container}
                    onRefresh={this.onRefresh}
                    ListFooterComponent={this.renderFooter}
                    scrollEventThrottle={1}
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    onScrollEndDrag={this.onScrollEndDrag}
                    onScroll={this.onScroll}
                    numColumns={3}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={0.1}
                />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.page_bg
    }
})

export default connector(Category);
