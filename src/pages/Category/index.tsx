import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {IBookCover} from "@/models/home";
import BookCover from "@/components/BookCover";
import {RouteProp} from "@react-navigation/native";
import {CategoryParamList} from "@/navigator/CategoryTabs";
import More from "@/components/More";
import End from "@/components/End";



const mapStateToProps = (state: RootState, {route}: { route: RouteProp<CategoryParamList, string> }) => {
    let model = '';
    const {namespace, category_id, goBrief} = route.params;
    const categoryState = state['category']
    model = `${namespace}-status-${categoryState.activeStatus}`;
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
    loading: boolean;
    endReached: boolean;
    offsetY: number,
    viewDidAppear: any;
}

class Category extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: false,
            endReached: false,
            offsetY: 0,
            viewDidAppear: null,
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

    renderItem = ({item}: ListRenderItemInfo<IBookCover>) => {
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
        // const offsetY = nativeEvent.contentOffset.y;
        // const {dispatch, hasMore, hideHeader} = this.props;
        // console.log('hasMore------------' + hasMore)
        // // console.log(offsetY)
        // if (offsetY < 0) {
        //     return;
        // }
        // if (offsetY > this.state.offsetY) {
        //     if (!this.state.endReached && hasMore) {
        //         if (!hideHeader) {
        //             console.log('dispatch/hide/true')
        //             dispatch({
        //                 type: 'category/setState',
        //                 payload: {
        //                     hideHeader: true,
        //                 },
        //             });
        //         }
        //         this.setState({
        //             offsetY: offsetY
        //         })
        //     }
        // } else {
        //     if (hideHeader) {
        //         console.log('dispatch/hide/false')
        //         dispatch({
        //             type: 'category/setState',
        //             payload: {
        //                 hideHeader: false,
        //             },
        //         });
        //
        //     }
        //     this.setState({
        //         offsetY: offsetY
        //     })
        // }
    };


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
                contentContainerStyle={styles.container}
                ListFooterComponent={this.renderFooter}
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
        backgroundColor: '#fff',
    }
});

export default connector(Category);
