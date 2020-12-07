import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Touchable from "@/components/Touchable";
import Icon from "@/assets/iconfont";
import {Color} from "@/utils/const";

interface IProps {
    index: number;
    title: string;
    clearHistory: (index: number) => void;
    HistorySearch: (data: string) => void;
}

class SearchHistoryItem extends React.PureComponent<IProps> {
    clearHistory = () => {
        const {index, clearHistory} = this.props;
        if (typeof clearHistory === "function") {
            clearHistory(index);
        }
    }

    HistorySearch = () => {
        const {title, HistorySearch} = this.props;
        if (typeof HistorySearch === "function") {
            HistorySearch(title);
        }
    }

    render() {
        const {title} = this.props;
        return (
            <View style={styles.item}>
                <Touchable onPress={this.HistorySearch} style={styles.itemLeft}>
                    <Icon name="icon-time1"/>
                    <Text style={styles.title}>{title}</Text>
                </Touchable>
                <Touchable onPress={this.clearHistory}>
                    <View style={styles.itemRight}>
                        <Icon name="icon-cha"/>
                    </View>
                </Touchable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: Color.white,
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

export default SearchHistoryItem;
