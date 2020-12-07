import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Touchable from '@/components/Touchable';
import {ip, viewportWidth, wp} from "@/utils/index";
import {IBook} from "@/models/home";
import {Color} from "@/utils/const";
import FastImage from 'react-native-fast-image';
import ErrorImage from '@/assets/image/error.png'


interface IProps {
    data: IBook;
    goBrief: (data: IBook) => void;
}

interface IState {
    errorLoad: boolean;
}

const itemWidth = wp(90) / 3;
const imageHeight = ip(itemWidth);
const itemMargin = (viewportWidth - wp(90)) / 4;


class BookCover extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            errorLoad: false,
        }
    }

    showError = () => {
        this.setState({
            errorLoad: true
        })
    };

    onPress = () => {
        const {data, goBrief} = this.props;
        if (typeof goBrief === 'function') {
            goBrief(data);
        }
    }

    render() {
        const {data} = this.props;
        const {errorLoad} = this.state;
        const loadImage = errorLoad ? ErrorImage : {uri: data.image, cache: FastImage.cacheControl.immutable};
        return (
            <Touchable style={styles.item} onPress={this.onPress}>
                <FastImage
                    source={loadImage}
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
