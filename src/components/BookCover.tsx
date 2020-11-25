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

const itemWidth = wp(90) / 3;
const imageHeight = ip(itemWidth);
const itemMargin = (viewportWidth - wp(90)) / 4;


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
                <View style={styles.titleView}>
                    <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
                    <Text style={styles.category} numberOfLines={1}>{data.category}</Text>
                </View>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        width: itemWidth,
        marginTop: itemMargin,
        marginLeft: itemMargin,
        backgroundColor: Color.white,
    },
    titleView: {
        width: itemWidth,
        height: 35,
    },
    image: {
        width: itemWidth,
        height: imageHeight,
        borderRadius: 5,
    },
    title: {
        textAlign: 'center'
    },
    category: {
        fontSize: 14,
        color: Color.grey_title,
    },
})

export default BookCover;
