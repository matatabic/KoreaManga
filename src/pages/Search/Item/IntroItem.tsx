import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Touchable from "@/components/Touchable";
import {IBook} from "@/models/search";
import {Color} from "@/utils/const";

interface IProps {
    data: any;
    onPress: (data: IBook) => void;
}

class IntroItem extends React.Component<IProps> {

    onPress = () =>{
        const {data,onPress} = this.props;
        onPress(data);
    }

    render() {
        const {data} = this.props;
        return (
            <Touchable onPress={this.onPress} style={styles.item}>
                <Text style={styles.title}>{data.title}</Text>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        height: '100%',
        backgroundColor: Color.light_btn,
        justifyContent: 'center',
        borderRadius: 5,
        margin: 5
    },
    title: {
        marginHorizontal: 7
    }
})

export default IntroItem;
