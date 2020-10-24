import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Touchable from '@/components/Touchable';
import {ip, viewportWidth, wp} from "@/utils/index";
import {IBook} from "@/models/home";
import {Color} from "@/utils/const";
import FastImage from 'react-native-fast-image';

export interface IProps {
    data: IBook;
    goBrief: (data: IBook) => void;
}

const DEFAULT_IMAGE =
    'https://jiecaomh.com/media/uploads/a/目標就是妳內褲完結/cover.jpg';

const itemWidth = wp(96) / 3;
const imageHeight = ip(itemWidth);
const itemMargin = (viewportWidth - wp(96)) / 4;


class BookCover extends React.PureComponent<IProps> {
    showError = () => {
        const {data} = this.props;
        console.log('error' + data.id);
    };

    render() {
        const {data, goBrief} = this.props;
        return (
            <Touchable style={styles.item} onPress={() => goBrief(data)}>

                <FastImage
                    source={{uri: data.image, cache: FastImage.cacheControl.immutable}}
                    onError={this.showError}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <View style={styles.titleContainer}>
                    <Text numberOfLines={1}>{data.title}</Text>
                    <Text numberOfLines={1}>{data.category ? data.category : ''}</Text>
                </View>

            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        width: itemWidth,
        marginLeft: itemMargin,
        backgroundColor: Color.white,
    },
    titleContainer: {
        width: viewportWidth,
        height: 35,
    },
    image: {
        width: '100%',
        height: imageHeight,
        borderRadius: 5,
    },
})

export default BookCover;
