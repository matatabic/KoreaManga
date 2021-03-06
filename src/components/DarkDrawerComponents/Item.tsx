import React from 'react';
import {View, Text, StyleSheet, Image} from "react-native";
import {IChapter} from "@/models/brief";
import {Color} from "@/utils/const";
import Day from "@/assets/image/day.png";
import Touchable from "@/components/Touchable";

interface IProps {
    data: IChapter;
    goMangaChapter: (data: IChapter) => void;
}

class Item extends React.Component<IProps> {

    onPress = () => {
        const {goMangaChapter, data} = this.props;
        if (typeof goMangaChapter === 'function') {
            goMangaChapter(data);
        }
    }

    render() {
        const {data} = this.props;
        return (
            <Touchable style={styles.container} onPress={this.onPress}>
                <View style={styles.info}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.created_time}>{data.created_at}</Text>
                </View>
                <Image source={Day} style={styles.avatar}/>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        paddingHorizontal: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: Color.dark_title,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    info: {
        justifyContent: "space-around"
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    title: {
        marginBottom: 15,
        color: Color.white,
    },
    created_time: {
        color: Color.dark_title
    }
})

export default Item;
