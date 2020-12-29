import React from 'react';
import BookListComponent from "@/components/BookList";
import {IBook} from "@/models/search";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import ListPlaceholder from "@/components/Placeholder/ListPlaceholder";


const mapStateToProps = (state: RootState) => {
    const {search} = state;
    return {
        bookList: search.bookList,
        searchTitle: search.searchTitle,
        refreshing: search.refreshing,
        hasMore: search.hasMore,
        loading: state.loading.effects['search/fetchBookList']
    }
}

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    goBrief: (data: IBook) => void;
}


class BookList extends React.Component<IProps> {

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

    render() {
        const {
            bookList,
            refreshing,
            loading,
            goBrief,
            hasMore,
        } = this.props;

        return (
            (loading && refreshing) ? <ListPlaceholder/> :
                <BookListComponent
                    data={bookList}
                    loading={loading}
                    refreshing={refreshing}
                    hasMore={hasMore}
                    loadData={this.loadData}
                    goBrief={goBrief}
                />
        );
    }
}


export default connector(BookList);
