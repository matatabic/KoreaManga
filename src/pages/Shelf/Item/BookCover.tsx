import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Touchable from '@/components/Touchable';
import {ip, viewportWidth, wp} from "@/utils/index";
import {ICollection} from "@/models/shelf";
import {Color} from "@/utils/const";
import FastImage from 'react-native-fast-image';


interface IProps {
    isEdit: boolean;
    data: ICollection;
    goView: (data: ICollection) => void;
}


const itemWidth = wp(90) / 3;
const imageHeight = ip(itemWidth);
const itemMargin = (viewportWidth - wp(90)) / 4;


class BookCover extends React.PureComponent<IProps> {
    showError = () => {
        const {data} = this.props;
        console.log('error' + data.id);
    };

    render() {
        const {data, goView} = this.props;
        return (
            <Touchable style={styles.item} onPress={() => goView(data)}>
                <FastImage
                    source={{uri: data.image, cache: FastImage.cacheControl.immutable}}
                    onError={this.showError}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <View style={styles.titleView}>
                    <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
                    <Text style={styles.chapter_info} numberOfLines={1}>{data.chapter_info}</Text>
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
    chapter_info: {
        fontSize: 14,
        textAlign: 'center',
        color: Color.grey_title,
    },
})

export default BookCover;
