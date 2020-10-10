import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {RootStackNavigation} from "@/navigator/index";
import {IBook, initialState} from "@/models/search";
import SearchBar from "./SearchBar";
import List from "./List/index";
import SimpleList from "./List/SimpleList";
import BookList from "@/components/BookList";

const mapStateToProps = ({search}: RootState) => {
    return {
        searchList: search.searchList,
        simpleList: search.simpleList,
        bookList: search.bookList,
        hasSearch: search.hasSearch,
        showDetail: search.showDetail,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
    navigation: RootStackNavigation;
}

class Search extends React.Component<IProps> {

    goBack = () => {
        this.props.navigation.goBack();
    }

    goBrief = (data: IBook) => {
        const {navigation} = this.props;
        navigation.navigate('Brief', {
            id: data.id
        })
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'search/setState',
            payload: {
                ...initialState
            }
        })
    }

    get renderItem() {
        const {searchList, simpleList, hasSearch, bookList} = this.props;
        if (hasSearch) {
            if (bookList && bookList.length > 0) {
                return (
                    <BookList goBrief={this.goBrief}/>
                )
            } else {
                return <SimpleList data={simpleList} goBrief={this.goBrief}/>
            }
        }

        return (
            <List data={searchList}/>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar goBack={this.goBack}/>
                {this.renderItem}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0E0E0',
    }
})

export default connector(Search);
