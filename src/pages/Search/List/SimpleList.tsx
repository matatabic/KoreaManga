import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IBook} from "@/models/search";
import Touchable from "@/components/Touchable";

interface IProps {
    data: IBook[]
    goBrief: (data: IBook) => void;
}

class SimpleList extends React.Component<IProps> {

    render() {
        const {data, goBrief} = this.props;
        return (
            <View style={styles.container}>
                {
                    data.map((item, index) => {
                        return (
                            <Touchable onPress={() => goBrief(item)} style={styles.item} key={index}>
                                <Text>{item.title}</Text>
                                <Text style={styles.authorText}>{item.author}</Text>
                            </Touchable>
                        )
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 220,
    },
    item: {
        height: 44,
        paddingLeft: 20,
        backgroundColor: '#fff',
        borderBottomColor: '#ccc',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center'
    },
    authorText: {
        fontSize: 12,
        marginLeft: 5,
        color: '#ccc'
    }
})
export default SimpleList;
