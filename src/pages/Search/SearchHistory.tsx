import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SearchHistoryItem from './Item/SearchHistoryItem'
import DestroyView from "./DestroyView";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import {Color} from "@/utils/const";

const mapStateToProps = ({search}: RootState) => {
    return {
        searchHistoryList: search.searchHistoryList,
    };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
}

class SearchHistory extends React.PureComponent<IProps> {

    destroyHistory = () => {
        const {dispatch} = this.props;
        dispatch({
            type: 'search/destroyHistory'
        })
    }

    clearHistory = (index: number) => {
        const {dispatch} = this.props;
        dispatch({
            type: 'search/deleteHistory',
            payload: {
                index
            }
        })
    }

    HistorySearch = (title: string) => {
        const {dispatch} = this.props;
        dispatch({
            type: 'search/setState',
            payload: {
                searchTitle: title,
                showBookView: true,
            }
        })
        dispatch({
            type: 'search/fetchBookList',
            payload: {
                title,
                refreshing: true,
            }
        })
    }

    get renderItem() {
        let {searchHistoryList} = this.props;
        if (searchHistoryList.length > 3) {
            searchHistoryList = searchHistoryList.filter((item, index) => index<3)
        }
        return (
            searchHistoryList.map((title, index) => {
                return (
                    <View key={index}>
                        <SearchHistoryItem
                            index={index}
                            title={title}
                            clearHistory={this.clearHistory}
                            HistorySearch={this.HistorySearch}
                        />
                    </View>
                )
            })
        )
    }

    render() {
        let {searchHistoryList} = this.props;
        if (searchHistoryList && searchHistoryList.length > 0) {
            return (
                <View>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>搜索历史</Text>
                    </View>
                    {this.renderItem}
                    <DestroyView destroyHistory={this.destroyHistory}/>
                </View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        flexDirection: 'column-reverse',
        backgroundColor: Color.white,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Color.split_line,
        paddingLeft: 20,
    },
    headerTitle: {
        color: Color.dark_title,
        marginBottom: 15,
        fontSize: 12,
    },
    item: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: Color.page_bg,
        borderBottomColor: Color.split_line,
    },
    itemLeft: {
        marginLeft: 20,
        flexDirection: 'row',
    },
    itemRight: {
        marginRight: 20,
    },
    title: {
        marginLeft: 5
    },
})

export default connector(SearchHistory);
