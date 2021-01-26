import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Touchable from '@/components/Touchable';
import {ip, viewportWidth, wp} from "@/utils/index";
import {IBook} from "@/models/home";
import {Color} from "@/utils/const";
import FastImage from 'react-native-fast-image';
import SandGlass from '@/assets/image/sandglass.png'
import ErrorImage from '@/assets/image/error.png'


interface IProps {
    data: IBook;
    goBrief: (data: IBook) => void;
}

interface IState {
    errorLoad: boolean;
    placeholder: boolean;
}

const itemWidth = wp(90) / 3;
const imageHeight = ip(itemWidth);
const itemMargin = (viewportWidth - wp(90)) / 4;


class BookCover extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            errorLoad: false,
            placeholder: true,
        }
    }

    onError = () => {
        this.setState({
            errorLoad: true
        })
    };

    onLoadEnd = () => {
        this.setState({
            placeholder: false
        })
    }

    onPress = () => {
        const {data, goBrief} = this.props;
        if (typeof goBrief === 'function') {
            goBrief(data);
        }
    }

    render() {
        const {data} = this.props;
        const {errorLoad, placeholder} = this.state;
        const loadImage = errorLoad ? ErrorImage : {uri: data.image, cache: FastImage.cacheControl.immutable};
        return (
            <Touchable style={styles.item} onPress={this.onPress}>
                <FastImage
                    source={loadImage}
                    onError={this.onError}
                    onLoadEnd={this.onLoadEnd}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                {placeholder && <Image source={SandGlass} style={styles.placeholder}/>}
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
        backgroundColor: Color.page_bg,
    },
    titleView: {
        width: itemWidth,
        height: 35,
        marginTop: 5,
    },
    image: {
        width: itemWidth,
        height: imageHeight,
        borderRadius: 5,
    },
    placeholder: {
        width: itemWidth,
        height: imageHeight,
        position: "absolute",
        top: 0,
        left: 0,
    },
    title: {
        textAlign: 'center',
    },
    category: {
        fontSize: 14,
        color: Color.grey_title,
    },
})

export default BookCover;
