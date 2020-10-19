import React from 'react';
import {View, Text, StyleSheet, FlatList, ListRenderItemInfo, Image} from 'react-native';
import {IBook} from "@/models/search";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import More from "@/components/More";
import End from "@/components/End";
import Item from "./item";


const mapStateToProps = (state: RootState) => {
    const {search} = state;
    return {
        bookList: search.bookList,
        searchTitle: search.searchTitle,
        refreshing: search.refreshing,
        hasMore: search.pagination.hasMore,
        loading: state.loading.effects['search/fetchBookList']
    }
}

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    goBrief: (data: IBook) => void;
}

interface IState {
    endReached: boolean;
}

class BookList extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            endReached: false,
        };
    }


    get header() {
        return <View style={styles.header}/>
    }

    onRefresh = () => {
        this.loadData(true)
    }

    loadData = (refreshing: boolean, callback?: () => void) => {
        const {dispatch, searchTitle} = this.props;

        dispatch({
            type: 'search/fetchBookList',
            payload: {
                title: searchTitle,
                refreshing: refreshing,
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

    renderItem = ({item}: ListRenderItemInfo<IBook>) => {
        const {goBrief} = this.props;
        return (
            <Item data={item} onPress={goBrief}/>
        )
    }

    render() {
        const {bookList, refreshing} = this.props;
        return (
            <FlatList
                data={bookList}
                extraData={this.state}
                keyExtractor={(item, key) => `item-${key}`}
                ListHeaderComponent={this.header}
                onRefresh={this.onRefresh}
                refreshing={refreshing}
                numColumns={1}
                renderItem={this.renderItem}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0.1}
                ListFooterComponent={this.renderFooter}
            />
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 10,
    },


})
export default connector(BookList);
