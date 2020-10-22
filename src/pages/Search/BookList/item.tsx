import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Touchable from "@/components/Touchable";
import {ip, wp} from "@/utils/index";
import {IBook} from "@/models/search";
import {Color} from "@/utils/const";

const imageWidth = wp(25);
const imageHeight = ip(imageWidth);
const itemHeight = imageHeight + 10;

interface IProps {
    data: IBook;
    onPress: (data: IBook) => void;
}

class Item extends React.PureComponent<IProps> {

    onPress = () => {
        const {data, onPress} = this.props;
        if (typeof onPress === 'function') {
            onPress(data)
        }
    }

    render() {
        const {data} = this.props;
        return (
            <Touchable style={styles.item} onPress={this.onPress}>
                <View>
                    <FastImage
                        source={{uri: data.image, cache: FastImage.cacheControl.immutable}}
                        style={styles.image}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                </View>
                <View style={styles.mainView}>
                    <Text style={styles.titleText}>{data.title}</Text>
                    <Text style={styles.authorText}>{data.author}</Text>
                    <Text style={styles.categoryText}>{data.category}</Text>
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
        flex: 4,
        marginTop: 25,
        marginLeft: 10,
        height: imageHeight + 20,
    },
    titleText: {
        fontSize: 16,
    },
    authorText: {
        marginTop: 5,
        color: Color.dark_title,
    },
    categoryText: {
        marginTop: 5,
        color: Color.dark_title,
    },
    rightView: {
        flex: 1,
        justifyContent: 'center',
    },

})

export default Item;
