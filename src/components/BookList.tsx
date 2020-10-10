import React from 'react';
import {View, Text, StyleSheet, FlatList, ListRenderItemInfo, Image} from 'react-native';
import {IBook} from "@/models/search";
import Touchable from "@/components/Touchable";
import {ip, wp} from "@/utils/index";
import {RootState} from "@/models/index";
import {connect, ConnectedProps} from "react-redux";
import More from "@/components/More";
import End from "@/components/End";


const imageWidth = wp(25);
const imageHeight = ip(imageWidth);
const itemHeight = imageHeight + 10;

const mapStateToProps = (state: RootState) => {
    const {search} = state;
    return {
        bookList: search.bookList,
        searchValue: search.searchValue,
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

class BookList extends React.Component<IProps,IState> {

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
        const {dispatch,searchValue} = this.props;
        dispatch({
            type: 'search/fetchBookList',
            payload: {
                title: searchValue,
                refreshing: refreshing,
            },
            callback
        });
    }

    onEndReached = () => {
        const {hasMore, loading} = this.props;
        console.log(hasMore, loading)
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
            <Touchable style={styles.item} onPress={() => goBrief(item)}>
                <View style={styles.leftView}>
                    <Image
                        source={{uri: item.image}}
                        style={styles.image}
                        resizeMode="stretch"
                    />
                </View>
                <View style={styles.mainView}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.authorText}>{item.author}</Text>
                    <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                <View style={styles.rightView}>
                    <Text style={{color: item.statusColor}}>{item.status}</Text>
                </View>
            </Touchable>
        )
    }

    render() {
        const {bookList, loading, refreshing} = this.props;
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
    item: {
        height: itemHeight,
        paddingTop: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    leftView: {},
    image: {
        borderRadius: 10,
        width: imageWidth,
        height: imageHeight,
    },
    mainView: {
        flex: 4,
        marginTop: 25,
        marginLeft: 10,
        height: imageHeight + 20,
    },
    titleText: {
        fontSize: 16,
    },
    authorText: {
        marginTop: 5,
        color: '#AFAFAF',
    },
    categoryText: {
        marginTop: 5,
        color: '#AFAFAF',
    },
    rightView: {
        flex: 1,
        justifyContent: 'center',
    },

})
export default connector(BookList);
