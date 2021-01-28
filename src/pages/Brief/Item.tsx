import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IChapter} from "@/models/brief";
import {viewportWidth} from "@/utils/index";
import Touchable from "@/components/Touchable";
import {Color} from "@/utils/const";


interface IProps {
    data: IChapter;
    goMangaView: (data: IChapter) => void;
}

const parentWidth = viewportWidth - 20;
const margin = 5;
const itemWidth = parentWidth / 4;
const itemHeight = 48;


class Item extends React.Component<IProps> {

    onPress = () => {
        const {goMangaView, data} = this.props;
        if (typeof goMangaView === 'function') {
            goMangaView(data);
        }
    }


    render() {
        const {data} = this.props;
        return (
            <Touchable onPress={this.onPress}>
                <View style={styles.itemWrapper}>
                    <View style={styles.item}>
                        <Text>第{data.chapter_num}话</Text>
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
        backgroundColor: Color.grey_page_bg,
        margin: margin,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
})
export default Item;
