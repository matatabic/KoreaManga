import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IChapter} from "@/models/brief";
import {viewportWidth} from "@/utils/index";
import Touchable from "@/components/Touchable";


interface IProps {
    data: IChapter;
    goMangaView: (data: IChapter) => void;
}

const parentWidth = viewportWidth - 20;
const margin = 5;
const itemWidth = parentWidth / 4;
const itemHeight = 48;


class Item extends React.Component<IProps> {
    render() {
        const {data, goMangaView} = this.props;
        return (
            <Touchable onPress={() => goMangaView(data)}>
                <View style={styles.itemWrapper}>
                    <View style={styles.item}>
                        <Text>{data.name}</Text>
                    </View>
                </View>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    itemWrapper: {
        width: itemWidth,
        height: itemHeight,
    },
    item: {
        flex: 1,
        backgroundColor: '#f3f6f6',
        margin: margin,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
})
export default Item;
