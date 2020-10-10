import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import Touchable from '@/components/Touchable';
import {viewportWidth, wp} from "@/utils/index";
import {IBook} from "@/models/home";


interface itemStyle {
    width: Number;
    marginVertical: Number;
    marginHorizontal: Number;
}

export interface IProps {
    data: IBook;
    goBrief: (data: IBook) => void;
}

const DEFAULT_IMAGE =
    'https://jiecaomh.com/media/uploads/a/目標就是妳內褲完結/cover.jpg';

const itemWidth = wp(30);
const imageHeight = itemWidth / 0.675;
const itemMargin = (viewportWidth - (itemWidth * 3)) / 4;


class BookCover extends React.Component<IProps> {
    showError = () => {
        const {data} = this.props;
        console.log('error' + data.id);
    };

    render() {
        const {data, goBrief} = this.props;
        return (
            <Touchable style={styles.item} onPress={() => goBrief(data)}>
                <Image
                    source={{uri: data.image}}
                    onError={this.showError}
                    style={styles.image}
                    resizeMode="stretch"
                />
                <Text numberOfLines={1}>{data.title}</Text>
                <Text numberOfLines={1}>{data.category ? data.category : ''}</Text>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        width: itemWidth,
        marginLeft: itemMargin,
        marginTop: itemMargin,
    },
    image: {
        width: '100%',
        height: imageHeight,
        borderRadius: 5,
    },
})

export default BookCover;
