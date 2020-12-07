import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Touchable from "@/components/Touchable";
import {ip, wp} from "@/utils/index";
import {IBook} from "@/models/search";
import {Color} from "@/utils/const";
import ErrorImage from "@/assets/image/error.png";

const imageWidth = wp(25);
const imageHeight = ip(imageWidth);
const itemHeight = imageHeight + 10;

interface IProps {
    data: IBook;
    goBrief: (data: IBook) => void;
}

interface IState {
    errorLoad: boolean;
}

class Item extends React.PureComponent<IProps, IState> {

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
            goBrief(data)
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
                <View style={styles.mainView}>
                    <Text numberOfLines={2} style={styles.titleText}>{data.title}</Text>
                    <View>
                        <Text style={styles.infoTitle}>{data.author}</Text>
                        <Text style={styles.infoTitle}>{data.category}</Text>
                    </View>

                </View>
                <View style={styles.rightView}>
                    <Text style={{color: data.statusColor}}>{data.status}</Text>
                </View>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        height: itemHeight,
        paddingTop: 5,
        flexDirection: 'row',
        backgroundColor: Color.white,
        paddingHorizontal: 20,
    },
    image: {
        borderRadius: 10,
        width: imageWidth,
        height: imageHeight,
    },
    mainView: {
        flex: 1,
        justifyContent: "space-between",
        padding: 10,
    },
    titleText: {
        fontSize: 15,
    },
    infoTitle: {
        paddingVertical: 5,
        color: Color.dark_title,
    },
    rightView: {
        width: imageWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },

})

export default Item;
