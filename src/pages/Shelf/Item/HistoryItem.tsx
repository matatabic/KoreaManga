import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {IHistory} from "@/models/shelf";
import {Color} from "@/utils/const";
import FastImage from "react-native-fast-image";
import Touchable from "@/components/Touchable";
import {ip, wp} from "@/utils/index";

const imageWidth = wp(25);
const imageHeight = ip(imageWidth);
const itemHeight = imageHeight + 10;

interface IProps {
    data: IHistory[];
}

class HistoryItem extends PureComponent<IProps> {
    render() {
        const {data} = this.props;
        return (
            <View style={styles.item}>
                <FastImage
                    source={{uri: data['image'], cache: FastImage.cacheControl.immutable}}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <View style={styles.mainView}>
                    <Text numberOfLines={2} style={styles.titleText}>{data['title']}</Text>
                    <View>
                        <Text style={styles.infoText}>{data['author']}</Text>
                        <Text style={styles.infoText}>{`更新至第${data['chapter_total']}话`}</Text>
                    </View>
                </View>
                <View style={styles.rightView}>
                    <View style={styles.read}>
                        <Text style={styles.readTitle}>{`续看第${data['chapter_num']}话`}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        height: itemHeight,
        paddingTop: 5,
        flexDirection: 'row',
        backgroundColor: Color.white,
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
    infoText: {
        color: Color.dark_title,
        paddingVertical: 5,
    },
    rightView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    read: {
        width: wp(25),
        height: 35,
        borderWidth: 2,
        borderColor: Color.pink,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    readTitle:{
        color: Color.pink,
    }

})

export default HistoryItem;