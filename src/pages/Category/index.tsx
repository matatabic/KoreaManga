import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {IBook} from "@/models/home";
import BookCover from "@/components/BookCover";
import {RouteProp} from "@react-navigation/native";
import {CategoryParamList} from "@/navigator/CategoryTabs";
import More from "@/components/More";
import End from "@/components/End";
import {Color} from "@/utils/const";


const mapStateToProps = (state: RootState, {route}: { route: RouteProp<CategoryParamList, string> }) => {
    const {namespace, category_id, goBrief} = route.params;
    const categoryState = state['category']
    const model = `${namespace}-status-${categoryState.activeStatus}`;
    const modelState = state[model];

    return {
        namespace,
        category_id,
        goBrief,
        model,
        activeStatus: categoryState.activeStatus,
        bookList: modelState.bookList,
        hasMore: modelState.pagination.hasMore,
        refreshing: modelState.refreshing,
        hideHeader: categoryState.hideHeader,
        loading: state.loading.effects[`${model}/fetchBookList`],
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    route: RouteProp<CategoryParamList, string>;
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

    constructor(props: IProps) {
        super(props);
        this.state = {
            endReached: false,
            offsetY: 0,
            scrollViewScrollDirection: ''
        };
    }

    componentDidMount() {
        this.loadData(true);
    }


    loadData = (refreshing: boolean, callback?: () => void) => {
        const {dispatch, model, category_id, activeStatus} = this.props;
        dispatch({
            type: `${model}/fetchBookList`,
            payload: {
                refreshing: refreshing,
                category_id: category_id,
                status: activeStatus,
            },
            callback
        });
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
        const {bookList, refreshing} = this.props;
        return (
            <FlatList
                keyExtractor={(item, key) => `item-${key}`}
                data={bookList}
                extraData={this.state}
                renderItem={this.renderItem}
                refreshing={refreshing}
                onRefresh={this.onRefresh}
                style={styles.container}
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
        backgroundColor: Color.page_bg,
    }
});

export default connector(Category);
