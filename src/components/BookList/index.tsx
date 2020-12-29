import React from 'react';
import {View, StyleSheet, FlatList, ListRenderItemInfo} from 'react-native';
import {IBook} from "@/models/search";
import More from "@/components/More";
import End from "@/components/End";
import Item from "./item";


interface IProps {
    data: any;
    loading: undefined | boolean;
    refreshing: boolean;
    hasMore: boolean;
    loadData: (refreshing: boolean, callback?: () => void) => void;
    goBrief: (data: IBook) => void;
}

interface IState {
    endReached: boolean;
}

class BookListComponent extends React.Component<IProps, IState> {

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
        const {loadData} = this.props;
        if (typeof loadData === "function") {
            loadData(true);
        }
    }

    onEndReached = () => {
        const {loadData, hasMore, loading} = this.props;
        if (!hasMore || loading) {
            return;
        }
        this.setState({
            endReached: true,
        });

        if (typeof loadData === "function") {
            loadData(false, () => {
                this.setState({
                    endReached: false,
                });
            });
        }
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
            <Item data={item} goBrief={goBrief}/>
        )
    }

    render() {
        const {data, refreshing} = this.props;
        return (
            <FlatList
                data={data}
                extraData={this.state}
                keyExtractor={(item, key) => `item-${key}-key-${key}`}
                ListHeaderComponent={this.header}
                onRefresh={this.onRefresh}
                refreshing={refreshing}
                numColumns={1}
                scrollEventThrottle={1}
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


export default BookListComponent;
